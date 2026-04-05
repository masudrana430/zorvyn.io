import { useEffect, useMemo, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import PageLoader from "../components/common/PageLoader";
import {
  FiCalendar,
  FiChevronDown,
  FiCreditCard,
  FiDollarSign,
  FiEdit2,
  FiFilter,
  FiPlus,
  FiSearch,
  FiShield,
  FiTrash2,
  FiTrendingDown,
  FiTrendingUp,
  FiX,
} from "react-icons/fi";
import ConfirmModal from "../components/common/ConfirmModal";


const defaultForm = {
  title: "",
  amount: "",
  category: "Food",
  type: "expense",
  date: "",
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const categories = [
  "Salary",
  "Freelance",
  "Investments",
  "Housing",
  "Food",
  "Utilities",
  "Transport",
  "Health",
  "Shopping",
  "Other",
];

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatAmount(type, amount) {
  return `${type === "income" ? "+" : "-"}${currency.format(amount)}`;
}

function getMonthValue(dateString) {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function StatCard({ title, value, meta, icon: Icon, accent = "blue" }) {
  const accents = {
    blue: "from-blue-500/20 to-blue-400/5 text-blue-300",
    emerald: "from-emerald-500/20 to-emerald-400/5 text-emerald-300",
    violet: "from-violet-500/20 to-violet-400/5 text-violet-300",
    amber: "from-amber-500/20 to-amber-400/5 text-amber-300",
  };

  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_40px_rgba(45,80,180,0.08)] backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
            {title}
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
            {value}
          </h3>
          <p className="mt-2 text-sm text-slate-400">{meta}</p>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br ${accents[accent]}`}
        >
          <Icon className="text-lg" />
        </div>
      </div>
    </div>
  );
}

function FormField({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </span>
      {children}
    </label>
  );
}

function TransactionModal({ open, mode, form, setForm, onClose, onSubmit }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-[28px] border border-white/10 bg-[#081120] p-6 shadow-[0_0_80px_rgba(50,90,220,0.25)]">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
              {mode === "edit" ? "Update Entry" : "Create Entry"}
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              {mode === "edit" ? "Edit Transaction" : "Add Transaction"}
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Keep financial activity clean, categorized, and easy to track.
            </p>
          </div>

          <button
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          >
            <FiX />
          </button>
        </div>

        <form
          onSubmit={onSubmit}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <div className="sm:col-span-2">
            <FormField label="Title">
              <input
                type="text"
                value={form.title}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="e.g. Grocery Store"
                className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-blue-400/40"
                required
              />
            </FormField>
          </div>

          <FormField label="Amount">
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.amount}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, amount: e.target.value }))
              }
              placeholder="0.00"
              className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-blue-400/40"
              required
            />
          </FormField>

          <FormField label="Date">
            <input
              type="date"
              value={form.date}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, date: e.target.value }))
              }
              className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition focus:border-blue-400/40"
              required
            />
          </FormField>

          <FormField label="Type">
            <div className="relative">
              <select
                value={form.type}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, type: e.target.value }))
                }
                className="h-12 w-full appearance-none rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition focus:border-blue-400/40"
              >
                <option value="income" className="bg-slate-900">
                  Income
                </option>
                <option value="expense" className="bg-slate-900">
                  Expense
                </option>
              </select>
              <FiChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </FormField>

          <FormField label="Category">
            <div className="relative">
              <select
                value={form.category}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, category: e.target.value }))
                }
                className="h-12 w-full appearance-none rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition focus:border-blue-400/40"
              >
                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                    className="bg-slate-900"
                  >
                    {category}
                  </option>
                ))}
              </select>
              <FiChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </FormField>

          <div className="sm:col-span-2 mt-2 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="h-12 rounded-2xl border border-white/10 bg-white/5 px-5 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="h-12 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-400 px-5 text-sm font-semibold text-white shadow-[0_10px_35px_rgba(75,114,255,0.35)] transition hover:scale-[1.01]"
            >
              {mode === "edit" ? "Save Changes" : "Add Transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function TransactionsPage() {
  const outletContext = useOutletContext() || {};
  const role = outletContext.role || "viewer";
  const { transactions, addTransaction, updateTransaction, deleteTransaction } =
    useAppContext();

  // const [transactions, setTransactions] = useState(initialTransactions);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [monthFilter, setMonthFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(defaultForm);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  


  const openDeleteModal = (transaction) => {
    setDeleteTarget(transaction);
  };

  const closeDeleteModal = () => {
    setDeleteTarget(null);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;

    deleteTransaction(deleteTarget.id);
    toast.success("Transaction deleted.");
    setDeleteTarget(null);
  };

  const uniqueMonths = useMemo(() => {
    const months = [
      ...new Set(transactions.map((item) => getMonthValue(item.date))),
    ];
    return months.sort((a, b) => new Date(b) - new Date(a));
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    let data = [...transactions];

    if (search.trim()) {
      const keyword = search.toLowerCase();
      data = data.filter(
        (item) =>
          item.title.toLowerCase().includes(keyword) ||
          item.category.toLowerCase().includes(keyword) ||
          item.type.toLowerCase().includes(keyword),
      );
    }

    if (typeFilter !== "all") {
      data = data.filter((item) => item.type === typeFilter);
    }

    if (categoryFilter !== "all") {
      data = data.filter((item) => item.category === categoryFilter);
    }

    if (monthFilter !== "all") {
      data = data.filter((item) => getMonthValue(item.date) === monthFilter);
    }

    data.sort((a, b) => {
      switch (sortBy) {
        case "date-asc":
          return new Date(a.date) - new Date(b.date);
        case "date-desc":
          return new Date(b.date) - new Date(a.date);
        case "amount-asc":
          return a.amount - b.amount;
        case "amount-desc":
          return b.amount - a.amount;
        case "title-asc":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return data;
  }, [transactions, search, typeFilter, categoryFilter, monthFilter, sortBy]);

  const stats = useMemo(() => {
    const visibleIncome = filteredTransactions
      .filter((item) => item.type === "income")
      .reduce((sum, item) => sum + item.amount, 0);

    const visibleExpenses = filteredTransactions
      .filter((item) => item.type === "expense")
      .reduce((sum, item) => sum + item.amount, 0);

    return {
      total: filteredTransactions.length,
      incomeCount: filteredTransactions.filter((item) => item.type === "income")
        .length,
      expenseCount: filteredTransactions.filter(
        (item) => item.type === "expense",
      ).length,
      net: visibleIncome - visibleExpenses,
      income: visibleIncome,
      expenses: visibleExpenses,
    };
  }, [filteredTransactions]);

  if (isLoading) {
    return <PageLoader message="Loading transactions..." />;
  }

  const activeFilterCount = [
    typeFilter !== "all",
    categoryFilter !== "all",
    monthFilter !== "all",
    search.trim() !== "",
  ].filter(Boolean).length;

  const resetFilters = () => {
    setSearch("");
    setTypeFilter("all");
    setCategoryFilter("all");
    setMonthFilter("all");
    setSortBy("date-desc");
  };

  const openAddModal = () => {
    setModalMode("add");
    setEditingId(null);
    setForm({
      ...defaultForm,
      date: new Date().toISOString().split("T")[0],
    });
    setModalOpen(true);
  };

  const openEditModal = (transaction) => {
    setModalMode("edit");
    setEditingId(transaction.id);
    setForm({
      title: transaction.title,
      amount: String(transaction.amount),
      category: transaction.category,
      type: transaction.type,
      date: transaction.date,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setForm(defaultForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      id: editingId,
      title: form.title.trim(),
      amount: Number(form.amount),
      category: form.category,
      type: form.type,
      date: form.date,
    };

    if (!payload.title || Number.isNaN(payload.amount) || !payload.date) {
      toast.error("Please complete all required fields.");
      return;
    }

    if (modalMode === "edit") {
      updateTransaction(payload);
      toast.success("Transaction updated successfully.");
    } else {
      addTransaction(payload);
      toast.success("Transaction added successfully.");
    }

    closeModal();
  };

  // const handleDelete = (id) => {
  //   deleteTransaction(id);
  // };

  return (
    <div className="space-y-6 lg:space-y-8">
      <TransactionModal
        open={modalOpen}
        mode={modalMode}
        form={form}
        setForm={setForm}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />
      <ConfirmModal
        open={!!deleteTarget}
        title="Delete transaction?"
        message={
          deleteTarget
            ? `This will permanently remove "${deleteTarget.title}" from your dashboard data.`
            : ""
        }
        confirmText="Delete"
        cancelText="Keep"
        confirmVariant="danger"
        onConfirm={confirmDelete}
        onClose={closeDeleteModal}
      />

      {/* Page heading */}
      <section className="rounded-[28px] border border-white/10 bg-gradient-to-r from-white/[0.07] to-white/[0.03] p-6 shadow-[0_0_50px_rgba(55,90,200,0.10)] backdrop-blur-xl">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-300">
              <FiShield className="text-emerald-300" />
              Transactions Control
            </div>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Explore and manage financial activity
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">
              Search records, apply filters, sort by key fields, and review a
              clean transaction log with role-based actions.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/dashboard"
              className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white"
            >
              Back to Overview
            </Link>

            {role === "admin" && (
              <button onClick={openAddModal} className="premium-orbit-btn">
                <span className="premium-orbit-inner">
                  <FiPlus className="text-base" />
                  Add Transaction
                </span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Visible Records"
          value={stats.total}
          meta={`${activeFilterCount} active filter${activeFilterCount === 1 ? "" : "s"}`}
          icon={FiCreditCard}
          accent="blue"
        />
        <StatCard
          title="Visible Income"
          value={currency.format(stats.income)}
          meta={`${stats.incomeCount} income transaction${stats.incomeCount === 1 ? "" : "s"}`}
          icon={FiTrendingUp}
          accent="emerald"
        />
        <StatCard
          title="Visible Expenses"
          value={currency.format(stats.expenses)}
          meta={`${stats.expenseCount} expense transaction${stats.expenseCount === 1 ? "" : "s"}`}
          icon={FiTrendingDown}
          accent="violet"
        />
        <StatCard
          title="Net Effect"
          value={currency.format(stats.net)}
          meta="Income minus expenses in current view"
          icon={FiDollarSign}
          accent="amber"
        />
      </section>

      {/* Filters */}
      <section className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_45px_rgba(40,70,160,0.08)] backdrop-blur-xl sm:p-6">
        <div className="mb-5 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-white">
              Filter & Search
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Narrow the dataset by type, category, month, or keywords.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.24em] text-slate-400">
            <FiFilter />
            {activeFilterCount} active
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.6fr_repeat(4,minmax(0,1fr))]">
          <div className="relative">
            <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search title, category, or type..."
              className="h-12 w-full rounded-2xl border border-white/10 bg-white/5 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-blue-400/40"
            />
          </div>

          <div className="relative">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="h-12 w-full appearance-none rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition focus:border-blue-400/40"
            >
              <option value="all" className="bg-slate-900">
                All Types
              </option>
              <option value="income" className="bg-slate-900">
                Income
              </option>
              <option value="expense" className="bg-slate-900">
                Expense
              </option>
            </select>
            <FiChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>

          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="h-12 w-full appearance-none rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition focus:border-blue-400/40"
            >
              <option value="all" className="bg-slate-900">
                All Categories
              </option>
              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                  className="bg-slate-900"
                >
                  {category}
                </option>
              ))}
            </select>
            <FiChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>

          <div className="relative">
            <select
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
              className="h-12 w-full appearance-none rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition focus:border-blue-400/40"
            >
              <option value="all" className="bg-slate-900">
                All Months
              </option>
              {uniqueMonths.map((month) => (
                <option key={month} value={month} className="bg-slate-900">
                  {new Date(`${month}-01`).toLocaleString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </option>
              ))}
            </select>
            <FiChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>

          <div className="flex gap-3">
            <div className="relative flex-1">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-12 w-full appearance-none rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition focus:border-blue-400/40"
              >
                <option value="date-desc" className="bg-slate-900">
                  Newest
                </option>
                <option value="date-asc" className="bg-slate-900">
                  Oldest
                </option>
                <option value="amount-desc" className="bg-slate-900">
                  Highest Amount
                </option>
                <option value="amount-asc" className="bg-slate-900">
                  Lowest Amount
                </option>
                <option value="title-asc" className="bg-slate-900">
                  A-Z Title
                </option>
              </select>
              <FiChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>

            <button
              onClick={resetFilters}
              className="h-12 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              Reset
            </button>
          </div>
        </div>
      </section>

      {/* Table / list */}
      <section className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_45px_rgba(40,70,160,0.08)] backdrop-blur-xl sm:p-6">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-white">
              Transactions List
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Showing {filteredTransactions.length} transaction
              {filteredTransactions.length === 1 ? "" : "s"} in the current
              view.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.24em] text-slate-400">
            <FiCalendar />
            Live records
          </div>
        </div>

        {!filteredTransactions.length ? (
          <div className="rounded-[24px] border border-dashed border-white/10 bg-white/[0.03] px-6 py-14 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
              <FiSearch className="text-2xl text-slate-300" />
            </div>
            <h3 className="mt-5 text-2xl font-semibold text-white">
              No transactions found
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-400">
              Try changing your filters or search term. If you are an admin, you
              can also add a new transaction to populate this view.
            </p>

            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                onClick={resetFilters}
                className="h-12 rounded-2xl border border-white/10 bg-white/5 px-5 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                Clear Filters
              </button>

              {role === "admin" && (
                <button
                  onClick={openAddModal}
                  className="h-12 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-400 px-5 text-sm font-semibold text-white shadow-[0_10px_35px_rgba(75,114,255,0.35)] transition hover:scale-[1.01]"
                >
                  Add Transaction
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden overflow-hidden rounded-[24px] border border-white/10 xl:block">
              <div className="grid grid-cols-[1.7fr_1fr_0.9fr_0.9fr_1fr_0.8fr] gap-4 border-b border-white/10 bg-white/[0.03] px-5 py-4 text-xs uppercase tracking-[0.24em] text-slate-500">
                <span>Transaction</span>
                <span>Date</span>
                <span>Category</span>
                <span>Type</span>
                <span className="text-right">Amount</span>
                <span className="text-right">Action</span>
              </div>

              <div className="divide-y divide-white/10">
                {filteredTransactions.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-[1.7fr_1fr_0.9fr_0.9fr_1fr_0.8fr] items-center gap-4 bg-white/[0.02] px-5 py-4 transition hover:bg-white/[0.04]"
                  >
                    <div>
                      <p className="text-sm font-medium text-white">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-[0.22em] text-slate-500">
                        {item.id}
                      </p>
                    </div>

                    <p className="text-sm text-slate-300">
                      {formatDate(item.date)}
                    </p>

                    <div>
                      <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                        {item.category}
                      </span>
                    </div>

                    <div>
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs ${
                          item.type === "income"
                            ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                            : "border-violet-400/20 bg-violet-400/10 text-violet-300"
                        }`}
                      >
                        {item.type}
                      </span>
                    </div>

                    <p
                      className={`text-right text-sm font-semibold ${
                        item.type === "income"
                          ? "text-emerald-300"
                          : "text-white"
                      }`}
                    >
                      {formatAmount(item.type, item.amount)}
                    </p>

                    <div className="flex items-center justify-end gap-2">
                      {role === "admin" ? (
                        <>
                          <button
                            onClick={() => openEditModal(item)}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white"
                          >
                            <FiEdit2 />
                          </button>
                          <button
                            onClick={() => openDeleteModal(item)}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-rose-300"
                          >
                            <FiTrash2 />
                          </button>
                        </>
                      ) : (
                        <span className="text-xs uppercase tracking-[0.22em] text-slate-500">
                          View only
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile / tablet cards */}
            <div className="grid grid-cols-1 gap-4 xl:hidden">
              {filteredTransactions.map((item) => (
                <div
                  key={item.id}
                  className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-base font-semibold text-white">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-[0.22em] text-slate-500">
                        {item.id}
                      </p>
                    </div>

                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-xs ${
                        item.type === "income"
                          ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                          : "border-violet-400/20 bg-violet-400/10 text-violet-300"
                      }`}
                    >
                      {item.type}
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                        Date
                      </p>
                      <p className="mt-2 text-sm text-slate-300">
                        {formatDate(item.date)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                        Category
                      </p>
                      <p className="mt-2 text-sm text-slate-300">
                        {item.category}
                      </p>
                    </div>

                    <div className="col-span-2">
                      <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                        Amount
                      </p>
                      <p
                        className={`mt-2 text-lg font-semibold ${
                          item.type === "income"
                            ? "text-emerald-300"
                            : "text-white"
                        }`}
                      >
                        {formatAmount(item.type, item.amount)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400">
                      Role: {role}
                    </div>

                    {role === "admin" ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() => openDeleteModal(item)}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-rose-300"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs uppercase tracking-[0.22em] text-slate-500">
                        View only
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
