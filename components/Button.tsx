import { cn } from "@/lib/util";
import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  "flex items-center font-[Inter] justify-center text-md text-gray-100 rounded-xl bg-gradient-to-bl ease-in-out w-fit",
  {
    variants: {
      variant: {
        default: "from-cyan-800 to-emerald-800 hover:backdrop-blur-2xl",
        destructive: "from-orange-800 to-pink-700",
        transparent:
          "border-2 border-neutral-50 backdrop-blur-2xl text-neutral-600 font-bold hover:border-cyan-800",
      },
      size: {
        md: "h-10 px-4 py-5",
        lg: "h-14 px-4 py-8",
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
