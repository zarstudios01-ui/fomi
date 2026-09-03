import TopBar from "@/components/layout/TopBar";
import MobileHeader from "@/components/layout/MobileHeader";

/**
 * Used by routes that share the shell (TopBar/MobileHeader/breadcrumb)
 * but don't have a built-out workspace yet — Video, Edit, Upscale,
 * Projects, Generations, Assets, Templates, Settings. Keeps sidebar
 * navigation fully clickable without pretending those flows are done.
 */
export default function ComingSoonPage({ title, description, breadcrumbItems }) {
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <TopBar breadcrumbItems={breadcrumbItems || [{ label: title }]} />
      <MobileHeader title={title} />
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-heading-1 text-primary">{title}</h1>
        <p className="text-body-lg text-secondary mt-2 max-w-sm">{description}</p>
      </div>
    </div>
  );
}
