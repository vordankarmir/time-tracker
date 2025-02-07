"use client";
import { use, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import "./styles.css";
import { loadHistory } from "../../utils/Config";

function History({ historyPromise }: any) {
  const fileData: any = use(historyPromise);
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
            {JSON.parse(fileData).map((d: any, index: number) => {
              return (
                <tr key={index} className="table-row">
                  <td className="table-data">{d.name}</td>
                  <td className="table-data">{d.timer}</td>
                  <td className="table-data">{d.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

function HistoryContainer() {
  return (
    <>
      <div className="history-block">
        <h1 className="history-header">History</h1>
        <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
          <Suspense fallback={<p>⌛Downloading history...</p>}>
            <History historyPromise={loadHistory()}></History>
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  );
}

export default HistoryContainer;
