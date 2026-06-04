"use client";

import {
  ADMIN_PREVIEW_MODE,
  ADMIN_SESSION_KEY,
  INQUIRY_ADMIN_ENABLED,
} from "@/lib/admin-preview";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type AdminContextValue = {
  isAdmin: boolean;
  loginAsAdmin: () => void;
  logoutAdmin: () => void;
};

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [sessionAdmin, setSessionAdmin] = useState(false);

  useEffect(() => {
    if (ADMIN_PREVIEW_MODE) {
      setSessionAdmin(true);
      return;
    }
    const stored = localStorage.getItem(ADMIN_SESSION_KEY);
    setSessionAdmin(stored === "true");
  }, []);

  // Supabase Auth 연동 전: 문의 게시판 관리자 분기는 항상 false
  const isAdmin = INQUIRY_ADMIN_ENABLED && sessionAdmin;

  const loginAsAdmin = useCallback(() => {
    localStorage.setItem(ADMIN_SESSION_KEY, "true");
    setSessionAdmin(true);
  }, []);

  const logoutAdmin = useCallback(() => {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    setSessionAdmin(false);
  }, []);

  const value = useMemo(
    () => ({ isAdmin, loginAsAdmin, logoutAdmin }),
    [isAdmin, loginAsAdmin, logoutAdmin]
  );

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
}
