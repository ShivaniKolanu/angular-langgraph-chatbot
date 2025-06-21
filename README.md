# Angular LangGraph Chatbot

This project is a small workflow bot consisting of two main folders:

## 1. `angular-chatbot`
This folder contains the Angular frontend application. It provides a user interface for interacting with the chatbot, including chat UI components and styles. The Angular app is responsible for rendering the chat experience and communicating with the backend.

To start the Angular frontend:
```sh
ng serve
```

> **Note:** This project is mainly focused on wiring up Angular with the LangGraph.js concept, not on showcasing advanced Angular skills.

## 2. `langgraph-backend`
This folder contains the backend logic for the workflow bot, built using TypeScript. It defines the workflow graph, nodes, channels, and server logic that powers the chatbot's responses and workflow management. The backend also includes a Mermaid diagram (`graph.mmd`) and a generated image (`graph.png`) that visually represent the workflow graph structure.

To start the LangGraph backend server:
```sh
npx ts-node server.ts
```

To generate the workflow graph image:
```sh
npx ts-node generate-graph-image.ts
```

---

This project demonstrates a simple workflow automation bot with a clear separation between the frontend (Angular) and backend (LangGraph) components. The graph image below provides a visual overview of the workflow logic implemented in the backend.

![Workflow Graph](langgraph-backend/graph.png)
