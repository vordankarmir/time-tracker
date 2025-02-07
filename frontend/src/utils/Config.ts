import * as ConfigStore from "../../wailsjs/go/main/ConfigStore";

export interface History {
  name: string;
  timer: string;
}

export async function loadHistory() {
  return ConfigStore.Get("history.json", "[]");
}

export async function saveHistory(history: History) {
  const historyData = await loadHistory();
  const allHistory = [...JSON.parse(historyData), history];
  await ConfigStore.Set("history.json", JSON.stringify(allHistory));
}
