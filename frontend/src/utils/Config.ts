import * as ConfigStore from "../../wailsjs/go/main/ConfigStore";

export async function loadHistory() {
  return ConfigStore.Get("history.json", "[]");
}
