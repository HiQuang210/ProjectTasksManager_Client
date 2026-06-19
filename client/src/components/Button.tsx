import clsx from "clsx";
import { ReactNode } from "react";

interface ButtonProps {
  icon?: ReactNode;
  className?: string;
  label: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const Button = ({
  icon,
  className,
  label,
  type = "button",
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(
        "px-3 py-2 outline-none",
        className
      )}
      onClick={onClick}
    >
      <span>{label}</span>

      {icon && icon}
    </button>
  );
};

export default Button;