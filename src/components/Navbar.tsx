"use client";
import { logoutThunk } from "@/features/auth/authThunk";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAdmin } = useAppSelector((state) => state.auth);

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutThunk());
    router.push("/");
  };

  const closeMenu = () => setMobileOpen(false);

  return (
    <nav className="w-full bg-gray-300 px-4 py-3 fixed top-0 z-50 shadow">
      <div className="flex justify-between items-center max-w-6xl mx-auto text-gray-700">
        <Link href="/" className="font-bold text-lg">
          SeatManager
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
          {isAdmin ? (
            <button className="text-red-500" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link href="/admin-login">Admin Login</Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setMobileOpen(true)}>
          <CiMenuFries size={24} />
        </button>
      </div>

      {/* Mobile Slide-in Menu */}
      <div
        className={`md:hidden fixed top-0 right-0 bg-gray-500 h-full w-44 shadow-lg z-50 transform transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={() => setMobileOpen(false)}>
            <IoClose size={24} />
          </button>
        </div>
        <div className="flex flex-col p-4 space-y-4">
          <Link href="/" onClick={closeMenu}>
            Home
          </Link>
          <Link href="/dashboard" onClick={closeMenu}>
            Dashboard
          </Link>
          {isAdmin ? (
            <button className="text-red-500 text-left" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link href="/admin-login" onClick={closeMenu}>
              Admin Login
            </Link>
          )}
        </div>
      </div>

      {/* Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
        />
      )}
    </nav>
  );
};

export default Navbar;
