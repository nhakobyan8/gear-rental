"use client";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "./store";

export function ClientSessionProvider({ children }) {
   return <SessionProvider>{children}</SessionProvider>;
}

export function ReduxProvider({ children }) {
   return <Provider store={store}>{children}</Provider>;
}

export default {
   ClientSessionProvider,
   ReduxProvider
}