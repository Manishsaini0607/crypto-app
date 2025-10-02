import { createContext, useContext, useState } from "react";
import { authApi } from "../api/auth";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

// Create Context
const AuthContext = createContext();


// AuthProvider component
export function AuthProvider({ children }) {

  const toast = useToast();
  const [user, setUser] = useState(null);        // user details
  const [token, setToken] = useState(null);      // JWT / access token
  const [loading, setLoading] = useState(false); // loading state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Store Auth Data
  const storeAuthData = (data) => {
    setToken(data.token);
    setUser(data.user);
    setIsAuthenticated(true);
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
    } catch (err) {
      toast({
        title: "Login failed",
        description: err?.message || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Signup function
  const signup = async (firstName, lastName, email, password) => {
    
    setLoading(true);
    try {
      const data = await authApi.signup( firstName, lastName, email, password ); // call your signup API
      storeAuthData(data); // auto-login after signup
    
    } catch (err) {
      toast({
        title: "Signup failed",
        description: err || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
      });

    throw err

    } finally {
      setLoading(false);
      
    }
  };

  // 🔹 Logout function
  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    toast({
      title: "Logged out",
      status: "info",
      duration: 2000,
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

// Custom hook for easy access
export function useAuth() {
  return useContext(AuthContext);
}
