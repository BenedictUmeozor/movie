import { ReactNode } from "react";

export default function TvShowLayout({ children }: { children: ReactNode }) {
  return <div className="py-8">{children}</div>;
}
