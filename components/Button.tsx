import { ReactNode } from "react";

type ButtonProps = {
  onClick?: () => void;
  children: ReactNode;
};

const Button = ({ onClick, children, ...props }: ButtonProps) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className='flex items-center justify-center h-8 p-2.5 text-md text-gray-100 rounded-lg bg-gradient-to-bl from-cyan-800 to-emerald-800 hover:from-50% ease-in-out'
      {...props}
    >
      {children ?? "버튼"}
    </button>
  );
};

export { Button };
