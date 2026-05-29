/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded GenAI Client to prevent startup failure if key is initially absent
let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("WARNING: GEMINI_API_KEY environment variable is not set. The API will fallback to mock responses.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key || "MOCK_KEY",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// REST API for dynamic AI job generation
app.post("/api/generate-ai-job", async (req, res) => {
  const { faculty, problem } = req.body;

  if (!faculty || !problem) {
    res.status(400).json({ error: "Missing faculty or problem fields." });
    return;
  }

  // Check if API key is provided, if not we will generate a high-quality fallback seed to guarantee excellent presentation
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    // Elegant fallback simulation
    setTimeout(() => {
      const fallbackJob = {
        title: `AI-Augmented ${faculty.name.split(" ").slice(-2).join(" ")} Specialist`,
        roleSummary: `A high-impact pilot role designed specifically for students in the ${faculty.name}. Collaborates with local authorities and the ${faculty.code}-AI subsystem to counter local issues related to '${problem.category}' in ${problem.location}.`,
        primaryResponsibilities: [
          `Review anomalous data signals from the spatial predictive index mapping ${problem.location}.`,
          `Formulate personalized community intervention pathways utilizing federal funding channels.`,
          `Deliver de-escalation resources or logistics directly to high-risk street clusters based on live telemetry.`
        ],
        aiSubsystemName: `${faculty.code}-Empower Civic Engine v1.8`,
        aiHumanLoopTask: `Audit algorithmic risk indices of '${problem.title}' and override critical housing or support allocations based on empathetic human evaluation.`,
        federalAgencyCollaborator: "US Department of Health and Human Services (HHS)",
        stateAgencyCollaborator: "State Department of Social Services",
        resourceSharingRequired: [
          `HUD Homeless Management Information System (HMIS) Registry API`,
          `${problem.category} Local Demographic Data Feed`
        ],
        fundingAllocationSimulated: 125000,
        societalImpactTargets: [
          `Reduce administrative delay in transitional resource planning by 45%.`,
          `Accelerate direct field support mobilization rates within targeted blocks of ${problem.location}.`
        ]
      };
      res.json(fallbackJob);
    }, 1800);
    return;
  }

  try {
    const aiInstance = getAiClient();
    
    // Detailed prompts setting the contextual atmosphere and expectations
    const promptText = `
      You are the CivicAI Initiative's chief technical architect.
      We want you to construct a brand new, highly specific, revolutionary academic/professional AI job description.
      This job is custom-tailored for a university student from the following faculty:
      - Faculty: "${faculty.name}" (${faculty.code})
      - Academic Focus Area: "${faculty.academicFocus}"
      - Core Skills: ${JSON.stringify(faculty.coreSkills)}
      
      This job's purpose is to resolve/mitigate the following real-world modern societal challenge using collaborative state, federal, and local resource sharing:
      - Problem Title: "${problem.title}"
      - Category: "${problem.category}"
      - Situation & Location: "${problem.location}"
      - Shortfalls to address: ${JSON.stringify(problem.currentShortfalls)}
      
      Requirements:
      1. This job should feel highly realistic, futuristic but practical, and deeply embedded at the cross-section of AI and Civic Social Service.
      2. It must give the student real-world agency (and stipulate a specific 'Human-In-The-Loop' clinical/regulatory gate where human empathy, qualitative feedback, or ethics overrides or validates the AI system's recommendations).
      3. It must specify joint Federal-State collaboration programs/resources.
    `;

    const chatRes = await aiInstance.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptText,
      config: {
        systemInstruction: "You are an expert AI jobs labor architect and civic engineering consultant. Return high-quality JSON schemas specifically matching the given structures.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: "A highly specific, compelling human-centered title for the student's custom AI job. (e.g., 'Metropolitan Fentanyl Heatmap Triage Coordinator', 'Offline-Mesh Education Access Architect', 'Eviction Defense Predictive Compliance Specialist')."
            },
            roleSummary: {
              type: Type.STRING,
              description: "A 2-3 sentence overview explaining how this student role merges faculty knowledge and AI tools to combat this specific neighborhood problem."
            },
            primaryResponsibilities: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Exactly 3 clear, highly technical or clinical on-site/operational tasks the student performs using the custom AI agent."
            },
            aiSubsystemName: {
              type: Type.STRING,
              description: "The name of the dedicated AI diagnostic, supply chain, or matchmaking system the student orchestrates."
            },
            aiHumanLoopTask: {
              type: Type.STRING,
              description: "The critical ethical, qualitative, or empathetic checkpoint where the student has absolute veto/override power over the AI system."
            },
            federalAgencyCollaborator: {
              type: Type.STRING,
              description: "The specific Federal department coordinating the resources (e.g., FEMA, HUD, HHS (SAMHSA), Department of Justice, Department of Education)."
            },
            stateAgencyCollaborator: {
              type: Type.STRING,
              description: "The corresponding State agency acting as regional manager (e.g., State Health Department, Caltrans, State Housing Authority)."
            },
            resourceSharingRequired: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "2-3 dynamic resource streams shared between federal/state databases and the student-led AI application (e.g., 'HUD Local Shelter Availability Feed', 'State Drug-Alert Realtime Stream')."
            },
            fundingAllocationSimulated: {
              type: Type.INTEGER,
              description: "Simulated pilot launch grant allocation in USD (between 80000 and 220000) sourced from federal/state funds to seed the university lab."
            },
            societalImpactTargets: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Two precise, measurable impact markers this AI Job is designed to improve within 12 months (e.g. 'Reduction of sub-dosage response time by 35%', 'Increase digital learning participation in rural tracts by 15%')."
            }
          },
          required: [
            "title",
            "roleSummary",
            "primaryResponsibilities",
            "aiSubsystemName",
            "aiHumanLoopTask",
            "federalAgencyCollaborator",
            "stateAgencyCollaborator",
            "resourceSharingRequired",
            "fundingAllocationSimulated",
            "societalImpactTargets"
          ]
        }
      }
    });

    const jsonStr = chatRes.text ? chatRes.text.trim() : "{}";
    const jobData = JSON.parse(jsonStr);
    res.json(jobData);
  } catch (error: any) {
    console.error("Gemini Generation Error:", error);
    res.status(500).json({ error: "Failed to generate AI Job through Gemini API, server encountered an error." });
  }
});

// Configure Vite integration for Dev or handle Production Static Files
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[CivicAI Core Server] Started successfully on http://0.0.0.0:${PORT}`);
  });
}

setupServer();
