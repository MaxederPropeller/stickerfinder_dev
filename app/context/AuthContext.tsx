// /contexts/authContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import firebase from "../firebase";

interface IUser {
  email: string;
  username: string;
  // weitere Felder
}

interface IAuthContext {
  user: IUser | null;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => {
      // Setze den Benutzerzustand, wenn sich der Authentifizierungsstatus ändert
      setUser(user ? { email: user.email!, username: "" } : null);
    });
  }, []);

  const signUp = async (email: string, password: string, username: string) => {
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    // Hier kannst du zusätzliche Logik hinzufügen, um den Benutzernamen in deiner Datenbank zu speichern
  };

  const signIn = async (email: string, password: string) => {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  };

  const signOut = async () => {
    await firebase.auth().signOut();
  };

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
