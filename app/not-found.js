import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-background">
      <p className="text-display-md text-primary">404</p>
      <p className="text-body-lg text-secondary mt-2 max-w-sm">
        This page doesn&apos;t exist. It may have moved, or the link is wrong.
      </p>
      <Link
        href="/create"
        className="mt-6 inline-flex items-center justify-center h-9 px-4 rounded bg-accent text-background text-body font-medium"
      >
        Back to Image Creation
      </Link>
    </div>
  );
}
