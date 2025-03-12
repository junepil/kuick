import { cn } from "@/lib/util";
import { cva, VariantProps } from "class-variance-authority";
import { InputHTMLAttributes } from "react";

const inputVarriants = cva(
  "font-[Inter] w-full font-semibold h-8 rounded-xl border-2 border-stone-300 p-3 outline-cyan-700 ease-in-out duration-300",
  {
    variants: {},
    defaultVariants: {},
  },
);

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVarriants> {}

const Input = ({ className, ...props }: InputProps) => {
  return (
    <input type='text' className={cn(inputVarriants(className))} {...props} />
  );
};

export { Input, inputVarriants };
