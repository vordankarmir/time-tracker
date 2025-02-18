"use client";
import { Suspense, useEffect, useCallback } from "react";
import { ErrorBoundary } from "react-error-boundary";
import "./styles.css";
import { loadHistory, saveHistory } from "../../utils/Config";
import {
  changeCheckedStatus,
  setHistory,
  History as IHistory,
} from "../../store/history-slice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import moment from "moment";

function History() {
  const dispatch = useAppDispatch();
  const history = useAppSelector((state) => state.history.history);

  const handleCheckBoxOnChange = async (
    ev: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    dispatch(changeCheckedStatus({ id, checked: ev.target.checked }));
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
            {history.map((d, index) => (
              <tr key={index} className="table-row">
                <td className="table-data">
                  <input
                    className="delete-checkbox"
                    key={d.id}
                    type="checkbox"
                    checked={d.checked}
                    onChange={(ev) => handleCheckBoxOnChange(ev, d.id)}
                  ></input>
                </td>
                <td className="table-data">{d.name}</td>
                <td className="table-data">{d.timer}</td>
                <td className="table-data">
                  {moment(d.date).format("hh:mm:ss - MM/DD/YYYY")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function HistoryContainer() {
  const dispatch = useAppDispatch();
  const history = useAppSelector((state) => state.history.history);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const data = await loadHistory();
        const parsedHistory: IHistory[] = JSON.parse(data);
        dispatch(
          setHistory(
            Array.isArray(data)
              ? data
              : parsedHistory.sort((a, b) => b.date - a.date)
          )
        );
      } catch (error) {
        console.error("Failed to load history:", error);
      }
    }
    fetchHistory();
  }, [dispatch]);

  const handleRefreshOnClick = useCallback(async () => {
    try {
      const data = await loadHistory();
      const parsedHistory: IHistory[] = JSON.parse(data);
      dispatch(
        setHistory(
          Array.isArray(data)
            ? data
            : parsedHistory.sort((a, b) => b.date - a.date)
        )
      );
    } catch (error) {
      console.error("Failed to refresh history:", error);
    }
  }, []);

  const handleDeleteHistories = async () => {
    const uncheckedSessions = history.filter((h) => h.checked === false);
    await saveHistory(uncheckedSessions);
    dispatch(setHistory(uncheckedSessions));
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
            <History />
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  );
}

export default HistoryContainer;
