"use client";
import { Suspense, useState, useEffect, useRef, useCallback } from "react";
import { ErrorBoundary } from "react-error-boundary";
import "./styles.css";
import { loadHistory } from "../../utils/Config";

function History({ history }: { history: any[] }) {
  return (
    <>
      <div className="table-container">
        <table className="history-table">
          <thead>
            <tr>
              <th className="history-column">Name</th>
              <th className="history-column">Timer</th>
              <th className="history-column">Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((d, index) => (
              <tr key={index} className="table-row">
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
        setHistory(Array.isArray(data) ? data : JSON.parse(data)); // Ensure it's an array
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

  return (
    <>
      <div className="history-block">
        <h1 className="history-header">History</h1>
        <button className="refresh-button" onClick={handleRefreshOnClick}>
          Refresh history
        </button>
        <ErrorBoundary fallback={<p>⚠️ Something went wrong</p>}>
          <Suspense fallback={<p>⌛ Downloading history...</p>}>
            <History history={history} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  );
}

export default HistoryContainer;
