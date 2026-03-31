import { createContext, useState, useEffect } from "react";
import { getCurrentUser } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (data) => {
    localStorage.setItem("token", data.token);
    setUser(data.data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {

    const loadUser = async () => {

      try {

        const token = localStorage.getItem("token");

        if (!token) {
          setLoading(false);
          return;
        }

        const res = await getCurrentUser();
        setUser(res.data);

      } catch (error) {

        localStorage.removeItem("token");
        setUser(null);

      } finally {

        setLoading(false);

      }

    };

    loadUser();

  }, []);

  return (

    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>

  );

};