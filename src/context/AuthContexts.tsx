"use client";
import { createContext, useCallback, useEffect, useState } from "react";

import api from "../services/authFakeApi";
import { useRouter, usePathname } from "next/navigation";
import { UserProps } from "@/models/Users";
import ToastNotification from "@/components/ToastNotification";
import { toast } from "react-toastify";

type LoginData = {
  username: string;
  password: string;
};

type AuthProps = {
  authenticated: boolean;
  handleLogin: (data: LoginData) => Promise<void>;
  handleLogOut: () => void;
  user: UserProps | null;
};

const DEFAULT_VALUE = {
  authenticated: false,
  handleLogin: async () => {},
  handleLogOut: () => {},
  user: null,
};

const Context = createContext<AuthProps>(DEFAULT_VALUE);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authenticated, setAuthenticated] = useState(
    DEFAULT_VALUE.authenticated
  );
  const [user, setUser] = useState(DEFAULT_VALUE.user);

  const { push } = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!authenticated && !pathname.startsWith("/criar-usuar")) {
      return push("/");
    }
  }, [authenticated, pathname, push]);

  async function getUserData() {
    const { data } = await api.get("/me", {});
    setUser(data);
  }

  useEffect(() => {
    const token = localStorage.getItem("auth");

    if (token) {
      setAuthenticated(true);
      getUserData();
    }
  }, []);

  const handleLogin = useCallback(async function handleLogin({
    username,
    password,
  }: LoginData) {
    console.log(username, password);
    await api
      .post("/login", {
        username: username,
        password: password,
      })
      .catch((e) => {
        toast.error(e.message);
      })
      .finally(() => toast.success("Login efetuado!"));

    const { data } = await api.get("/me", {});
    setUser(data);
    setAuthenticated(true);
  },
  []);

  const handleLogOut = useCallback(async () => {
    await api.post("/logout", {});
    window.location.replace("/");
  }, []);

  return (
    <Context.Provider
      value={{
        authenticated,
        handleLogin,
        handleLogOut,
        user,
      }}
    >
      {children}

      <ToastNotification />
    </Context.Provider>
  );
};

export { Context, AuthProvider };
