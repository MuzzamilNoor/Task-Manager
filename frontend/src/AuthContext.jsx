import { createContext, useContext, useState } from "react";

// Step 1: Context "container" banao
const AuthContext = createContext();

// Step 2: Provider component — jo poori app ko data DEGA
export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  function login(newToken, userData) {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(userData);
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Step 3: Custom hook — koi bhi component isse "use" karega
export function useAuth() {
  return useContext(AuthContext);
}