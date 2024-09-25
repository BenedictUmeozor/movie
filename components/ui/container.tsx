import { ReactNode } from "react";

const Container = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={`${className} container mx-auto max-w-7xl px-4`}>
      {children}
    </div>
  );
};
export default Container;
