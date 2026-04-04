import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FiRefreshCw } from "react-icons/fi";
import { FiMoon, FiSun } from "react-icons/fi";
import { useAppContext } from "../../context/AppContext";
import {
  FiBell,
  FiChevronDown,
  FiCreditCard,
  FiGrid,
  FiHome,
  FiLogOut,
  FiMenu,
  FiPieChart,
  FiPlus,
  FiSearch,
  FiSettings,
  FiShield,
  FiTrendingUp,
  FiUser,
  FiX,
} from "react-icons/fi";

const navItems = [
  { name: "Overview", path: "/dashboard", icon: FiHome },
  { name: "Transactions", path: "/transactions", icon: FiCreditCard },
  { name: "Analytics", path: "/analytics", icon: FiPieChart },
  { name: "Insights", path: "/insights", icon: FiTrendingUp },
  { name: "Settings", path: "/settings", icon: FiSettings },
];

const complianceTags = ["SOC 2 Type II", "ISO 27001", "GDPR Ready", "PCI DSS"];

export default function DashboardLayout({
  role = "viewer",
  setRole = () => {},
  onQuickAdd = () => {},
  children,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useAppContext();
  const navigate = useNavigate();

  const { resetAllData } = useAppContext();

  const handleTopbarReset = () => {
    const confirmed = window.confirm(
      "Reset role and transactions to default demo data?",
    );

    if (!confirmed) return;
    resetAllData();
  };

  const linkClasses = ({ isActive }) =>
    `group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
      isActive ? "theme-nav-item-active" : "theme-nav-item"
    }`;

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
    >
      {/* Background */}
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in srgb, var(--bg) 78%, transparent) 0%, color-mix(in srgb, var(--bg) 92%, transparent) 100%)",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background: "var(--hero-wash)",
          }}
        />

        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "58px 58px",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.92), rgba(0,0,0,0.72), rgba(0,0,0,0.95))",
          }}
        />

        <div
          className="absolute inset-y-0 left-0 w-[28%]"
          style={{
            background:
              "linear-gradient(90deg, color-mix(in srgb, var(--bg) 88%, transparent), transparent)",
          }}
        />
      </div>

      {/* Mobile sidebar backdrop */}
      {mobileOpen && (
        <button
          aria-label="Close sidebar"
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[290px] transform border-r border-white/10 bg-[#07101f]/80 backdrop-blur-2xl transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          background:
            "linear-gradient(180deg, color-mix(in srgb, var(--bg-soft) 94%, transparent), color-mix(in srgb, var(--bg) 92%, transparent))",
          borderRight: "1px solid var(--surface-border)",
          boxShadow: "inset -1px 0 0 rgba(255,255,255,0.02)",
        }}
      >
        <div className="flex h-full flex-col">
          {/* Brand */}
          {/* Brand */}
          <div
            className="px-6 py-6"
            style={{ borderBottom: "1px solid var(--surface-border)" }}
          >
            <a
              href="/"
              className="group inline-flex items-center rounded-2xl p-3 transition-transform duration-200 hover:scale-[1.01]"
              style={{
                background:
                  "color-mix(in srgb, var(--surface-2) 88%, transparent)",
                border: "1px solid var(--surface-border)",
                boxShadow: "var(--shadow-panel)",
              }}
            >
              <img
                src={
                  theme === "dark"
                    ? "https://companyasset.blob.core.windows.net/assets/zorvynfulllogolight.png"
                    : "https://companyasset.blob.core.windows.net/assets/zorvynfulllogodark.png"
                }
                alt="Zorvyn"
                className="h-8 w-auto md:h-9 lg:h-10 transition-transform duration-200 group-hover:scale-[1.02]"
              />
            </a>

            <div className="mt-4">
              <p
                className="text-xs uppercase tracking-[0.34em]"
                style={{ color: "var(--text-muted)" }}
              >
                Fintech Dashboard
              </p>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 space-y-2 px-4 py-5">
            {navItems.map(({ name, path, icon: Icon }) => (
              <NavLink
                key={name}
                to={path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-medium transition-all duration-300 ${
                    isActive ? "theme-nav-item-active" : "theme-nav-item"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span
                        className="absolute left-0 top-1/2 h-9 w-1.5 -translate-y-1/2 rounded-r-full"
                        style={{
                          background:
                            "linear-gradient(180deg, var(--primary), var(--accent))",
                          boxShadow:
                            "0 0 18px color-mix(in srgb, var(--primary) 45%, transparent)",
                        }}
                      />
                    )}

                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300"
                      style={{
                        border: isActive
                          ? "1px solid color-mix(in srgb, var(--primary) 28%, var(--surface-border))"
                          : "1px solid var(--surface-border)",
                        background: isActive
                          ? "var(--surface-2)"
                          : "var(--surface)",
                        color: isActive ? "var(--text)" : "var(--text-muted)",
                        boxShadow: isActive
                          ? "0 0 24px color-mix(in srgb, var(--primary) 14%, transparent)"
                          : "none",
                      }}
                    >
                      <Icon />
                    </span>

                    <span
                      className="flex-1 transition-colors duration-300"
                      style={{
                        color: isActive ? "var(--text)" : "var(--text-soft)",
                        fontWeight: isActive ? 700 : 500,
                      }}
                    >
                      {name}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Bottom card */}
          <div className="border-t border-white/10 p-4">
            

            <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white">
              <FiLogOut />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div className="relative lg:pl-[290px]">
        {/* Topbar */}
        <header
          className="sticky top-0 z-30 backdrop-blur-2xl"
          style={{
            background: "color-mix(in srgb, var(--bg) 82%, transparent)",
            borderBottom: "1px solid var(--surface-border)",
          }}
        >
          <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <button
                className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-lg text-white transition hover:bg-white/10 lg:hidden"
                onClick={() => setMobileOpen(true)}
              >
                <FiMenu />
              </button>

              <div className="hidden md:block">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                  Financial Control Center
                </p>
                <h2 className="mt-1 text-xl font-semibold tracking-tight text-white">
                  Secure, Compliant & Intelligent Dashboard
                </h2>
              </div>
            </div>

            <div className="flex flex-1 items-center justify-end gap-3">
              {/* Search */}
              <div className="relative hidden w-full max-w-md lg:block">
                <FiSearch
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--text-muted)" }}
                />
                <input
                  type="text"
                  placeholder="Search transactions, categories..."
                  className="input-theme theme-control h-12 w-full rounded-2xl pl-11 pr-4 text-sm"
                />
              </div>

              {/* Role selector */}
              <div className="hidden sm:flex items-center rounded-2xl p-1 theme-surface-strong min-w-[190px]">
                <button
                  type="button"
                  onClick={() => setRole("viewer")}
                  className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                    role === "viewer"
                      ? "bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-400 text-white shadow-[0_8px_25px_rgba(75,114,255,0.28)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text)]"
                  }`}
                  aria-pressed={role === "viewer"}
                >
                  Viewer
                </button>

                <button
                  type="button"
                  onClick={() => setRole("admin")}
                  className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                    role === "admin"
                      ? "bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-400 text-white shadow-[0_8px_25px_rgba(75,114,255,0.28)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text)]"
                  }`}
                  aria-pressed={role === "admin"}
                >
                  Admin
                </button>
              </div>

              {/* Quick add */}
              {role === "admin" && (
                <button
                  onClick={() => navigate("/transactions")}
                  className="premium-orbit-btn"
                >
                  <span className="premium-orbit-inner">
                    <FiPlus className="text-base" />
                    Add Transaction
                  </span>
                </button>
              )}

              <button
                onClick={toggleTheme}
                className="theme-icon-button inline-flex h-12 w-12 items-center justify-center rounded-2xl text-lg"
                title={
                  theme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
              >
                {theme === "dark" ? <FiSun /> : <FiMoon />}
              </button>

              {/* Profile */}
              <div className="hidden items-center gap-3 rounded-2xl px-3 py-2 sm:flex theme-surface">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 text-white shadow-lg">
                  <FiUser />
                </div>
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--text)" }}
                  >
                    Masud
                  </p>
                  <p
                    className="text-xs capitalize"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {role}
                  </p>
                </div>
              </div>

              <button
                className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-lg text-white transition hover:bg-white/10 lg:hidden"
                onClick={() => setMobileOpen(false)}
              >
                <FiX />
              </button>
            </div>
          </div>
        </header>

        {/* Hero strip */}
        <section className="px-4 pt-6 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[28px] p-6 theme-surface-strong">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_22%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.12),transparent_22%)]" />
            <div className="relative flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
                  <FiGrid className="text-emerald-300" />
                  Trusted by modern finance teams
                </div>

                <h3 className="mt-5 max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl xl:text-5xl">
                  Building{" "}
                  <span className="zorvyn-gradient-text font-extrabold" >
                    secure, compliant, and intelligent
                  </span>{" "}
                  financial visibility.
                </h3>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                  Monitor balances, track transactions, compare monthly
                  performance, and surface actionable insights from a single
                  control center.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:min-w-[420px]">
                {[
                  { label: "Security", value: "99.9%" },
                  { label: "Insights", value: "Real-time" },
                  { label: "Workflows", value: "Role-based" },
                  { label: "Coverage", value: "Multi-view" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
                  >
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      {item.label}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Page content */}
        <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children || <Outlet context={{ role }} />}
        </main>
      </div>
    </div>
  );
}
