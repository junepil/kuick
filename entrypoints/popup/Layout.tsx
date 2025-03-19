import { ReactNode } from "react";
import { MdAlternateEmail } from "react-icons/md";
import { FaGithub } from "react-icons/fa";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className='overflow-y-hidden w-xs h-128 flex flex-col gap-2 bg-gradient-to-t from-cyan-700 to-emerald-700 relative '>
        <div className='flex items-center justify-between p-8'>
          <div className='flex items-center gap-2'>
            <img src='./icon.svg' className='w-6 h-6' />
            <h2 className='text-xl font-[Inter] font-light text-stone-50 col-span-2 text-start block hover:cursor-default'>
              Kuick
            </h2>
          </div>
          <div className='flex items-center gap-4'>
            <a href='mailto:hanu9257@gmail.com'>
              <MdAlternateEmail className='w-5 h-5 text-stone-50' />
            </a>
            <a href='https://github.com/junepil/kuick'>
              <FaGithub className='w-5 h-5 text-stone-50' />
            </a>
          </div>
        </div>
        {children}
      </div>
    </>
  );
}
