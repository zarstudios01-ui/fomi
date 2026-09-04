import GenerationCard, { GenerationCardSkeleton } from "@/components/workspace/GenerationCard";
import ErrorMessage from "@/components/feedback/ErrorMessage";

export default function GenerationGrid({
  status,
  variations,
  selectedId,
  onSelect,
  error,
  onRetry,
  aspectRatio = "16:9",
}) {
  if (status === "error") {
    return (
      <ErrorMessage
        title="Something went wrong"
        description={error || "Your generation could not be completed."}
        onRetry={onRetry}
      />
    );
  }

  return (
    <div>
      {status === "generating" && (
        <p className="text-body-sm text-secondary mb-3">Creating 4 variations — this may take a few moments.</p>
      )}
      {status === "generated" && (
        <p className="text-body-sm text-secondary mb-3">{variations.length} variations created — select one to continue.</p>
      )}

      <div className="grid grid-cols-2 gap-3">
        {status === "generating"
          ? Array.from({ length: 4 }).map((_, i) => (
              <GenerationCardSkeleton key={i} index={i} aspectRatio={aspectRatio} />
            ))
          : variations.map((v, i) => (
              <GenerationCard key={v.id} variation={v} selected={v.id === selectedId} onSelect={onSelect} index={i} />
            ))}
      </div>
    </div>
  );
}
