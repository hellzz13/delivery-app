"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

interface IContext {}

interface IProvider {
  children: React.ReactNode;
}

const Context = React.createContext<IContext>({});

const QueryContext: React.FC<IProvider> = ({ children }) => {
  const value = React.useMemo(() => {}, []);
  const queryClient = new QueryClient();

  return (
    <Context.Provider value={{ value }}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Context.Provider>
  );
};

export { QueryContext };
