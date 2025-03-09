import { Divider } from "@/components/Divider";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className='w-md h-fit grid grid-cols-2 gap-2 p-2'>
        <h2 className='p-4 text-5xl font-black text-green-800 col-span-2 text-center'>
          KUICK
        </h2>
        <Divider />
        {children}
      </div>
    </>
  );
}
