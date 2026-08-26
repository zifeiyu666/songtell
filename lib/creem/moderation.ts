const DEFAULT_CREEM_API_BASE_URL = "https://api.creem.io/v1";
const MODERATION_TIMEOUT_MS = 5_000;

type ModerationDecision = "allow" | "flag" | "deny";

type CreemModerationResponse = {
  decision?: ModerationDecision;
  id?: string;
};

export class CreemModerationError extends Error {
  constructor(
    message: string,
    public readonly code: "blocked" | "unavailable",
  ) {
    super(message);
    this.name = "CreemModerationError";
  }
}

export async function moderateCreemPrompt({
  externalId,
  prompt,
}: {
  externalId?: string;
  prompt: string;
}): Promise<{ id?: string }> {
  const apiKey = process.env.CREEM_API_KEY;
  if (!apiKey) {
    throw new CreemModerationError(
      "Creem moderation is not configured.",
      "unavailable",
    );
  }

  const baseUrl = (
    process.env.CREEM_API_BASE_URL ?? DEFAULT_CREEM_API_BASE_URL
  ).replace(/\/$/, "");

  let response: Response;
  try {
    response = await fetch(`${baseUrl}/moderation/prompt`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        prompt,
        ...(externalId ? { external_id: externalId } : {}),
      }),
      signal: AbortSignal.timeout(MODERATION_TIMEOUT_MS),
    });
  } catch {
    throw new CreemModerationError(
      "Content moderation is temporarily unavailable.",
      "unavailable",
    );
  }

  if (!response.ok) {
    throw new CreemModerationError(
      "Content moderation is temporarily unavailable.",
      "unavailable",
    );
  }

  let result: CreemModerationResponse;
  try {
    result = (await response.json()) as CreemModerationResponse;
  } catch {
    throw new CreemModerationError(
      "Content moderation returned an invalid response.",
      "unavailable",
    );
  }

  if (result.decision === "allow") return { id: result.id };

  if (result.decision === "flag" || result.decision === "deny") {
    throw new CreemModerationError(
      "This request cannot be processed. Please revise it and try again.",
      "blocked",
    );
  }

  throw new CreemModerationError(
    "Content moderation returned an invalid response.",
    "unavailable",
  );
}
