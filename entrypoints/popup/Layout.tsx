import { Link } from "@/components/Link";
import { ReactNode } from "react";
import { FiExternalLink } from "react-icons/fi";
import { IoHelp } from "react-icons/io5";

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
            <Link url='https://github.com/junepil/kuick'>
              <IoHelp className='w-6 h-6 text-stone-50' />
            </Link>
            <Link url='https://wein.konkuk.ac.kr/ptfol/cmnt/cube/findCubeResveStep1.do'>
              <FiExternalLink className='w-5 h-5 text-stone-50' />
            </Link>
          </div>
        </div>
        {children}
      </div>
    </>
  );
}
