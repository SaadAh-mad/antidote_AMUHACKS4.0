"use client"
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#424242] text-white w-full p-3 md:w-auto text-center">
      <div className="flex justify-between items-center font-kode font-bold shadow-gray-400 w-full">
        <div className="flex gap-2 items-center text-2xl">
          
          Kaamvala
        </div>

        
        <div className="hidden md:flex items-center gap-8">
        <Link href="/provider" className="text-blue-600 underline">
      <button className='bg-blue-600 text-white px-4 py-2 rounded-lg'>
         Service Provider
         </button> </Link>
                 
          <Link href={"/dashboard"}>
            <div>Location</div>
          </Link>
          <div>
            <Link href={"/auth/login"}>
              <button className="min-w-20 rounded-2xl bg-[#e3e3e3] p-2 text-black hover:bg-blue-500">
                LOGIN
              </button>
            </Link>
          </div>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
          ☰
        </button>
      </div>

      {isOpen && (
        <div className="flex flex-col items-center gap-4 mt-2 md:hidden w-full">
          <div>HOME</div>
          <Link href={"/auth/login"}>
            <button className="min-w-20 rounded-2xl bg-[#e3e3e3] p-2 text-black hover:bg-blue-500">
              LOGIN
            </button>
          </Link>
          <button>Location</button>
        </div>
      )}
    </nav>
  );
}
