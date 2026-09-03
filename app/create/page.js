"use client";

import { useEffect, useRef, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { useGeneration } from "@/hooks/useGeneration";
import { useToast } from "@/components/overlay/ToastProvider";
import CreationEmptyState from "@/components/workspace/CreationEmptyState";
import GenerationGrid from "@/components/workspace/GenerationGrid";
import CreativeDirectionPanel from "@/components/workspace/CreativeDirectionPanel";
import RefinePanel from "@/components/workspace/RefinePanel";
import PromptComposer from "@/components/workspace/PromptComposer";
import Button from "@/components/ui/Button";

export default function CreatePage() {
  const {
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
  } = useGeneration();

  const [selectedIntent, setSelectedIntent] = useState(null);
  const [directionDrawerOpen, setDirectionDrawerOpen] = useState(false);
  const { showToast } = useToast();
  const previousStatus = useRef(status);

  // Surface generation outcomes as toasts — matches the Feedback States
  // sheet ("4 variations generated" / error) without coupling the hook
  // itself to a UI concern.
  useEffect(() => {
    if (previousStatus.current === "generating" && status === "generated") {
      showToast({
        tone: "success",
        title: "Generation completed",
        description: `${variations.length} variations generated successfully.`,
      });
    }
    if (previousStatus.current === "generating" && status === "error") {
      showToast({ tone: "error", title: "Generation failed", description: error });
    }
    previousStatus.current = status;
  }, [status, variations.length, error, showToast]);

  const hasStarted = status !== "idle";

  return (
    <div className="flex-1 flex min-h-0 relative">
      <main className="flex-1 min-w-0 flex flex-col overflow-y-auto">
        {!hasStarted ? (
          <CreationEmptyState
            prompt={prompt}
            onPromptChange={setPrompt}
            aspectRatio={creativeDirection.aspectRatio}
            selectedIntent={selectedIntent}
            onSelectIntent={(id) => {
              setSelectedIntent(id);
              updateDirection("subject", id.charAt(0).toUpperCase() + id.slice(1));
            }}
            onSubmit={generate}
            status={status}
            error={error}
          />
        ) : (
          <div className="flex-1 flex flex-col p-6 gap-5 max-w-3xl mx-auto w-full">
            <GenerationGrid
              status={status}
              variations={variations}
              selectedId={selectedId}
              onSelect={setSelectedId}
              error={error}
              onRetry={generate}
            />

            {selectedId && status === "generated" && (
              <RefinePanel onApply={() => {}} />
            )}

            <PromptComposer
              prompt={prompt}
              onPromptChange={setPrompt}
              aspectRatio={creativeDirection.aspectRatio}
              onSubmit={generate}
              status={status}
              error={null}
            />
          </div>
        )}
      </main>

      <CreativeDirectionPanel
        values={creativeDirection}
        onChange={updateDirection}
        open={directionDrawerOpen}
        onClose={() => setDirectionDrawerOpen(false)}
      />

      {/* Opens the Creative Direction drawer below the desktop breakpoint */}
      <Button
        variant="secondary"
        icon
        onClick={() => setDirectionDrawerOpen(true)}
        aria-label="Open creative direction"
        className="lg:hidden fixed bottom-20 right-4 z-20 shadow-elevation-2"
      >
        <SlidersHorizontal className="w-4 h-4" />
      </Button>
    </div>
  );
}
