import { FiAlertTriangle, FiRefreshCw, FiShield } from "react-icons/fi";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";

export default function SettingsPage() {
  const { role, transactions, resetAllData } = useAppContext();

  const handleReset = () => {
  const confirmed = window.confirm(
    "This will reset role and all transactions to the default demo data. Continue?"
  );

  if (!confirmed) return;

  resetAllData();
  toast.info("Dashboard data has been reset.");
};

  return (
    <div className="space-y-6 lg:space-y-8">
      <section className="rounded-[28px] border border-white/10 bg-gradient-to-r from-white/[0.07] to-white/[0.03] p-6 shadow-[0_0_50px_rgba(55,90,200,0.10)] backdrop-blur-xl">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-300">
              <FiShield className="text-emerald-300" />
              Workspace Settings
            </div>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Manage dashboard preferences
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">
              Control demo data behavior and restore the application to its original state.
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Current Role</p>
          <h3 className="mt-3 text-2xl font-semibold capitalize text-white">{role}</h3>
          <p className="mt-2 text-sm text-slate-400">Role persisted in local storage.</p>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Transactions</p>
          <h3 className="mt-3 text-2xl font-semibold text-white">{transactions.length}</h3>
          <p className="mt-2 text-sm text-slate-400">Stored demo records currently available.</p>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Persistence</p>
          <h3 className="mt-3 text-2xl font-semibold text-white">Enabled</h3>
          <p className="mt-2 text-sm text-slate-400">Role and transactions survive refresh.</p>
        </div>
      </section>

      <section className="rounded-[28px] border border-rose-400/20 bg-rose-400/5 p-6 shadow-[0_0_45px_rgba(244,63,94,0.08)] backdrop-blur-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-rose-400/20 bg-rose-400/10 text-rose-300">
              <FiAlertTriangle className="text-xl" />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white">Reset Demo Data</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-300">
                This restores the app to its default state by clearing saved local data and reloading
                the original sample transactions. Your role will be set back to <span className="font-medium text-white">viewer</span>.
              </p>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-rose-400/20 bg-rose-500/10 px-5 text-sm font-semibold text-rose-300 transition hover:bg-rose-500/20 hover:text-white"
          >
            <FiRefreshCw />
            Reset Data
          </button>
        </div>
      </section>
    </div>
  );
}