import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("re_user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem("re_user", JSON.stringify(user));
    else localStorage.removeItem("re_user");
  }, [user]);

  // Replace with real API calls to your backend
  const signIn = async (email, password) => {
    const role = email.includes("admin") ? "admin" : "user";
    const fakeUser = { name: email.split("@")[0], email, role };
    setUser(fakeUser);
    return fakeUser;
  };

  const signUp = async (name, email, password) => {
    const fakeUser = { name, email, role: "user" };
    setUser(fakeUser);
    return fakeUser;
  };

  const signOut = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
