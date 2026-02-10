import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import * as authApi from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("access_token");
    const savedUser = localStorage.getItem("user");
    try {
      return token && savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  // Security check: if token is missing, ensure user is definitely cleared
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setUser(null);
      localStorage.removeItem("user");
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await authApi.signIn(email, password);
      setUser(data.user);
      localStorage.setItem("access_token", data.session.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const data = await authApi.signUp(userData);
      setUser(data.user);
      localStorage.setItem("access_token", data.session.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      return data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const data = await authApi.getMe();
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      } catch (error) {
        if (error.status === 401) {
          console.warn("Session expired or invalid token. Logging out.");
          logout();
        } else {
          console.error("Auth check network/timeout error:", error);
        }
      }
    } else {
      setUser(null);
      localStorage.removeItem("user");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const googleLogin = async () => {
    setLoading(true);
    try {
      const data = await authApi.getGoogleAuthUrl();
      window.location.href = data.url;
    } catch (error) {
      console.error("Google Login error:", error);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        register,
        googleLogin,
        setUser,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
