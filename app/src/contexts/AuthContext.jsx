import { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "../api/auth";
import Cookies from "js-cookie";
import { useToast } from "@chakra-ui/react";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const toast = useToast();

  const [user, setUser] = useState(null);        
  const [token, setToken] = useState(null);      
  const [loading, setLoading] = useState(false); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 🔹 On first render → load from localStorage
  useEffect(() => {
    const savedToken =  Cookies.get("authToken");
    const savedUser = localStorage.getItem("authUser");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // 🔹 Store Auth Data
  const storeAuthData = (data) => {
    setToken(data.token);
    const userData = { firstName: data.firstName, lastName: data.lastName };
    setUser(userData);
    setIsAuthenticated(true);
   const {exp }= jwtDecode(data.token);
  
   const expDay = new Date(exp * 1000);


    // ✅ Save to localStorage and cookies
    Cookies.set("authToken", data.token, { expires: expDay, secure: true, sameSite: "Strict" });
    localStorage.setItem("authUser", JSON.stringify(userData));

    
  };

  // 🔹 Login function
  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await authApi.login(email, password);
      storeAuthData(data);

      toast({
        title: "Login successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      return true;
    } catch (err) {
      toast({
        title: "Login failed",
        description: err || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Signup function
  const signup = async (firstName, lastName, email, password) => {
    setLoading(true);
    try {
      const data = await authApi.signup(firstName, lastName, email, password);
      storeAuthData(data); // auto-login after signup
    } catch (err) {
      toast({
        title: "Signup failed",
        description: err || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Logout function
  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);

    // ❌ Clear localStorage
    Cookies.remove("authToken");
    localStorage.removeItem("authUser");

    toast({
      title: "Logged out",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, loading, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook
export function useAuth() {
  return useContext(AuthContext);
}
