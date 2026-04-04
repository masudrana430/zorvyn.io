import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { initialTransactions } from "../data/transactions";

const AppContext = createContext(null);

const STORAGE_KEYS = {
  role: "finance_dashboard_role",
  transactions: "finance_dashboard_transactions",
  theme: "finance_dashboard_theme",
};

function getStoredRole() {
  try {
    return localStorage.getItem(STORAGE_KEYS.role) || "viewer";
  } catch {
    return "viewer";
  }
}

function getStoredTransactions() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.transactions);
    return stored ? JSON.parse(stored) : initialTransactions;
  } catch {
    return initialTransactions;
  }
}

function getStoredTheme() {
  try {
    return localStorage.getItem(STORAGE_KEYS.theme) || "dark";
  } catch {
    return "dark";
  }
}

export function AppProvider({ children }) {
  const [role, setRole] = useState(getStoredRole);
  const [transactions, setTransactions] = useState(getStoredTransactions);
  const [theme, setTheme] = useState(getStoredTheme);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.role, role);
    } catch {}
  }, [role]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.transactions, JSON.stringify(transactions));
    } catch {}
  }, [transactions]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.theme, theme);
    } catch {}
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: `txn_${Date.now()}`,
      amount: Number(transaction.amount),
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const updateTransaction = (updatedTransaction) => {
    setTransactions((prev) =>
      prev.map((item) =>
        item.id === updatedTransaction.id
          ? { ...updatedTransaction, amount: Number(updatedTransaction.amount) }
          : item
      )
    );
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((item) => item.id !== id));
  };

  const resetAllData = () => {
    setRole("viewer");
    setTransactions(initialTransactions);
    setTheme("dark");

    try {
      localStorage.removeItem(STORAGE_KEYS.role);
      localStorage.removeItem(STORAGE_KEYS.transactions);
      localStorage.removeItem(STORAGE_KEYS.theme);
    } catch {}
  };

  const value = useMemo(
    () => ({
      role,
      setRole,
      transactions,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      resetAllData,
      theme,
      setTheme,
      toggleTheme,
    }),
    [role, transactions, theme]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }

  return context;
}