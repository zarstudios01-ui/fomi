import TopBar from "@/components/layout/TopBar";
import MobileHeader from "@/components/layout/MobileHeader";

export default function CreateLayout({ children }) {
  return (
    <>
      <TopBar
        breadcrumbItems={[{ label: "Image Creation" }, { label: "Untitled project" }]}
      />
      <MobileHeader title="Image Creation" subtitle="Untitled project" />
      <div className="flex-1 flex min-h-0">{children}</div>
    </>
  );
}
