import type { ChatState } from "./types";

export const conditionalEdges = {
  router: (state: ChatState) => {
    return (state.age && state.age >= 18 ? "majorNode" : "minorNode") as
      | "majorNode"
      | "minorNode";
  },
  condition: ["majorNode", "minorNode"] as ("majorNode" | "minorNode")[],
};
