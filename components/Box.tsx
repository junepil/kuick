import { ReactNode } from "react";
import { IoClose } from "react-icons/io5";

interface BoxProps {
  onClose?: () => void;
  children?: ReactNode;
  icon?: ReactNode;
  title?: string;
}

const Box = ({ onClose, children, icon, title }: BoxProps) => {
  return (
    <div className='p-6 pt-12 bg-stone-50 rounded-2xl relative'>
      {title && (
        <div className='p-1.5 font-[Inter] text-sm font-semibold absolute start-2 top-2 text-stone-500 max-w-[75%] overflow-hidden'>
          {title}
        </div>
      )}
      {icon ? (
        icon
      ) : (
        <IoClose
          onClick={onClose}
          className='ease-in-out duration-300 absolute end-2 top-2 text-3xl text-stone-400 hover:text-emerald-800 hover:bg-stone-200 rounded-full p-1.5'
        />
      )}
      {children}
    </div>
  );
};

export { Box };
