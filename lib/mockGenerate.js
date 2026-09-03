const LABELS = ["Hero", "Side profile", "Detail", "Environment"];

const ASPECT_RATIO_DIMENSIONS = {
  "16:9": { width: 1024, height: 576 },
  "9:16": { width: 576, height: 1024 },
  "4:3": { width: 1024, height: 768 },
  "1:1": { width: 1024, height: 1024 },
  "2:3": { width: 768, height: 1152 },
};

function buildPrompt({ prompt, creativeDirection, variant }) {
  const parts = [
    prompt,
    creativeDirection?.subject && `${creativeDirection.subject} photography`,
    creativeDirection?.visualStyle && `${creativeDirection.visualStyle} style`,
    creativeDirection?.mood && `${creativeDirection.mood} mood`,
    creativeDirection?.lighting && `${creativeDirection.lighting} lighting`,
    variant,
  ].filter(Boolean);
  return parts.join(", ");
}

function buildImageUrl({ prompt, creativeDirection, variant, seed }) {
  const { width, height } = ASPECT_RATIO_DIMENSIONS[creativeDirection?.aspectRatio] || ASPECT_RATIO_DIMENSIONS["16:9"];
  const fullPrompt = buildPrompt({ prompt, creativeDirection, variant });
  const encoded = encodeURIComponent(fullPrompt);
  const params = new URLSearchParams({
    width: String(width),
    height: String(height),
    seed: String(seed),
    nologo: "true",
  });
  return `https://image.pollinations.ai/prompt/${encoded}?${params.toString()}`;
}

export async function mockGenerate({ prompt, creativeDirection, count = 4 }) {
  if (!prompt || !prompt.trim()) {
    return { ok: false, error: "Please enter a prompt." };
  }

  const seedBase = Date.now();
  const variants = ["hero shot", "side profile", "close-up detail", "environment shot"];

  const variations = Array.from({ length: count }).map((_, i) => {
    const seed = seedBase + i;
    return {
      id: `${seed}`,
      label: LABELS[i % LABELS.length],
      aspectRatio: creativeDirection?.aspectRatio || "16:9",
      engine: "Pollinations",
      imageUrl: buildImageUrl({ prompt, creativeDirection, variant: variants[i % variants.length], seed }),
      createdAt: new Date().toISOString(),
    };
  });

  return { ok: true, variations };
}
