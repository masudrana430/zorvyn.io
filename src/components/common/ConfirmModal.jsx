import { FiAlertTriangle, FiTrash2, FiX } from "react-icons/fi";

export default function ConfirmModal({
  open,
  title = "Delete transaction?",
  message = "This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  confirmVariant = "danger",
  onConfirm,
  onClose,
}) {
  if (!open) return null;

  const confirmClass =
    confirmVariant === "danger"
      ? "bg-gradient-to-r from-rose-500 to-red-500 text-white shadow-[0_12px_35px_rgba(244,63,94,0.28)] hover:from-rose-400 hover:to-red-400"
      : "bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-400 text-white shadow-[0_12px_35px_rgba(75,114,255,0.35)] hover:scale-[1.01]";

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-[30px] border border-white/10 bg-[#081120]/95 shadow-[0_0_90px_rgba(50,90,220,0.18)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,124,255,0.18),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(244,63,94,0.10),transparent_28%)]" />

        <div className="relative p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-rose-400/20 bg-rose-400/10 text-rose-300 shadow-[0_0_30px_rgba(244,63,94,0.10)]">
                <FiAlertTriangle className="text-2xl" />
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                  Destructive Action
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                  {title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-7 text-slate-400">
                  {message}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <FiX />
            </button>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-400">
            Deleting this item removes it from your persisted dashboard data.
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="h-12 rounded-2xl border border-white/10 bg-white/5 px-5 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              {cancelText}
            </button>

            <button
              type="button"
              onClick={onConfirm}
              className={`inline-flex h-12 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-semibold transition ${confirmClass}`}
            >
              <FiTrash2 />
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}