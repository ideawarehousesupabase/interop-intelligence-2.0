import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { collection, query, where, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export interface User {
  id: string;
  fullName: string;
  organization: string;
  role: string;
  email: string;
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: Omit<User, "id"> & { password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const SESSION_KEY = "ii2_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem(SESSION_KEY) : null;
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        // ignore corrupt session
      }
    }
    setLoading(false);
  }, []);

  const persist = (u: User | null) => {
    setUser(u);
    if (typeof window === "undefined") return;
    if (u) localStorage.setItem(SESSION_KEY, JSON.stringify(u));
    else localStorage.removeItem(SESSION_KEY);
  };

  const login = async (email: string, password: string) => {
    if (!db) throw new Error("Firebase not configured");
    
    // Read operation (CRUD)
    const q = query(
      collection(db, "users"),
      where("email", "==", email.toLowerCase()),
      where("password", "==", password)
    );
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      throw new Error("Invalid email or password");
    }
    
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    
    persist({
      id: userDoc.id,
      fullName: userData.fullName,
      organization: userData.organization,
      role: userData.role,
      email: userData.email,
    });
  };

  const register = async (data: Omit<User, "id"> & { password: string }) => {
    if (!db) throw new Error("Firebase not configured");
    
    // Check if user exists (Read)
    const q = query(
      collection(db, "users"),
      where("email", "==", data.email.toLowerCase())
    );
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      throw new Error("Email already registered");
    }
    
    // Generate an ID
    const id = typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `u_${Date.now()}_${Math.random().toString(36).slice(2)}`;
        
    // Create operation (CRUD)
    await setDoc(doc(db, "users", id), {
      fullName: data.fullName,
      organization: data.organization,
      role: data.role,
      email: data.email.toLowerCase(),
      password: data.password 
    });
    
    persist({
      id,
      fullName: data.fullName,
      organization: data.organization,
      role: data.role,
      email: data.email.toLowerCase(),
    });
  };

  const logout = () => persist(null);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
