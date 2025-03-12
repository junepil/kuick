import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className='w-xs h-128 flex flex-col gap-2 bg-zinc-50'>
        <div className='flex items-center p-8 gap-4'>
          <img src='./icon.svg' className='w-8 h-8' />
          <h2 className='text-xl font-[Inter] font-semi text-emerald-800 col-span-2 text-start block'>
            Kuick
          </h2>
        </div>
        {children}
      </div>
    </>
  );
}
