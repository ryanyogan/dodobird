import { signInWithPopup, User } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { createUser } from "./db";
import { auth, googleAuthProvider } from "./firebase";

interface IAuthContext {
  user: FormattedUser;
  loading: boolean;
  signinWithGoogle: () => Promise<void>;
  signout: () => Promise<void>;
}

const authContext = createContext<IAuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = useState<FormattedUser | null>(null);
  const [loading, setLoading] = useState(true);

  const handleUser = async (rawUser: User) => {
    if (rawUser) {
      const user = await formatUser(rawUser);
      const { token, ...userWithoutToken } = user;

      setLoading(false);
      createUser(user.uid, userWithoutToken);
      setUser(user);
    } else {
      setLoading(false);
      setUser(null);
      return false;
    }
  };

  const signinWithGoogle = async () => {
    setLoading(true);
    const { user } = await signInWithPopup(auth, googleAuthProvider);
    handleUser(user);
  };

  const signout = async () => {
    await auth.signOut();
    handleUser(null);
  };

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(handleUser);

    return () => unsub();
  }, []);

  return {
    user,
    loading,
    signinWithGoogle,
    signout,
  };
}

export type FormattedUser = {
  uid: User["uid"];
  email: User["email"];
  name: User["displayName"];
  provider: User["providerData"][number]["providerId"];
  photoURL: User["photoURL"];
  token: string;
};

async function formatUser(user: User): Promise<FormattedUser> {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoURL: user.photoURL,
    token: await auth.currentUser.getIdToken(),
  };
}
