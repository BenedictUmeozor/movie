"use client";

import { validateRequest } from "@/lib/auth";
import { createContext, memo, PropsWithChildren, useContext } from "react";

type Context = Awaited<ReturnType<typeof validateRequest>>;

export const sessionContext = createContext<Context>({
  session: null,
  user: null,
});

export const useSession = () => {
  return useContext(sessionContext);
};

export const SessionProvider = memo(
  ({ children, value }: PropsWithChildren<{ value: Context }>) => {
    return (
      <sessionContext.Provider value={value}>
        {children}
      </sessionContext.Provider>
    );
  },
);

SessionProvider.displayName = "SessionProvider";
