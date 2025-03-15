import { NextRequest, NextResponse } from "next/server";
import { ClaudeClient } from "@/utils/inference/inference";
import {
  generateContactCategoryPrompt,
  ContactInfOutput,
} from "@/utils/inference/contactPrompt";
import { b } from "../../../baml_client";

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { transcript } = body;

    const problemsOutput = b.ExtractProblems(transcript);

    return NextResponse.json(problemsOutput, { status: 200 });
  } catch (error) {
    console.error("Error processing transcript:", error);
    return NextResponse.json(
      { error: "Failed to process transcript" },
      { status: 500 }
    );
  }
}
