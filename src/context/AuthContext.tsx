import { ReactNode, createContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "firebaseApp";

interface AuthProps {
  children: ReactNode;
}

const AuthContext = createContext({
  user: null as User | null,
});

export const AuthContextProvider = ({ children }: AuthProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user: currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
