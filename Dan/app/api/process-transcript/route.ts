import { NextRequest, NextResponse } from "next/server";
import { b } from "../../../baml_client";

export async function POST(request: NextRequest) {
  console.log("POST request received to extract problems");

  try {
    // Parse the request body
    console.log("Parsing request body...");
    const body = await request.json();
    const { transcript } = body;

    console.log("Request body parsed successfully");
    console.log("Transcript length:", transcript?.length || 0);

    // Log truncated transcript to avoid flooding logs
    const truncatedTranscript =
      transcript?.substring(0, 100) + (transcript?.length > 100 ? "..." : "");
    console.log("Processing transcript (truncated):", truncatedTranscript);

    console.log("Calling b.ExtractProblems...");
    const problemsOutput = await b.ExtractProblems(transcript);

    console.log(
      "Problems extracted successfully:",
      JSON.stringify(problemsOutput)
    );

    return NextResponse.json(problemsOutput, { status: 200 });
  } catch (error) {
    console.error("Error processing transcript:", error);
    console.error(
      "Error details:",
      error instanceof Error ? error.message : String(error)
    );
    console.error(
      "Error stack:",
      error instanceof Error ? error.stack : "No stack trace available"
    );

    return NextResponse.json(
      {
        error: "Failed to process transcript",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
