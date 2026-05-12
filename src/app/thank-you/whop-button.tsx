"use client";

const WHOP_URL = "https://whop.com/checkout/plan_oYS51IWhG8H9q";

const PRIMARY_CLASS =
  "inline-block rounded-xl px-10 py-4 font-bold text-white text-base sm:text-lg";
const PRIMARY_STYLE: React.CSSProperties = {
  background: "linear-gradient(110deg,#3b82f6,#8b5cf6)",
  textDecoration: "none",
};

interface WhopButtonProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function WhopButton({ children, className, style }: WhopButtonProps) {
  function handleClick() {
    if (typeof window.fbq === "function") {
      window.fbq("track", "Purchase", { currency: "EUR", value: 97 });
    }
  }

  return (
    <a
      href={WHOP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className ?? PRIMARY_CLASS}
      style={style ?? PRIMARY_STYLE}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
