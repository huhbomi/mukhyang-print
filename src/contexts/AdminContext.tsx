"use client";

import { getSupabaseClient } from "@/lib/supabase";
import { fetchIsAdmin } from "@/lib/profiles";
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
  isAuthLoading: boolean;
  loginAsAdmin: (email: string, password: string) => Promise<void>;
  logoutAdmin: () => Promise<void>;
};

const AdminContext = createContext<AdminContextValue | null>(null);

async function resolveAdminStatus(): Promise<boolean> {
  const supabase = getSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return false;
  }

  console.log("[auth] session user.id", session.user.id);
  return fetchIsAdmin(session.user.id);
}

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const refreshAdminStatus = useCallback(async () => {
    setIsAuthLoading(true);

    try {
      const admin = await resolveAdminStatus();
      setIsAdmin(admin);
    } catch {
      setIsAdmin(false);
    } finally {
      setIsAuthLoading(false);
    }
  }, []);

  useEffect(() => {
    const supabase = getSupabaseClient();

    refreshAdminStatus();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      refreshAdminStatus();
    });

    return () => subscription.unsubscribe();
  }, [refreshAdminStatus]);

  const loginAsAdmin = useCallback(async (email: string, password: string) => {
    const supabase = getSupabaseClient();

    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      throw signInError;
    }

    console.log("[auth] signInWithPassword 성공");

    const user = signInData.user;
    console.log("[auth] logged in user.id", user?.id);

    if (!user) {
      throw new Error("로그인 사용자 정보를 가져올 수 없습니다.");
    }

    const isAdminUser = await fetchIsAdmin(user.id);

    if (!isAdminUser) {
      await supabase.auth.signOut();
      throw new Error("관리자 권한이 없습니다.");
    }

    setIsAdmin(true);
    setIsAuthLoading(false);
  }, []);

  const logoutAdmin = useCallback(async () => {
    const supabase = getSupabaseClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }

    setIsAdmin(false);
    setIsAuthLoading(false);
  }, []);

  const value = useMemo(
    () => ({ isAdmin, isAuthLoading, loginAsAdmin, logoutAdmin }),
    [isAdmin, isAuthLoading, loginAsAdmin, logoutAdmin]
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
