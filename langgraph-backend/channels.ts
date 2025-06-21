// channels.ts
import { StateGraphArgs } from "@langchain/langgraph";
import type { ChatState } from "./types";

export const channels: StateGraphArgs<ChatState>["channels"] = {
  name: {
    value: (_, next) => next,
    default: () => "",
  },
  lastName: {
    value: (_, next) => next,
    default: () => "",
  },
  age: {
    value: (_, next) => next,
    default: () => null,
  },
  step: {
    value: (_, next) => next,
    default: () => "start",
  },
  messages: {
    value: (prev, next) => [...(prev ?? []), ...(next ?? [])],
    default: () => [],
  },
};
