import { FiActivity } from "react-icons/fi";

export default function PageLoader({ message = "Loading dashboard..." }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <div className="relative flex h-24 w-24 items-center justify-center">
        <div className="loader-ring" />
        <div className="loader-core">
          <FiActivity className="text-2xl" />
        </div>
      </div>

      <h3
        className="mt-6 text-xl font-semibold"
        style={{ color: "var(--text)" }}
      >
        {message}
      </h3>

      <p
        className="mt-2 text-sm"
        style={{ color: "var(--text-muted)" }}
      >
        Preparing secure financial insights...
      </p>
    </div>
  );
}