import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createThread, getThreadMessages } from "../api/thread";
import {
  mapAiPreference,
  search as searchApi,
  submitCommunityAnswer,
} from "../api/search";
import ExpertConnectCard from "./ExpertConnectCard";

function extractThreadId(response) {
  return (
    response?.data?.threadId ||
    response?.threadId ||
    response?.data?.data?.threadId ||
    ""
  );
}

function parseMessage(raw) {
  if (raw && typeof raw === "object") return raw;
  if (typeof raw !== "string") return { content: "" };
  if (!raw.trim().startsWith("{")) return { content: raw };

  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : { content: raw };
  } catch {
    return { content: raw };
  }
}

function normalizeMessages(payload) {
  const list = Array.isArray(payload?.thread)
    ? payload.thread
    : Array.isArray(payload?.messages)
      ? payload.messages
      : Array.isArray(payload?.data?.thread)
        ? payload.data.thread
        : Array.isArray(payload?.data?.messages)
          ? payload.data.messages
          : [];

  return list.map((msg, index) => {
    const parsed = parseMessage(msg.message ?? msg.content ?? msg.text ?? "");
    return {
      ...msg,
      ...parsed,
      role: msg.role === "user" ? "user" : "assistant",
      content: parsed.content || "",
      id: msg.id || `msg-${index}`,
    };
  });
}

export default function ChatPage({ hasSubscriptionPlan }) {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const initialQuery = useMemo(() => {
    const qp = new URLSearchParams(location.search);
    return location.state?.query || qp.get("query") || "";
  }, [location.search, location.state]);
  const [answerDepth, setAnswerDepth] = useState("Balanced");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const routeThreadId = useMemo(
    () =>
      params.threadId ||
      new URLSearchParams(location.search).get("threadId") ||
      location.state?.threadId ||
      "",
    [location.search, location.state, params.threadId],
  );
  const [createdThreadId, setCreatedThreadId] = useState("");
  const [showThreadsModal, setShowThreadsModal] = useState(false);
  const [showSubmitAnswer, setShowSubmitAnswer] = useState(false);
  const [contributionQuery, setContributionQuery] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [resourceType, setResourceType] = useState("link");
  const [resourceValue, setResourceValue] = useState("");
  const [resourceFileName, setResourceFileName] = useState("");
  const [resourceFile, setResourceFile] = useState(null);
  const [inputText, setInputText] = useState(initialQuery);
  const [isSending, setIsSending] = useState(false);
  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false);
  const scrollRef = useRef(null);
  const fileInputRef = useRef(null);
  const pendingThreadRef = useRef("");
  const threadId = routeThreadId || createdThreadId;

  useEffect(() => {
    if (!routeThreadId) return undefined;

    let cancelled = false;
    getThreadMessages(routeThreadId)
      .then((response) => {
        if (cancelled) return;
        pendingThreadRef.current = routeThreadId;
        setMessages(normalizeMessages(response));
        setError("");
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err?.message || "Failed to load thread");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [routeThreadId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const ensureThreadId = async () => {
    if (routeThreadId) return routeThreadId;
    if (pendingThreadRef.current) return pendingThreadRef.current;
    const response = await createThread();
    const extractedId = extractThreadId(response);
    if (!extractedId) {
      throw new Error("The server did not return a thread ID");
    }
    pendingThreadRef.current = extractedId;
    setCreatedThreadId(extractedId);
    return extractedId;
  };

  const handleSend = async () => {
    const trimmed = inputText.trim();
    if (!trimmed || isSending) return;
    if (!hasSubscriptionPlan) {
      navigate("/subscriptions");
      return;
    }

    setIsSending(true);
    setInputText("");
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setError("");

    try {
      const id = await ensureThreadId();
      const response = await searchApi({
        query: trimmed,
        threadId: id,
        aiPreference: mapAiPreference(answerDepth),
      });
      const result = response?.data ?? response;
      setMessages((prev) => [
        ...prev,
        {
          ...result,
          role: "assistant",
          content: result?.answer || "",
        },
      ]);
    } catch (err) {
      setError(err?.message || "Search failed");
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsSending(false);
    }
  };

  const openThread = (item) => {
    setShowThreadsModal(false);
    navigate(`/chat/${item.id}?threadId=${item.id}`, {
      state: { threadId: item.id },
    });
  };

  const openContribution = (messageIndex) => {
    const relatedQuestion = messages
      .slice(0, messageIndex)
      .reverse()
      .find((message) => message.role === "user")?.content;

    setContributionQuery(relatedQuestion || "General Query");
    setUserAnswer("");
    setResourceType("link");
    setResourceValue("");
    setResourceFileName("");
    setResourceFile(null);
    setShowSubmitAnswer(true);
  };

  const submitAnswer = async (e) => {
    e.preventDefault();
    const answer = userAnswer.trim();
    if (answer.length < 10) {
      setError("Answer must be at least 10 characters long");
      return;
    }

    setIsSubmittingAnswer(true);
    setError("");
    try {
      await submitCommunityAnswer({
        query: contributionQuery,
        answer,
        file: resourceFile || undefined,
        filters: resourceValue.trim()
          ? { type: resourceType, url: resourceValue.trim() }
          : undefined,
      });
      setShowSubmitAnswer(false);
      setUserAnswer("");
      setResourceValue("");
      setResourceFileName("");
      setResourceFile(null);
    } catch (err) {
      setError(err?.message || "Failed to submit answer");
    } finally {
      setIsSubmittingAnswer(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col pb-32">
      <header className="w-full max-w-3xl mx-auto px-4 pt-6 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-40 pb-3 border-b border-slate-50">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/search")} className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-500 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Chat</h1>
            <p className="text-xs text-slate-400 font-medium">{threadId || "New thread"}</p>
          </div>
        </div>
        <button onClick={() => setShowThreadsModal(true)} className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full font-semibold">
          Threads
        </button>
      </header>

      <main className="w-full max-w-3xl mx-auto px-4 flex-1 mt-4">
        {messages.map((msg, index) => (
          <div key={msg.id || index} className={`mb-4 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
              <div className={`rounded-2xl px-4 py-3 ${msg.role === "user" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-800"}`}>
                <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              </div>
              {msg.role === "assistant" ? (
                <>
                  <ExpertConnectCard result={msg} onError={setError} />
                  <button
                    type="button"
                    onClick={() => openContribution(index)}
                    className="mt-2 px-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Contribute Answer
                  </button>
                </>
              ) : null}
            </div>
          </div>
        ))}
        {isSending && <p className="text-sm text-slate-500">Loading...</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div ref={scrollRef} />
      </main>

      <div className="fixed bottom-0 inset-x-0 bg-gradient-to-t from-white via-white to-transparent pt-4 pb-4 z-40">
        <div className="max-w-3xl mx-auto px-4 space-y-3">
          <div className="flex justify-center">
            <div className="inline-flex gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200/40">
              {["Quick", "Balanced", "Deep"].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setAnswerDepth(m)}
                  className={`px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-md ${answerDepth === m ? "bg-white text-blue-600" : "text-slate-400"}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="relative flex items-center bg-[#F1F5F9] rounded-2xl px-4 py-3.5 shadow-md border border-slate-200/40"
          >
            <input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask a question..."
              className="w-full bg-transparent border-0 pl-1 pr-12 text-base focus:outline-none"
            />
            <button type="submit" className="absolute right-3 p-2 rounded-xl bg-blue-600 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      {showThreadsModal && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/40">
          <div className="fixed inset-0" onClick={() => setShowThreadsModal(false)} />
          <div className="relative w-full bg-white rounded-t-3xl p-6 max-h-[70%] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Your Threads</h3>
              <button onClick={() => setShowThreadsModal(false)}>Close</button>
            </div>
            <div className="space-y-2">
              {[{ id: threadId || "new", title: "Current thread" }].map((item) => (
                <button
                  key={item.id}
                  onClick={() => openThread(item)}
                  className="w-full text-left p-4 rounded-xl bg-slate-50 border border-slate-100"
                >
                  <p className="font-semibold">{item.title || "New conversation"}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {showSubmitAnswer && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/40">
          <div className="fixed inset-0" onClick={() => setShowSubmitAnswer(false)} />
          <div className="relative w-full bg-white rounded-t-3xl p-6 max-h-[80%] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-bold">Contribute Answer</h3>
                <p className="mt-1 text-sm text-slate-500 line-clamp-2">{contributionQuery}</p>
              </div>
              <button onClick={() => setShowSubmitAnswer(false)}>Close</button>
            </div>
            <form onSubmit={submitAnswer} className="space-y-4">
              <textarea value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} rows={5} placeholder="Enter your answer..." className="w-full border border-slate-200 rounded-xl p-3" />
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setResourceFile(file);
                  setResourceFileName(file?.name || "");
                }}
              />
              <button type="button" onClick={() => fileInputRef.current?.click()} className="w-full bg-blue-100 text-blue-600 py-3 rounded-xl">
                {resourceFileName || "Add File"}
              </button>
              <div className="flex gap-2">
                {["link", "pdf", "video"].map((type) => (
                  <button key={type} type="button" onClick={() => setResourceType(type)} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${resourceType === type ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}>
                    {type.toUpperCase()}
                  </button>
                ))}
              </div>
              <input value={resourceValue} onChange={(e) => setResourceValue(e.target.value)} placeholder={resourceType === "link" ? "Paste link..." : resourceType === "pdf" ? "Paste PDF URL..." : "Paste video URL..."} className="w-full border border-slate-200 rounded-xl px-4 py-3" />
              <button disabled={isSubmittingAnswer} type="submit" className="w-full bg-blue-600 text-white font-black py-4 rounded-xl disabled:opacity-50">
                {isSubmittingAnswer ? "Submitting..." : "Submit Answer"}
              </button>
            </form>
          </div>
        </div>
      )}
     </div>
  );
}
