import { cn } from "@/lib/util";
import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  "flex items-center font-[Inter] justify-center text-md text-gray-100 rounded-xl ease-in-out w-fit hover:cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-stone-100 text-stone-500 font-semibold",
        destructive: "bg-orange-800",
        create: "bg-cyan-700",
        white: "bg-stone-50 text-cyan-700 font-semibold",
        inactivate:
          "bg-stone-100 text-stone-300 font-semibold hover:cursor-not-allowed",
      },
      size: {
        md: "h-10 px-4 py-5",
        lg: "h-14 px-6 py-8 rounded-3xl",
        sm: "h-8 px-2 py-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = ({ className, size, variant, ...props }: ButtonProps) => {
  return (
    <button
      type='button'
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
};

export { Button, buttonVariants };
