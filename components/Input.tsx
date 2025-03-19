import { cn } from "@/lib/util";
import { cva, VariantProps } from "class-variance-authority";
import { InputHTMLAttributes } from "react";

const inputVarriants = cva(
  "font-[Inter] font-semibold h-8 rounded-lg border-2 border-stone-300 p-3 px-2 outline-indigo-700 ease-in-out duration-100",
  {
    variants: {},
    defaultVariants: {},
  },
);

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVarriants> {
  invalid?: boolean;
  message?: string;
}

const Input = ({ className, invalid, message, ...props }: InputProps) => {
  return (
    <div className='relative w-fit h-fit'>
      <input
        type='text'
        className={cn(inputVarriants(className), {
          "outline-red-700": invalid,
        })}
        {...props}
      />
      {invalid && (
        <p className='px-2 absolute font-[Inter] text-[10px] text-red-700'>
          {message}
        </p>
      )}
    </div>
  );
};

export { Input, inputVarriants };
