// server.ts
import express from "express";
import cors from "cors";
import { START, END, StateGraph } from "@langchain/langgraph";
import { nodes } from "./nodes";
import { channels } from "./channels";
import { conditionalEdges } from "./conditionalEdges";
import type { ChatState as BaseChatState } from "./types";

// Extend ChatState to allow an optional input property for internal use
interface ChatState extends BaseChatState {
  input?: string;
}

const app = express();
app.use(cors());
app.use(express.json());

// Adapter to wrap node functions to accept only state
function adaptNode(fn: any) {
  return async (state: ChatState) => {
    // If state.input exists, pass it as { input }, else just state
    if (typeof fn === "function" && state && typeof state.input !== "undefined") {
      return fn(state, { input: state.input });
    }
    return fn(state);
  };
}

const builder = new StateGraph<ChatState>({ channels })
  // nodes
  .addNode("inputFirstName", adaptNode(nodes.inputFirstName))
  .addNode("inputLastName", adaptNode(nodes.inputLastName))
  .addNode("askAge", adaptNode(nodes.askAge))
  .addNode("minorNode", adaptNode(nodes.minorNode))
  .addNode("majorNode", adaptNode(nodes.majorNode))
  // edges
  .addEdge(START, "inputFirstName")           // Important: START to first node
  .addEdge("inputFirstName", "inputLastName")
  .addEdge("inputLastName", "askAge")
  .addConditionalEdges("askAge", conditionalEdges.router, conditionalEdges.condition)
  .addEdge("minorNode", END)
  .addEdge("majorNode", END);


const graph = builder.compile();

// @ts-ignore
app.post("/chat", async (req, res) => {
  const { state, input } = req.body;

  if (!state || input === undefined) {
    return res.status(400).json({ error: "Missing state or input" });
  }

  let currentStep = state.step || '__start__';
  let nextState = { ...state, input };
  let nodeName: keyof typeof nodes = currentStep === '__start__' ? 'inputFirstName' : currentStep as keyof typeof nodes;

  // If at END, just return state
  if (currentStep === 'end') {
    return res.json({ ...nextState, step: 'end' });
  }

  // Always run the node for the current step
  const nodeFn = nodes[nodeName];
  if (!nodeFn) {
    return res.status(400).json({ error: `Unknown node: ${nodeName}` });
  }
  const updatedState = await adaptNode(nodeFn)(nextState);

  // Use the step returned by the node as the next step
  const nextStep = updatedState.step;

  res.json({ ...updatedState, step: nextStep });
});

app.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});
