import * as ConfigStore from "../../wailsjs/go/main/ConfigStore";
import { History } from "../store/history-slice";

const fileName = "history.json";

export async function loadHistory() {
  return ConfigStore.Get(fileName, "[]");
}

export async function addToHistoryFile(history: History[]) {
  const historyData = await loadHistory();
  const allHistory = [...JSON.parse(historyData), ...history];
  await ConfigStore.Set(fileName, JSON.stringify(allHistory));
}

export async function saveHistory(history: History[]) {
  await ConfigStore.Set(fileName, JSON.stringify(history));
}

export async function getSortedHistory() {
  const data = await loadHistory();
  const history: History[] = JSON.parse(data);
  return history.sort((a, b) => a.id - b.id);
}
