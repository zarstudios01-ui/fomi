export function buildPollinationsUrl({ prompt, width, height, seed }) {
  const encoded = encodeURIComponent(prompt);
  const params = new URLSearchParams({
    width: String(width),
    height: String(height),
    seed: String(seed),
    nologo: "true",
  });
  return `https://image.pollinations.ai/prompt/${encoded}?${params.toString()}`;
}
