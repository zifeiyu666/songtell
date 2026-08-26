import assert from "node:assert/strict";
import { afterEach, describe, test } from "node:test";

import {
  CreemModerationError,
  moderateCreemPrompt,
} from "@/lib/creem/moderation";

const originalFetch = globalThis.fetch;
const originalApiKey = process.env.CREEM_API_KEY;
const originalBaseUrl = process.env.CREEM_API_BASE_URL;

afterEach(() => {
  globalThis.fetch = originalFetch;

  if (originalApiKey === undefined) delete process.env.CREEM_API_KEY;
  else process.env.CREEM_API_KEY = originalApiKey;

  if (originalBaseUrl === undefined) delete process.env.CREEM_API_BASE_URL;
  else process.env.CREEM_API_BASE_URL = originalBaseUrl;
});

describe("Creem prompt moderation", () => {
  test("forwards only an allowed prompt to image generation", async () => {
    process.env.CREEM_API_KEY = "creem_test_example";
    process.env.CREEM_API_BASE_URL = "https://test-api.creem.io/v1";

    let request: Request | undefined;
    globalThis.fetch = async (input, init) => {
      request = new Request(input, init);
      return Response.json({ decision: "allow", id: "mod_123" });
    };

    const result = await moderateCreemPrompt({
      prompt: "A calm watercolor lighthouse at sunset",
      externalId: "cover:song-123",
    });

    assert.equal(result.id, "mod_123");
    assert.equal(request?.url, "https://test-api.creem.io/v1/moderation/prompt");
    assert.equal(request?.headers.get("x-api-key"), "creem_test_example");
    assert.deepEqual(await request?.json(), {
      prompt: "A calm watercolor lighthouse at sunset",
      external_id: "cover:song-123",
    });
  });

  test("blocks a flagged prompt", async () => {
    process.env.CREEM_API_KEY = "creem_test_example";
    globalThis.fetch = async () => Response.json({ decision: "flag" });

    await assert.rejects(
      () => moderateCreemPrompt({ prompt: "unsafe prompt" }),
      (error: unknown) =>
        error instanceof CreemModerationError && error.code === "blocked",
    );
  });

  test("fails closed when Creem cannot be reached", async () => {
    process.env.CREEM_API_KEY = "creem_test_example";
    globalThis.fetch = async () => {
      throw new Error("network unavailable");
    };

    await assert.rejects(
      () => moderateCreemPrompt({ prompt: "safe prompt" }),
      (error: unknown) =>
        error instanceof CreemModerationError && error.code === "unavailable",
    );
  });
});
