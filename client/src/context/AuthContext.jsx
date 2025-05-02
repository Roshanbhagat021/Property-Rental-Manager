import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    const savedName = localStorage.getItem("userName");

    if (savedToken && savedName) {
      setToken(savedToken);
      setUserName(savedName);
      setIsAuth(true);
    }
  }, []);

  const login = (token, name) => {
    setToken(token);
    setUserName(name);
    setIsAuth(true);
    localStorage.setItem("authToken", token);
    localStorage.setItem("userName", name);
  };

  const logout = () => {
    setToken("");
    setUserName("");
    setIsAuth(false);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuth, 
        token, 
        userName,
        login,
        logout,
        setIsAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}