import { OpenAI } from "openai";
import { NextResponse } from "next/server";
import { z } from "zod";
import { WorkflowData } from "@/types/workflow";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not set in environment variables");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const promptSchema = z.object({
  prompt: z.string().min(1),
});

const workflowSchema = z.object({
  workflow: z.object({
    nodes: z.array(
      z.object({
        id: z.string(),
        type: z.enum(["trigger", "action", "filter", "loop", "condition"]),
        label: z.string(),
        description: z.string().optional(),
        icon: z.string().optional(),
      })
    ),
    edges: z.array(
      z.object({
        source: z.string(),
        target: z.string(),
        label: z.string().optional(),
      })
    ),
  }),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { prompt } = promptSchema.parse(json);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an expert in n8n workflow automation. Convert natural language workflow descriptions into n8n node structures.
          Return ONLY a JSON object matching this structure:
          {
            "workflow": {
              "nodes": [
                {
                  "id": "string",
                  "type": "trigger|action|filter|loop|condition",
                  "label": "string",
                  "description": "string (optional)",
                  "icon": "string (optional)"
                }
              ],
              "edges": [
                {
                  "source": "node_id",
                  "target": "node_id",
                  "label": "string (optional)"
                }
              ]
            }
          }`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
      response_format: { type: "json_object" },
    });

    try {
      const result = JSON.parse(completion.choices[0].message.content || "");
      const validatedResult = workflowSchema.parse(result);
      return NextResponse.json(validatedResult);
    } catch (parseError) {
      console.error("Failed to parse OpenAI response:", parseError);
      return NextResponse.json(
        { error: "Invalid response format from AI model" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request format" },
        { status: 400 }
      );
    }

    if (error instanceof OpenAI.APIError) {
      return NextResponse.json(
        { error: "AI service temporarily unavailable" },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "Failed to generate workflow" },
      { status: 500 }
    );
  }
}
