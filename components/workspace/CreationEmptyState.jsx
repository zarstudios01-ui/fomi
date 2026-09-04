import IntentCard from "@/components/workspace/IntentCard";
import PromptComposer from "@/components/workspace/PromptComposer";
import { INTENT_CARDS } from "@/lib/constants";

export default function CreationEmptyState({
  prompt,
  onPromptChange,
  creativeDirection,
  onDirectionChange,
  selectedIntent,
  onSelectIntent,
  onSubmit,
  status,
  error,
}) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-display-md text-primary">What are you making?</h1>
          <p className="text-body-lg text-secondary mt-2">Start with an idea, reference, or creative direction.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
          {INTENT_CARDS.map((card) => (
            <IntentCard key={card.id} {...card} selected={selectedIntent === card.id} onSelect={onSelectIntent} />
          ))}
        </div>

        <PromptComposer
          prompt={prompt}
          onPromptChange={onPromptChange}
          creativeDirection={creativeDirection}
          onDirectionChange={onDirectionChange}
          onSubmit={onSubmit}
          status={status}
          error={error}
        />
      </div>
    </div>
  );
}
