import { Navigate, Route, Routes } from "react-router-dom";
import { FiClock } from "react-icons/fi";

import DashboardLayout from "../components/layout/DashboardLayout";
import DashboardPage from "../pages/DashboardPage";
import TransactionsPage from "../pages/TransactionsPage";
import { useAppContext } from "../context/AppContext";
import SettingsPage from "../pages/SettingsPage";

function ComingSoonPage({ title, description }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_0_45px_rgba(40,70,160,0.08)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
        <FiClock className="text-2xl text-slate-300" />
      </div>

      <div className="mx-auto mt-6 max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
          Placeholder Page
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
          {title}
        </h1>
        <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
          {description}
        </p>
      </div>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-8 text-center shadow-[0_0_45px_rgba(40,70,160,0.08)] backdrop-blur-xl">
      <p className="text-xs uppercase tracking-[0.28em] text-slate-500">404 Error</p>
      <h1 className="mt-3 text-3xl font-semibold text-white">Page not found</h1>
      <p className="mt-4 text-sm leading-7 text-slate-400">
        The page you are looking for does not exist or has been moved.
      </p>
    </div>
  );
}

export default function AppRouter() {
  const { role, setRole } = useAppContext();

  return (
    <Routes>
      <Route
        path="/"
        element={<DashboardLayout role={role} setRole={setRole} />}
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="transactions" element={<TransactionsPage />} />

        <Route
          path="analytics"
          element={
            <ComingSoonPage
              title="Analytics"
              description="This section can later include deeper trend analysis, category comparisons, and forecasting widgets."
            />
          }
        />

        <Route
          path="insights"
          element={
            <ComingSoonPage
              title="Insights"
              description="This section can later show generated observations, monthly patterns, and recommended actions based on spending behavior."
            />
          }
        />

        <Route path="settings" element={<SettingsPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}