import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  mapAiPreference,
  search as searchApi,
  submitCommunityAnswer,
} from "../api/search";
import { createThread, deleteThread, getThreads } from "../api/thread";
import ExpertConnectCard from "./ExpertConnectCard";

function extractThreadId(response) {
  return (
    response?.data?.threadId ||
    response?.threadId ||
    response?.data?.data?.threadId ||
    ""
  );
}

function normalizeThreads(payload) {
  const items = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.data)
      ? payload.data
      : [];

  return items.map((item, index) => ({
    id: item.id || `thread-${index}`,
    query: item.title?.trim() || "Untitled Chat",
    total: item.total ?? 0,
    createdAt: item.createdAt,
    threadId: item.id || "",
  }));
}

export default function SearchPage({ hasSubscriptionPlan }) {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [answerDepth, setAnswerDepth] = useState("Balanced");
  const [history, setHistory] = useState([]);
  const [searchError, setSearchError] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [resultQuery, setResultQuery] = useState("");
  const [searchThreadId, setSearchThreadId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [deletingThreadId, setDeletingThreadId] = useState("");
  const [loading, setLoading] = useState(true);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showSubmitAnswer, setShowSubmitAnswer] = useState(false);
  const [contribText, setContribText] = useState("");
  const [contribType, setContribType] = useState("LINK");
  const [contribLink, setContribLink] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [contribFile, setContribFile] = useState(null);

  useEffect(() => {
    let cancelled = false;

    getThreads(10, 0)
      .then((items) => {
        if (!cancelled) setHistory(normalizeThreads(items));
      })
      .catch((err) => {
        if (!cancelled) {
          setSearchError(err?.message || "Failed to load recent threads");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const openChat = async ({ query, threadId }) => {
    const params = new URLSearchParams();
    if (query) params.set("query", query);
    if (threadId) params.set("threadId", threadId);
    navigate(`/chat${threadId ? `/${threadId}` : ""}${params.toString() ? `?${params}` : ""}`, {
      state: { query, threadId },
    });
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query || isSearching) return;
    if (!hasSubscriptionPlan) {
      navigate("/subscriptions");
      return;
    }

    setIsSearching(true);
    setSearchError("");
    setResultQuery(query);
    setSearchResult(null);

    try {
      let activeThreadId = searchThreadId;

      if (!activeThreadId) {
        const response = await createThread();
        activeThreadId = extractThreadId(response);
        if (!activeThreadId) {
          throw new Error("The server did not return a thread ID");
        }
        setSearchThreadId(activeThreadId);
      }

      const response = await searchApi({
        query,
        threadId: activeThreadId,
        aiPreference: mapAiPreference(answerDepth),
      });
      const result = response?.data ?? response;

      setSearchResult(result);

      getThreads(10, 0)
        .then((items) => setHistory(normalizeThreads(items)))
        .catch(() => {});
    } catch (err) {
      setSearchError(err?.message || "Search failed");
    } finally {
      setIsSearching(false);
    }
  };

  const handleHistorySelect = (item) => {
    if (item.threadId) openChat({ threadId: item.threadId });
    else setSearchQuery(item.query);
  };

  const handleDeleteHistory = async (event, item) => {
    event.stopPropagation();
    if (!item.threadId || deletingThreadId) return;
    if (!window.confirm("Remove this item from your history?")) return;

    setDeletingThreadId(item.threadId);
    setSearchError("");
    try {
      await deleteThread(item.threadId);
      setHistory((current) =>
        current.filter((entry) => entry.threadId !== item.threadId),
      );
    } catch (error) {
      setSearchError(error?.message || "Failed to delete thread");
    } finally {
      setDeletingThreadId("");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setContribFile(file);
    setSelectedFileName(file.name);
  };

  const handleContributionSubmit = async (e) => {
    e.preventDefault();
    const answer = contribType === "LINK" ? contribLink.trim() : contribText.trim();
    if (!answer || answer.length < 10) {
      setSearchError("Answer must be at least 10 characters long");
      return;
    }
    try {
      await submitCommunityAnswer({
        query: resultQuery || searchQuery.trim() || "General Query",
        answer,
        file: contribFile || undefined,
      });
      setShowSubmitAnswer(false);
      setContribText("");
      setContribLink("");
      setContribFile(null);
      setSelectedFileName("");
      setContribType("LINK");
    } catch (err) {
      setSearchError(err?.message || "Failed to submit answer");
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col pb-24">
      <header className="w-full max-w-3xl mx-auto px-4 pt-6 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-40 pb-3 border-b border-slate-50">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/home")} className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-500 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-slate-900">Search</h1>
        </div>
        <button
          onClick={async () => {
            try {
              const res = await createThread();
              const extractedId = extractThreadId(res);
              if (!extractedId) {
                throw new Error("The server did not return a thread ID");
              }
              navigate(`/chat/${extractedId}`);
            } catch (err) {
              setSearchError(err?.message || "Failed to start a new thread");
            }
          }}
          className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full font-semibold"
        >
          New Chat
        </button>
      </header>

      <main className="w-full max-w-3xl mx-auto px-4 flex-1 mt-4">
        <form onSubmit={handleSearchSubmit} className="space-y-5">
          <div className="relative flex items-center bg-[#F1F5F9] rounded-2xl px-4 py-4 border focus-within:ring-2 focus-within:ring-blue-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-slate-400 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.604 10.604z" />
            </svg>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ask a question..."
              className="w-full bg-transparent border-0 pl-3 pr-12 text-base focus:outline-none"
            />
            <button
              type="submit"
              disabled={isSearching || !searchQuery.trim()}
              className="absolute right-3 p-2 rounded-xl bg-blue-500/10 text-blue-600 disabled:opacity-40"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.604 10.604z" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-3 p-1.5 bg-[#F1F5F9] rounded-2xl border border-slate-100">
            {["Quick", "Balanced", "Deep"].map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setAnswerDepth(mode)}
                className={`py-2.5 text-sm font-bold rounded-xl ${answerDepth === mode ? "bg-white text-blue-600" : "text-slate-400"}`}
              >
                {mode}
              </button>
            ))}
          </div>
        </form>

        {(isSearching || searchResult) && (
          <section className="mt-6 border-t border-slate-100 pt-5" aria-live="polite">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <p className="text-xs font-bold uppercase text-blue-600">Answer</p>
                <h2 className="text-lg font-bold text-slate-900 mt-1">
                  {resultQuery || searchQuery.trim()}
                </h2>
              </div>
              {searchResult?.source ? (
                <span className="shrink-0 text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1.5 rounded-lg">
                  {String(searchResult.source).replaceAll("_", " ")}
                </span>
              ) : null}
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 min-h-32">
              {isSearching ? (
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                  Searching...
                </div>
              ) : (
                <p className="whitespace-pre-wrap leading-7 text-slate-800">
                  {typeof searchResult?.answer === "string"
                    ? searchResult.answer
                    : JSON.stringify(searchResult?.answer ?? searchResult, null, 2)}
                </p>
              )}
            </div>

            {!isSearching ? (
              <ExpertConnectCard
                key={searchResult?.vaultId}
                result={searchResult}
                onError={setSearchError}
              />
            ) : null}

            {!isSearching && searchResult ? (
              <button
                type="button"
                onClick={() => setShowSubmitAnswer(true)}
                className="mt-3 text-sm font-semibold text-blue-600"
              >
                Contribute another answer
              </button>
            ) : null}
          </section>
        )}

        <div className="mt-6 border-t border-slate-100 pt-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Recent Searches</h2>
            <button onClick={() => setShowHistoryModal(true)} className="text-slate-400">Open</button>
          </div>
          {searchError ? <p className="text-sm text-red-600 mt-2">{searchError}</p> : null}
          {loading ? <p className="text-sm text-slate-500 mt-2">Loading history...</p> : null}
          <div className="space-y-3 mt-3">
            {history.map((item) => (
              <div key={item.id} className="flex items-center gap-2 rounded-2xl border border-slate-100 bg-slate-50 p-2">
                <button
                  type="button"
                  onClick={() => handleHistorySelect(item)}
                  className="min-w-0 flex-1 p-2 text-left"
                >
                  <p className="truncate font-semibold text-slate-800">{item.query}</p>
                  <p className="mt-1 text-xs text-slate-400">
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Recent"}
                  </p>
                </button>
                <button
                  type="button"
                  title="Delete search"
                  aria-label={`Delete ${item.query}`}
                  disabled={deletingThreadId === item.threadId}
                  onClick={(event) => handleDeleteHistory(event, item)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-red-500 hover:bg-red-50 disabled:opacity-40"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M8 6V4h8v2m-9 0 1 14h8l1-14M10 10v6m4-6v6" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setShowSubmitAnswer(true)}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl"
        >
          Contribute Answer
        </button>
      </main>

      {showHistoryModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end">
          <div className="fixed inset-0" onClick={() => setShowHistoryModal(false)} />
          <div className="relative w-full bg-white rounded-t-3xl p-6 max-h-[70%] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Recent Searches</h3>
              <button onClick={() => setShowHistoryModal(false)}>Close</button>
            </div>
            <div className="space-y-2">
              {history.map((item) => (
                <div key={item.id} className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 p-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowHistoryModal(false);
                      handleHistorySelect(item);
                    }}
                    className="min-w-0 flex-1 p-2 text-left"
                  >
                    <p className="truncate font-semibold">{item.query}</p>
                  </button>
                  <button
                    type="button"
                    title="Delete search"
                    aria-label={`Delete ${item.query}`}
                    disabled={deletingThreadId === item.threadId}
                    onClick={(event) => handleDeleteHistory(event, item)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-red-500 hover:bg-red-100 disabled:opacity-40"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M8 6V4h8v2m-9 0 1 14h8l1-14M10 10v6m4-6v6" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showSubmitAnswer && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end">
          <div className="fixed inset-0" onClick={() => setShowSubmitAnswer(false)} />
          <div className="relative w-full bg-white rounded-t-3xl p-6 max-h-[80%] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Contribute Answer</h3>
              <button onClick={() => setShowSubmitAnswer(false)}>Close</button>
            </div>
            <form onSubmit={handleContributionSubmit} className="space-y-4">
              <textarea
                value={contribText}
                onChange={(e) => setContribText(e.target.value)}
                rows={5}
                className="w-full border border-slate-200 rounded-xl p-3"
                placeholder="Enter your answer..."
              />
              <input ref={fileInputRef} type="file" onChange={handleFileChange} className="hidden" />
              <button type="button" onClick={() => fileInputRef.current?.click()} className="w-full bg-blue-100 text-blue-600 py-3 rounded-xl">
                {selectedFileName || "Add File"}
              </button>
              <div className="flex gap-2">
                {["LINK", "PDF", "VIDEO"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setContribType(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${contribType === t ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              {contribType === "LINK" && (
                <input
                  value={contribLink}
                  onChange={(e) => setContribLink(e.target.value)}
                  placeholder="Paste link..."
                  className="w-full border border-slate-200 rounded-xl px-4 py-3"
                />
              )}
              <button type="submit" className="w-full bg-blue-600 text-white font-black py-4 rounded-xl">
                Submit Answer
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
