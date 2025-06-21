import fs from "fs";
import { execSync } from "child_process";

// Mermaid diagram for your chatbot graph
const mermaid = `flowchart TD
    START --> inputFirstName
    inputFirstName --> inputLastName
    inputLastName --> askAge
    askAge --|age < 18|--> minorNode
    askAge --|age >= 18|--> majorNode
    minorNode --> END
    majorNode --> END
`;

// Write the Mermaid diagram to a file
fs.writeFileSync("graph.mmd", mermaid);
console.log("Mermaid diagram saved as graph.mmd");

// Generate PNG using mermaid-cli (mmdc)
execSync("npx mmdc -i graph.mmd -o graph.png");
console.log("Graph image saved as graph.png");
