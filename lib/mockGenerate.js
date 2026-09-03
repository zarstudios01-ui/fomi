// Deterministic-ish placeholder "renders". No real model is called —
// this stands in for the AI generation backend described in the brief.
// Swapping this for a real provider later means editing this file only;
// nothing above it (the route, the hook, the components) needs to change.

const LABELS = ["Hero", "Side profile", "Detail", "Environment"];

function seededGradient(seed) {
  // Cheap deterministic "different every time" gradient so each mock
  // generation card looks visually distinct without any real image.
  const hue = (seed * 47) % 360;
  return `linear-gradient(135deg, hsl(${hue} 30% 14%), hsl(${(hue + 40) % 360} 25% 8%))`;
}

/**
 * @param {{ prompt: string, creativeDirection: object, count?: number }} input
 * @returns {Promise<{ ok: boolean, variations?: object[], error?: string }>}
 */
export async function mockGenerate({ prompt, creativeDirection, count = 4 }) {
  await new Promise((resolve) => setTimeout(resolve, 1800));

  if (!prompt || !prompt.trim()) {
    return { ok: false, error: "Please enter a prompt." };
  }

  // ~8% simulated failure rate so the UI's error state is reachable
  if (Math.random() < 0.08) {
    return { ok: false, error: "Generation could not be completed." };
  }

  const seedBase = Date.now();
  const variations = Array.from({ length: count }).map((_, i) => ({
    id: `${seedBase}-${i}`,
    label: LABELS[i % LABELS.length],
    aspectRatio: creativeDirection?.aspectRatio || "16:9",
    engine: "Fomi Pro",
    gradient: seededGradient(seedBase + i),
    createdAt: new Date().toISOString(),
  }));

  return { ok: true, variations };
}
