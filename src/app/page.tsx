"use client";
import { Context } from "@/context/AuthContexts";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import Login from "@/components/Login";
export default function Home() {
  const { authenticated } = useContext(Context);
  const { push } = useRouter();

  if (authenticated) {
    return push("/deslocamentos");
  }

  return <Login />;
}
