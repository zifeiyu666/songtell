/** Routes intentionally absent from the standalone Songtell site. */
export const DISABLED_PUBLIC_PATHS = new Set([
  "/gifts/song-message",
  "/voice-clone",
  "/custom-song-lyrics-wall-art",
  "/lyric-poster-maker",
  "/occasions/custom-happy-birthday-song",
  "/occasions/custom-song-for-wife",
  "/occasions/mothers-day",
  "/occasions/fathers-day",
  "/occasions/valentines-day",
  "/occasions/congratulations",
  "/occasions/in-memoriam",
  "/occasions/thank-you",
  "/occasions/get-well-soon",
]);

const DISABLED_PUBLIC_PREFIXES = ["/playlists", "/glossary"];

export function isDisabledPublicPath(pathname: string) {
  const normalized = pathname.replace(/\/$/, "");
  const withoutLocale =
    normalized.replace(/^\/(?:en|es|ja)(?=\/|$)/, "") || "/";
  return (
    DISABLED_PUBLIC_PATHS.has(withoutLocale) ||
    DISABLED_PUBLIC_PREFIXES.some(
      (prefix) => withoutLocale === prefix || withoutLocale.startsWith(`${prefix}/`),
    )
  );
}
