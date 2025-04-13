'use client';
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthProvider";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, login, logout, locationSaved } = useAuth();

  return (
    <nav className="bg-[#424242] text-white w-full p-3 md:w-auto text-center">
      <div className="flex justify-between items-center font-kode font-bold shadow-gray-400 w-full">
        <div className="flex gap-2 items-center text-2xl">
          Kaamvala
        </div>

        <div className="hidden md:flex items-center gap-8">
          {/* ✅ Show Nearby Providers button only if user is logged in */}
          {user && (
            <Link href="/nearby">
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
                Nearby Providers
              </button>
            </Link>
          )}

          {/* ✅ Show Register as Provider only if user is logged in & location is saved */}
          {user && locationSaved && (
            <Link href="/provider" className="text-blue-600 underline">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                Register as Provider
              </button>
            </Link>
          )}

          

          {/* ✅ Conditional Login/Logout */}
          {!user ? (
            <button
              onClick={login}
              className="min-w-20 rounded-2xl bg-[#e3e3e3] p-2 text-black hover:bg-blue-500"
            >
              LOGIN
            </button>
          ) : (
            <button
              onClick={logout}
              className="min-w-20 rounded-2xl bg-red-500 p-2 text-white hover:bg-red-600"
            >
              LOGOUT
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
          ☰
        </button>
      </div>

      {/* ✅ Mobile View */}
      {isOpen && (
        <div className="flex flex-col items-center gap-4 mt-2 md:hidden w-full">
          <Link href="/">HOME</Link>
          

          {/* Show Nearby Providers button only if user is logged in */}
          {user && (
            <Link href="/nearby">
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
                Nearby Providers
              </button>
            </Link>
          )}

          {/* ✅ Show Register as Provider only if user is logged in & location is saved */}
          {user && locationSaved && (
            <Link href="/provider">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                Register as Provider
              </button>
            </Link>
          )}

          {!user ? (
            <button
              onClick={login}
              className="min-w-20 rounded-2xl bg-[#e3e3e3] p-2 text-black hover:bg-blue-500"
            >
              LOGIN
            </button>
          ) : (
            <button
              onClick={logout}
              className="min-w-20 rounded-2xl bg-red-500 p-2 text-white hover:bg-red-600"
            >
              LOGOUT
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
