"use client";
import { Suspense, useState, useEffect, useCallback } from "react";
import { ErrorBoundary } from "react-error-boundary";
import "./styles.css";
import {
  loadHistory,
  History as IHistory,
  saveHistory,
} from "../../utils/Config";

function History({
  history,
  setHistory,
}: {
  history: IHistory[];
  setHistory: any;
}) {
  const handleCheckBoxOnChange = async (
    ev: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const currentSession = history.find((s) => s.id === id);
    if (currentSession) {
      currentSession.checked = ev.target.checked;
      setHistory([...history.filter((h) => h.id !== id), currentSession]);
    }
  };

  return (
    <>
      <div className="table-container">
        <table className="history-table">
          <thead>
            <tr>
              <th className="checkbox-column"></th>
              <th className="history-column">Name</th>
              <th className="history-column">Timer</th>
              <th className="history-column">Date</th>
            </tr>
          </thead>
          <tbody>
            {history
              .sort((a, b) => b.id - a.id)
              .map((d, index) => (
                <tr key={index} className="table-row">
                  <td className="table-data">
                    <input
                      key={d.id}
                      type="checkbox"
                      checked={d.checked}
                      onChange={(ev) => handleCheckBoxOnChange(ev, d.id)}
                    ></input>
                  </td>
                  <td className="table-data">{d.name}</td>
                  <td className="table-data">{d.timer}</td>
                  <td className="table-data">{d.date}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function HistoryContainer() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const data = await loadHistory();
        setHistory(Array.isArray(data) ? data : JSON.parse(data));
      } catch (error) {
        console.error("Failed to load history:", error);
      }
    }
    fetchHistory();
  }, []);

  const handleRefreshOnClick = useCallback(async () => {
    try {
      const data = await loadHistory();
      setHistory(Array.isArray(data) ? data : JSON.parse(data));
    } catch (error) {
      console.error("Failed to refresh history:", error);
    }
  }, []);

  const handleDeleteHistories = async () => {
    const uncheckedSessions = history.filter((h) => h.checked === false);
    await saveHistory(uncheckedSessions);
  };

  return (
    <>
      <div className="history-block">
        <h1 className="history-header">History</h1>
        <button className="refresh-button" onClick={handleRefreshOnClick}>
          Refresh history
        </button>
        {history.find((h) => h.checked) ? (
          <button
            className="delete-history-button"
            onClick={handleDeleteHistories}
          >
            Delete histories
          </button>
        ) : null}
        <ErrorBoundary fallback={<p>⚠️ Something went wrong</p>}>
          <Suspense fallback={<p>⌛ Downloading history...</p>}>
            <History history={history} setHistory={setHistory} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  );
}

export default HistoryContainer;
