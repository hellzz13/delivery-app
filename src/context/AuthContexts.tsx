"use client";
import { createContext, useCallback, useEffect, useState } from "react";

import api from "../services/authFakeApi";
import { useRouter } from "next/navigation";
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
  loading: boolean;
  handleLogOut: () => void;
  user: UserProps | null;
  isActiveLogin: boolean;
  setIsActiveLogin: (state: boolean) => void;
};

const DEFAULT_VALUE = {
  authenticated: false,
  handleLogin: async () => {},
  loading: true,
  handleLogOut: () => {},
  user: null,
  isActiveLogin: false,
  setIsActiveLogin: () => {},
};

const Context = createContext<AuthProps>(DEFAULT_VALUE);

const AuthProvider = ({ children }: any) => {
  const [authenticated, setAuthenticated] = useState(
    DEFAULT_VALUE.authenticated
  );
  const [loading, setLoading] = useState(DEFAULT_VALUE.loading);
  const [user, setUser] = useState(DEFAULT_VALUE.user);
  const [isActiveLogin, setIsActiveLogin] = useState(
    DEFAULT_VALUE.isActiveLogin
  );

  const { push } = useRouter();

  useEffect(() => {
    if (!authenticated) {
      return push("/");
    }
  }, [authenticated, push]);

  async function getUserData() {
    const { data } = await api.get("/me", {});
    setUser(data);
  }

  useEffect(() => {
    const token = localStorage.getItem("auth");

    if (token) {
      setAuthenticated(true);
      setLoading(false);
      getUserData();
    }
  }, []);

  async function handleLogin({ username, password }: LoginData) {
    console.log(username, password);
    await api
      .post("/login", {
        username: username,
        password: password,
      })
      .catch((e) => {
        toast.error(e.message);
      });

    push("/");
    const { data } = await api.get("/me", {});
    setUser(data);
    setAuthenticated(true);
    console.log(user);
  }

  const handleLogOut = useCallback(async () => {
    await api.post("/logout", {});
    window.location.replace("/");
  }, []);

  return (
    <Context.Provider
      value={{
        authenticated,
        handleLogin,
        loading,
        handleLogOut,
        user,
        isActiveLogin,
        setIsActiveLogin,
      }}
    >
      {children}

      <ToastNotification />
    </Context.Provider>
  );
};

export { Context, AuthProvider };
