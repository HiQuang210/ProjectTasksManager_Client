import clsx from "clsx";

import {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  label?: string;
}

const Button = ({
  icon,
  className,
  label,
  type = "button",
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(
        "px-3 py-2 outline-none flex items-center justify-center gap-1",
        className
      )}
      {...props}
    >
      {label && (
        <span>{label}</span>
      )}

      {icon}
    </button>
  );
};

export default Button;