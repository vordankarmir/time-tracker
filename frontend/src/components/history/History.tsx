"use client";
import { use, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import "./styles.css";
import { loadHistory } from "../../utils/Config";

function History({ historyPromise }: any) {
  const fileData: any = use(historyPromise);
  return (
    <>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Timer</th>
          </tr>
          {JSON.parse(fileData).map((d: any, index: number) => {
            return (
              <tr key={index}>
                <td>{d.name}</td>
                <td>{d.timer}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
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
