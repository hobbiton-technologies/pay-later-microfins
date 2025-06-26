import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import toast, { Toaster } from "react-hot-toast";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("authToken")
  );

  useEffect(() => {
    const checkAuthToken = () => {
      const token = localStorage.getItem("authToken");
      setIsAuthenticated(!!token);
    };

    checkAuthToken();

    window.addEventListener("storage", checkAuthToken);
    return () => window.removeEventListener("storage", checkAuthToken);
  }, []);

  const login = async (username: string, password: string) => {
    if (
      username === "hobbitonAdmin@hobbiton.co.zm" &&
      password === "admin2025"
    ) {
      // Added token simulation here
      const fakeToken = "123456abcdef";
      const fakeOrgId = "org-789";
      localStorage.setItem("authToken", fakeToken);
      localStorage.setItem("OrganisationId", fakeOrgId);
      setIsAuthenticated(true);

      toast.success("Login successful!", { position: "top-right" });
      window.location.href = "/";
    } else {
      toast.error("Login failed. Incorrect credentials.", {
        position: "top-right",
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("OrganisationId");
    setIsAuthenticated(false);
    toast.success("Logged out successfully!", { position: "top-right" });
    window.location.href = "/signIn";
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      <Toaster />
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
