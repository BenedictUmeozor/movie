"use client";

import { SnackbarProvider } from "notistack";
import { memo, ReactNode } from "react";

const NotistackProvider = memo(({ children }: { children: ReactNode }) => {
  return <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>;
});

NotistackProvider.displayName = "NotistackProvider";
export default NotistackProvider;
