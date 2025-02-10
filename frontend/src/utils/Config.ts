import * as ConfigStore from "../../wailsjs/go/main/ConfigStore";

export interface History {
  id: number;
  name: string;
  timer: string;
  date: string;
  checked: boolean;
}

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
