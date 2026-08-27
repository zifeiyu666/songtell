import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

test("Creem moderation logs decisions without logging prompts", () => {
  const source = readFileSync(
    join(process.cwd(), "lib/creem/moderation.ts"),
    "utf8",
  );

  assert.match(source, /getLogger\("creem-moderation"\)/);
  assert.match(source, /logger\.info\(/);
  assert.match(source, /event:\s*"creem_moderation"/);
  assert.match(source, /moderationId:/);
  assert.doesNotMatch(source, /logger\.(?:info|warn|error)\(\{[^}]*prompt/);
});
