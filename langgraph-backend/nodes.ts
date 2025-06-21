// nodes.ts
import type { ChatState } from "./types";

export const nodes = {
  inputFirstName: async (
  state: ChatState,
  { input }: { input: string } = { input: "" }
) => {
  if (!input) {
    // First time: ask for first name
    return {
      messages: ["What is your first name?"],
      step: "inputFirstName",
    };
  }
  // Input given: save it and ask for last name next
  return {
    name: input,
    messages: [`Got it, your first name is ${input}. What is your last name?`],
    step: "inputLastName",
  };
},


  inputLastName: async (
  state: ChatState,
  { input }: { input: string } = { input: "" }
) => {
  if (!input) {
    return {
      messages: [`Thanks ${state.name}. What is your last name?`],
      step: "inputLastName",
    };
  }
  return {
    lastName: input,
    messages: [`Thanks ${state.name} ${input}. What is your age?`],
    step: "askAge",
  };
},

 askAge: async (
  state: ChatState,
  { input }: { input: string } = { input: "" }
) => {
  if (!input) {
    return {
      messages: [`Hi ${state.name}, what is your age?`],
      step: "askAge",
    };
  }
  const age = Number(input);
  if (isNaN(age)) {
    return {
      messages: [
        `Sorry, I didn't understand your age. Please enter a valid number.`
      ],
      step: "askAge",
    };
  }
  const isMajor = age >= 18;
  return {
    age,
    messages: [
      `${state.name} ${state.lastName}, you are a ${isMajor ? "major" : "minor"}.`
    ],
    step: "end",
  };
},

 majorNode: async (state: ChatState) => {
  return {
    messages: [`${state.name} ${state.lastName}, you are a major.`],
    step: "end",
  };
},

minorNode: async (state: ChatState) => {
  return {
    messages: [`${state.name} ${state.lastName}, you are a minor.`],
    step: "end",
  };
}
};
