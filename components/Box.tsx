import { ReactNode } from "react";
import { IoClose } from "react-icons/io5";

interface BoxProps {
  onClose?: () => void;
  children?: ReactNode;
  icon?: ReactNode;
  title?: string;
  ref: React.Ref<any>;
}

const Box = ({ onClose, children, icon, title, ref }: BoxProps) => {
  return (
    <dl
      className='p-6 pt-12 bg-stone-50 rounded-2xl relative snap-center'
      ref={ref}
    >
      {title && (
        <dt className='p-1.5 font-[Inter] text-sm font-semibold absolute start-4 top-4 text-stone-500 max-w-[75%] overflow-hidden hover:cursor-default'>
          {title}
        </dt>
      )}
      {icon ? (
        icon
      ) : (
        <IoClose
          onClick={onClose}
          className='ease-in-out translate-x-[50%] translate-y-[-50%] duration-100 absolute end-8 top-8 text-3xl bg-stone-100 text-stone-500 font-semibold hover:cursor-pointer rounded-full p-1.5'
        />
      )}
      {children}
    </dl>
  );
};

export { Box };
