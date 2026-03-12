import "../styles/btn17.css";
import type { ReactNode } from "react";

interface Btn17Props {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export function Btn17({ children, href, onClick, type = "button", className = "" }: Btn17Props) {
  const inner = (
    <span className="text-container">
      <span className="text">{children}</span>
    </span>
  );

  if (href) {
    return (
      <a href={href} className={`btn-17 ${className}`}>
        {inner}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={`btn-17 ${className}`}>
      {inner}
    </button>
  );
}
