import {
  forwardRef,
  InputHTMLAttributes,
} from "react";

import clsx from "clsx";

interface TextboxProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;

  error?: string;

  className?: string;

  register?: object;
}

const Textbox = forwardRef<
  HTMLInputElement,
  TextboxProps
>(
  (
    {
      type = "text",
      placeholder,
      label,
      className,
      register,
      error,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full flex flex-col gap-1">
        {label && (
          <label className="text-slate-800">
            {label}
          </label>
        )}

        <div>
          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            {...register}
            {...props}
            aria-invalid={
              error ? "true" : "false"
            }
            className={clsx(
              "bg-transparent px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300",
              className
            )}
          />
        </div>

        {error && (
          <span className="text-xs text-[#f64949fe] mt-0.5">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Textbox.displayName = "Textbox";

export default Textbox;