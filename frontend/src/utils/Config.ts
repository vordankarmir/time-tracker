import * as ConfigStore from "../../wailsjs/go/main/ConfigStore";
import { History } from "../store/history-slice";

const fileName = "history.json";

export async function loadHistory() {
  return ConfigStore.Get(fileName, "[]");
}

export async function addToHistory(history: History[]) {
  const historyData = await loadHistory();
  const allHistory = [...JSON.parse(historyData), ...history];
  await ConfigStore.Set(fileName, JSON.stringify(allHistory));
}

export async function saveHistory(history: History[]) {
  await ConfigStore.Set(fileName, JSON.stringify(history));
}
