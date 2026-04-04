import { useMemo } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiCalendar,
  FiCreditCard,
  FiDollarSign,
  FiInfo,
  FiPieChart,
  FiShield,
  FiTrendingDown,
  FiTrendingUp,
} from "react-icons/fi";



const pieColors = [
  "#4F7CFF",
  "#7C5CFF",
  "#1ED7A5",
  "#12B3E8",
  "#F59E0B",
  "#EF4444",
  "#94A3B8",
];

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const monthLabel = (dateString) =>
  new Date(dateString).toLocaleString("en-US", { month: "short" });

const fullDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

function formatSignedAmount(type, amount) {
  return `${type === "income" ? "+" : "-"}${currency.format(amount)}`;
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-2xl border border-white/10 bg-[#091224]/95 px-4 py-3 shadow-2xl backdrop-blur-xl">
      <p className="mb-2 text-xs uppercase tracking-[0.25em] text-slate-400">
        {label}
      </p>
      <div className="space-y-1.5">
        {payload.map((item) => (
          <div
            key={item.dataKey}
            className="flex items-center justify-between gap-6 text-sm"
          >
            <span className="text-slate-300">{item.name}</span>
            <span className="font-medium text-white">
              {currency.format(item.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SummaryCard({ title, value, icon: Icon, meta, trend, accent = "blue" }) {
  const accentMap = {
    blue: {
      iconBg: "from-blue-500/20 to-blue-400/5 text-blue-300",
      glow: "rgba(79,124,255,0.22)",
      border: "rgba(79,124,255,0.18)",
    },
    emerald: {
      iconBg: "from-emerald-500/20 to-emerald-400/5 text-emerald-300",
      glow: "rgba(30,215,165,0.18)",
      border: "rgba(30,215,165,0.18)",
    },
    violet: {
      iconBg: "from-violet-500/20 to-violet-400/5 text-violet-300",
      glow: "rgba(124,92,255,0.2)",
      border: "rgba(124,92,255,0.18)",
    },
    amber: {
      iconBg: "from-amber-500/20 to-amber-400/5 text-amber-300",
      glow: "rgba(245,158,11,0.18)",
      border: "rgba(245,158,11,0.18)",
    },
  };

  const currentAccent = accentMap[accent];

  return (
    <div
      className="group relative overflow-hidden rounded-[26px] border p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.015] sm:p-6"
      style={{
        background: "linear-gradient(180deg, var(--surface-2), var(--surface))",
        borderColor: "var(--surface-border)",
        boxShadow: "var(--shadow-panel)",
      }}
    >
      {/* glow */}
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: currentAccent.glow }}
      />

      {/* top shine */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-70" />

      {/* soft hover border */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[26px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          boxShadow: `inset 0 0 0 1px ${currentAccent.border}`,
        }}
      />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] theme-text-muted">
            {title}
          </p>

          <h3 className="mt-3 theme-kpi-value text-2xl font-semibold sm:text-3xl">
            {value}
          </h3>

          <p className="mt-2 text-sm theme-text-soft">
            {meta}
          </p>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl border bg-gradient-to-br ${currentAccent.iconBg} transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
          style={{
            borderColor: "var(--surface-border)",
          }}
        >
          <Icon className="text-xl" />
        </div>
      </div>

      <div className="relative mt-5 flex items-center gap-2 text-sm">
        {trend?.direction === "up" ? (
          <FiTrendingUp className="text-emerald-300 transition-transform duration-300 group-hover:-translate-y-0.5" />
        ) : (
          <FiTrendingDown className="text-rose-300 transition-transform duration-300 group-hover:translate-y-0.5" />
        )}

        <span
          className={
            trend?.direction === "up" ? "text-emerald-300 font-medium" : "text-rose-300 font-medium"
          }
        >
          {trend?.value}
        </span>

        <span className="theme-text-muted">
          {trend?.label}
        </span>
      </div>
    </div>
  );
}

function SectionCard({
  title,
  subtitle,
  icon: Icon,
  action,
  children,
  accent = "blue",
}) {
  const accentMap = {
    blue: {
      glow: "rgba(79,124,255,0.18)",
      border: "rgba(79,124,255,0.18)",
      iconBg: "from-blue-500/20 to-blue-400/5 text-blue-300",
    },
    emerald: {
      glow: "rgba(30,215,165,0.16)",
      border: "rgba(30,215,165,0.18)",
      iconBg: "from-emerald-500/20 to-emerald-400/5 text-emerald-300",
    },
    violet: {
      glow: "rgba(124,92,255,0.18)",
      border: "rgba(124,92,255,0.18)",
      iconBg: "from-violet-500/20 to-violet-400/5 text-violet-300",
    },
    amber: {
      glow: "rgba(245,158,11,0.16)",
      border: "rgba(245,158,11,0.18)",
      iconBg: "from-amber-500/20 to-amber-400/5 text-amber-300",
    },
  };

  const currentAccent = accentMap[accent] || accentMap.blue;

  return (
    <div
      className="group relative overflow-hidden rounded-[28px] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.005] sm:p-6"
      style={{
        background: "linear-gradient(180deg, var(--surface-2), var(--surface))",
        border: "1px solid var(--surface-border)",
        boxShadow: "var(--shadow-panel)",
      }}
    >
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: currentAccent.glow }}
      />

      {/* top shine */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-70" />

      {/* hover border */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          boxShadow: `inset 0 0 0 1px ${currentAccent.border}`,
        }}
      />

      <div className="relative mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl border bg-gradient-to-br ${currentAccent.iconBg} transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
            style={{ borderColor: "var(--surface-border)" }}
          >
            <Icon className="text-lg" />
          </div>

          <div>
            <h3
              className="text-lg font-semibold tracking-tight"
              style={{ color: "var(--text)" }}
            >
              {title}
            </h3>
            <p
              className="mt-1 text-sm leading-6"
              style={{ color: "var(--text-muted)" }}
            >
              {subtitle}
            </p>
          </div>
        </div>

        {action && <div className="shrink-0">{action}</div>}
      </div>

      <div className="relative">{children}</div>
    </div>
  );
}

export default function DashboardPage() {
  const outletContext = useOutletContext() || {};
  const role = outletContext.role || "viewer";
  // const transactions = mockTransactions;
  const { transactions } = useAppContext();
  // const outletContext = useOutletContext() || {};
  // const role = outletContext.role || "viewer";

  const dashboardData = useMemo(() => {
    if (!transactions.length) {
      return {
        totalIncome: 0,
        totalExpenses: 0,
        totalBalance: 0,
        savingsRate: 0,
        monthlyTrend: [],
        categoryBreakdown: [],
        highestCategory: null,
        thisMonthExpense: 0,
        previousMonthExpense: 0,
        recentTransactions: [],
      };
    }

    const sorted = [...transactions].sort(
      (a, b) => new Date(a.date) - new Date(b.date),
    );

    const totalIncome = sorted
      .filter((item) => item.type === "income")
      .reduce((sum, item) => sum + item.amount, 0);

    const totalExpenses = sorted
      .filter((item) => item.type === "expense")
      .reduce((sum, item) => sum + item.amount, 0);

    const totalBalance = totalIncome - totalExpenses;
    const savingsRate = totalIncome
      ? Math.round((totalBalance / totalIncome) * 100)
      : 0;

    const monthMap = new Map();
    let runningBalance = 0;

    sorted.forEach((item) => {
      const key = `${new Date(item.date).getFullYear()}-${String(
        new Date(item.date).getMonth() + 1,
      ).padStart(2, "0")}`;

      if (!monthMap.has(key)) {
        monthMap.set(key, {
          key,
          month: new Date(item.date).toLocaleString("en-US", {
            month: "short",
          }),
          income: 0,
          expenses: 0,
          net: 0,
          balance: 0,
        });
      }

      const entry = monthMap.get(key);

      if (item.type === "income") {
        entry.income += item.amount;
        runningBalance += item.amount;
      } else {
        entry.expenses += item.amount;
        runningBalance -= item.amount;
      }

      entry.net = entry.income - entry.expenses;
      entry.balance = runningBalance;
    });

    const monthlyTrend = Array.from(monthMap.values());

    const expenseMap = {};
    sorted
      .filter((item) => item.type === "expense")
      .forEach((item) => {
        expenseMap[item.category] =
          (expenseMap[item.category] || 0) + item.amount;
      });

    const categoryBreakdown = Object.entries(expenseMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    const highestCategory = categoryBreakdown[0] || null;

    const lastMonth = monthlyTrend[monthlyTrend.length - 1];
    const prevMonth = monthlyTrend[monthlyTrend.length - 2];

    const recentTransactions = [...transactions]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    return {
      totalIncome,
      totalExpenses,
      totalBalance,
      savingsRate,
      monthlyTrend,
      categoryBreakdown,
      highestCategory,
      thisMonthExpense: lastMonth?.expenses || 0,
      previousMonthExpense: prevMonth?.expenses || 0,
      recentTransactions,
    };
  }, [transactions]);

  const {
    totalIncome,
    totalExpenses,
    totalBalance,
    savingsRate,
    monthlyTrend,
    categoryBreakdown,
    highestCategory,
    thisMonthExpense,
    previousMonthExpense,
    recentTransactions,
  } = dashboardData;

  const monthlyDelta =
    previousMonthExpense === 0
      ? 0
      : Math.round(
          ((thisMonthExpense - previousMonthExpense) / previousMonthExpense) *
            100,
        );

  const insights = [
    {
      title: "Highest spending category",
      value: highestCategory ? highestCategory.name : "No data",
      note: highestCategory
        ? `${currency.format(highestCategory.value)} across all recorded expenses`
        : "No expense transactions yet",
      positive: false,
    },
    {
      title: "Monthly comparison",
      value:
        previousMonthExpense === 0
          ? "No prior month"
          : `${Math.abs(monthlyDelta)}% ${monthlyDelta > 0 ? "higher" : "lower"}`,
      note:
        previousMonthExpense === 0
          ? "Need at least two months of data"
          : `This month ${currency.format(thisMonthExpense)} vs last month ${currency.format(
              previousMonthExpense,
            )}`,
      positive: monthlyDelta <= 0,
    },
    {
      title: "Useful observation",
      value:
        savingsRate >= 50
          ? "Strong surplus"
          : savingsRate >= 25
            ? "Healthy balance"
            : "Watch expenses",
      note:
        savingsRate >= 50
          ? "Income is comfortably outpacing spending."
          : savingsRate >= 25
            ? "Cash flow is positive with room to optimize."
            : "Expenses are taking a larger share of income.",
      positive: savingsRate >= 25,
    },
  ];

  if (!transactions.length) {
    return (
      <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
          <FiInfo className="text-2xl text-slate-300" />
        </div>
        <h2 className="mt-5 text-2xl font-semibold text-white">
          No financial data yet
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-400">
          Start by adding a few transactions to unlock summary metrics, trend
          analysis, spending breakdowns, and monthly insights.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Page heading */}
      <section className="rounded-[28px] border border-white/10 bg-gradient-to-r from-white/[0.07] to-white/[0.03] p-6 shadow-[0_0_50px_rgba(55,90,200,0.10)] backdrop-blur-xl">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-300">
              <FiShield className="text-emerald-300" />
              Finance Overview
            </div>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Smart visibility into your financial activity
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">
              Review balance performance, monitor spending composition, and
              surface operational insights from a Zorvyn-inspired control
              center.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:min-w-[430px]">
            {[
              { label: "Role", value: role },
              { label: "Records", value: `${transactions.length}` },
              { label: "Trend", value: `${monthlyTrend.length} mo` },
              { label: "Status", value: "Live" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  {item.label}
                </p>
                <p className="mt-2 text-lg font-semibold capitalize text-white">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Summary cards */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4">
        <SummaryCard
          title="Total Balance"
          value={currency.format(totalBalance)}
          icon={FiDollarSign}
          meta="Net position after all income and expenses"
          trend={{
            direction: totalBalance >= 0 ? "up" : "down",
            value: `${savingsRate}%`,
            label: "savings rate",
          }}
          accent="blue"
        />

        <SummaryCard
          title="Income"
          value={currency.format(totalIncome)}
          icon={FiTrendingUp}
          meta="All recorded incoming cash flow"
          trend={{
            direction: "up",
            value: `${monthlyTrend[monthlyTrend.length - 1]?.month || "Latest"}`,
            label: "latest active month",
          }}
          accent="emerald"
        />

        <SummaryCard
          title="Expenses"
          value={currency.format(totalExpenses)}
          icon={FiTrendingDown}
          meta="All recorded outgoing spending"
          trend={{
            direction: monthlyDelta <= 0 ? "up" : "down",
            value:
              previousMonthExpense === 0
                ? "No prior month"
                : `${Math.abs(monthlyDelta)}%`,
            label:
              previousMonthExpense === 0
                ? "comparison unavailable"
                : "vs previous month",
          }}
          accent="violet"
        />

        <SummaryCard
          title="Avg. Monthly Spend"
          value={currency.format(
            monthlyTrend.length ? totalExpenses / monthlyTrend.length : 0,
          )}
          icon={FiCreditCard}
          meta="Average monthly expense level"
          trend={{
            direction: monthlyDelta <= 0 ? "up" : "down",
            value: currency.format(thisMonthExpense),
            label: "this month expenses",
          }}
          accent="amber"
        />
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 gap-6 2xl:grid-cols-[1.6fr_1fr]">
        <SectionCard
          title="Balance Trend"
          subtitle="Time-based view of income, expenses, and rolling balance"
          icon={FiTrendingUp}
          action={
            <Link
              to="/transactions"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white"
            >
              View transactions
              <FiArrowRight />
            </Link>
          }
        >
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrend}>
                <defs>
                  <linearGradient
                    id="incomeGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#1ED7A5" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#1ED7A5" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="expenseGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#7C5CFF" stopOpacity={0.28} />
                    <stop offset="95%" stopColor="#7C5CFF" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  stroke="rgba(148,163,184,0.12)"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={(value) => `$${Math.round(value / 1000)}k`}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="#1ED7A5"
                  fill="url(#incomeGradient)"
                  strokeWidth={2.5}
                  name="Income"
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stroke="#7C5CFF"
                  fill="url(#expenseGradient)"
                  strokeWidth={2.5}
                  name="Expenses"
                />
                <Area
                  type="monotone"
                  dataKey="balance"
                  stroke="#4F7CFF"
                  fill="transparent"
                  strokeWidth={3}
                  name="Balance"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard
          title="Spending Breakdown"
          subtitle="Categorical view of expense concentration by category"
          icon={FiPieChart}
        >
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip content={<CustomTooltip />} />
                  <Pie
                    data={categoryBreakdown}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={72}
                    outerRadius={105}
                    paddingAngle={4}
                  >
                    {categoryBreakdown.map((entry, index) => (
                      <Cell
                        key={`cell-${entry.name}`}
                        fill={pieColors[index % pieColors.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3">
              {categoryBreakdown.map((item, index) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{
                        backgroundColor: pieColors[index % pieColors.length],
                      }}
                    />
                    <div>
                      <p className="text-sm font-medium text-white">
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {((item.value / totalExpenses) * 100).toFixed(0)}% of
                        expenses
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-white">
                    {currency.format(item.value)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>
      </section>

      {/* Insights + monthly comparison */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <SectionCard
          title="Insights"
          subtitle="Simple observations derived from your transactions"
          icon={FiInfo}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {insights.map((item) => (
              <div
                key={item.title}
                className="rounded-[24px] border border-white/10 bg-white/5 p-5"
              >
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                  {item.title}
                </p>
                <h4
                  className={`mt-3 text-xl font-semibold ${
                    item.positive ? "text-emerald-300" : "text-white"
                  }`}
                >
                  {item.value}
                </h4>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {item.note}
                </p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Monthly Comparison"
          subtitle="Quick comparison of expense movement"
          icon={FiCalendar}
        >
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyTrend.map((item) => ({
                  month: item.month,
                  Expenses: item.expenses,
                }))}
                barSize={38}
              >
                <CartesianGrid
                  stroke="rgba(148,163,184,0.12)"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={(value) => `$${Math.round(value / 1000)}k`}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="Expenses"
                  radius={[14, 14, 6, 6]}
                  fill="#4F7CFF"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </section>

      {/* Recent transactions */}
      <section className="grid grid-cols-1 gap-6">
        <SectionCard
          title="Recent Transactions"
          subtitle="Latest activity flowing through your dashboard"
          icon={FiCreditCard}
          action={
            <Link
              to="/transactions"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white"
            >
              Open full list
              <FiArrowUpRight />
            </Link>
          }
        >
          <div className="overflow-hidden rounded-[24px] border border-white/10">
            <div className="hidden grid-cols-[1.8fr_0.9fr_0.9fr_0.9fr] gap-4 border-b border-white/10 bg-white/[0.03] px-5 py-4 text-xs uppercase tracking-[0.24em] text-slate-500 md:grid">
              <span>Transaction</span>
              <span>Date</span>
              <span>Category</span>
              <span className="text-right">Amount</span>
            </div>

            <div className="divide-y divide-white/10">
              {recentTransactions.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 gap-3 bg-white/[0.02] px-5 py-4 transition hover:bg-white/[0.04] md:grid-cols-[1.8fr_0.9fr_0.9fr_0.9fr] md:items-center"
                >
                  <div>
                    <p className="text-sm font-medium text-white">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.22em] text-slate-500">
                      {item.type}
                    </p>
                  </div>

                  <p className="text-sm text-slate-300">
                    {fullDate(item.date)}
                  </p>

                  <div>
                    <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                      {item.category}
                    </span>
                  </div>

                  <p
                    className={`text-sm font-semibold md:text-right ${
                      item.type === "income" ? "text-emerald-300" : "text-white"
                    }`}
                  >
                    {formatSignedAmount(item.type, item.amount)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>
      </section>
    </div>
  );
}
