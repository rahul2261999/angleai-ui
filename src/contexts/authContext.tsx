"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AuthenticatedUser } from "@/features/auth/auth.type.";

interface AuthContextType {
  user: AuthenticatedUser | null;
  otpToken: string | null;
  token: string | null;
  isAuthenticated: boolean;
  resendTimer: number;
  signin: (user: AuthenticatedUser, token: string) => void;
  signout: () => void;
  authenticate: (token: string) => void;
  resendOTP: (token: string) => void;
  updateResendTimer: (time: number) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [otpToken, setOtpToken] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState<number>(120);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check for existing auth data on mount
    const storedUser = localStorage.getItem("user");
    const storedOtpToken = localStorage.getItem("otpToken");
    const storedToken = localStorage.getItem("token");
    const storedResendTimer = localStorage.getItem("resendTimer");

    setUser(storedUser ? JSON.parse(storedUser) : null);
    setToken(storedToken);
    setOtpToken(storedOtpToken);
    setResendTimer(storedResendTimer ? parseInt(storedResendTimer) : 120);
    setIsLoading(false);
  }, []);

  const updateResendTimer = (time: number) => {
    setResendTimer(time);
    localStorage.setItem("resendTimer", time.toString());
  };

  const signin = (user: AuthenticatedUser, token: string) => {
    setUser(user);
    setOtpToken(token);
    setResendTimer(120);

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("otpToken", token);
    localStorage.setItem("resendTimer", "120");

    router.push("/otp");
  };

  const signout = () => {
    setUser(null);
    setToken(null);
    setResendTimer(120);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("resendTimer");

    router.push("/signin");
  };

  const authenticate = async (token: string) => {
    setOtpToken(null);
    setToken(token);
    setResendTimer(120);

    localStorage.removeItem("otpToken");
    localStorage.setItem("token", token);
    localStorage.setItem("resendTimer", "120");
  };

  const resendOTP = (token: string) => {
    setOtpToken(token);
    setResendTimer(120);

    localStorage.setItem("otpToken", token);
    localStorage.setItem("resendTimer", "120");
  };

  // Protect routes
  useEffect(() => {
    if (isLoading) {
      return;
    }

    // const unprotectedRoutes = ["/signin", "/signup", "/otp"];

    if (pathname?.startsWith("/otp") && (!user || !otpToken)) {
      router.replace("/signin");

      return;
    }

    if (user && token) {
      router.replace("/dashboard/analytics");

      return;
    }
  }, [user, pathname, isLoading, router, otpToken, token]);

  if (isLoading) {
    return null; // or a loading spinner
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        otpToken,
        token,
        isAuthenticated: !!user,
        resendTimer,
        signin,
        signout,
        authenticate,
        resendOTP,
        updateResendTimer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
