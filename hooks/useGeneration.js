"use client";

import { useState, useCallback } from "react";
import { DEFAULT_CREATIVE_DIRECTION } from "@/lib/constants";

/** @typedef {"idle"|"generating"|"generated"|"error"} GenerationStatus */

export function useGeneration() {
  const [prompt, setPrompt] = useState("");
  const [creativeDirection, setCreativeDirection] = useState(DEFAULT_CREATIVE_DIRECTION);
  const [status, setStatus] = useState(/** @type {GenerationStatus} */ ("idle"));
  const [variations, setVariations] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState(null);

  const updateDirection = useCallback((key, value) => {
    setCreativeDirection((prev) => ({ ...prev, [key]: value }));
  }, []);

  const generate = useCallback(async () => {
    setStatus("generating");
    setError(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, creativeDirection, count: 4 }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setError(data.error || "Something went wrong.");
        return;
      }

      setVariations(data.variations);
      setSelectedId(null);
      setStatus("generated");
    } catch (e) {
      setStatus("error");
      setError("Something went wrong. Check your connection and try again.");
    }
  }, [prompt, creativeDirection]);

  const reset = useCallback(() => {
    setStatus("idle");
    setVariations([]);
    setSelectedId(null);
    setError(null);
  }, []);

  return {
    prompt,
    setPrompt,
    creativeDirection,
    updateDirection,
    status,
    variations,
    selectedId,
    setSelectedId,
    error,
    generate,
    reset,
  };
}
