'use client';

import { useUser } from "@auth0/nextjs-auth0/client";
import { createContext, useContext, useState, useEffect } from "react";

import type { UserProfile } from "@auth0/nextjs-auth0/client";

const UserContext = createContext<UserProfile | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useUser();
  const [userData, setUserData] = useState(user);

  useEffect(() => {
    if (!isLoading) {
      setUserData({
        name: user?.name || "",
        email: user?.email || "",
        picture: user?.picture || "",
        user_id: user?.sub?.substring(14) || "",
      });
    }
  }, [user, isLoading]);

  return (
    <UserContext.Provider value={userData}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserData = () => useContext(UserContext);
