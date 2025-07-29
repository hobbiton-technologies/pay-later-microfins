import { useLoginUserMutation } from "@/api/mutations/authMutation";
import { message } from "antd";
import { jwtDecode } from "jwt-decode";
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
  login: (values: { username: string; password: string }) => Promise<void>;
  logout: () => void;
}

interface DecodedToken {
  FirstName: string;
  LastName: string;
  email: string;
  PhoneNumber: string;
  jti: string;
  Id: string;
  Operations: string;
  exp: number;
  iat: number;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const getUserOperations = (): string[] => {
  const token = localStorage.getItem("accessToken");
  if (!token) return [];

  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.Operations?.split(",") || [];
  } catch (err) {
    console.error("Failed to decode token:", err);
    return [];
  }
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("accessToken")
  );

  useEffect(() => {
    const checkAuthToken = () => {
      const token = localStorage.getItem("accessToken");
      setIsAuthenticated(!!token);
    };

    checkAuthToken();

    window.addEventListener("storage", checkAuthToken);
    return () => window.removeEventListener("storage", checkAuthToken);
  }, []);

  const [loginUser] = useLoginUserMutation();

  const login = async (values: { username: string; password: string }) => {
    try {
      const loginData = {
        username: values.username,
        password: values.password,
      };
      const response = await loginUser(loginData).unwrap();

      const { accessToken, organizationId } = response.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("organizationId", organizationId.toString());

      setIsAuthenticated(true);

      toast.success("Login successful!", { position: "top-right" });

      window.location.href = "/";
    } catch (error: any) {
      console.error("Login failed", error);
      toast.error("Invalid credentials or server error", {
        position: "top-right",
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
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
