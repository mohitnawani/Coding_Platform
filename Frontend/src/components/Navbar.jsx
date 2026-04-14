import React from 'react'
import { NavLink } from 'react-router'

export default function Navbar() {
  return (
    <>
      <div className=" bg-[#0d1117] text-gray-300">
        <div className="container mx-auto"> {/* Centering container */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-8 h-14 bg-[#0d1117]/90 border-b border-gray-700/50 backdrop-blur-md">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight no-underline">
          <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center text-gray-900 text-xs font-black">
            C
          </div>
          <span className="text-white">Coder</span>
        </a>

        {/* Nav links — desktop */}
        <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
          {[
            { label: "Problems", to: "/problems" },
            { label: "Explore",  to: "/explore" },
            { label: "Contest",  to: "/contest" },
            { label: "Discuss",  to: "/discuss" },
            { label: "Leaderboard", to: "/leaderboard" },
          ].map(({ label, to }) => (
            <li key={label}>
              <NavLink
                to={to}
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all no-underline"
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Auth buttons */}
        <div className="flex items-center gap-2">
          <NavLink
            to="/login"
            className="px-4 py-1.5 rounded-lg text-sm font-semibold text-gray-300 border border-gray-700 hover:border-gray-500 hover:text-white transition-all no-underline"
          >
            Sign In
          </NavLink>
          <NavLink
            to="/signup"
            className="px-4 py-1.5 rounded-lg text-sm font-bold text-gray-900 bg-white hover:bg-gray-200 transition-all no-underline"
          >
            Sign Up
          </NavLink>
        </div>
      </nav>
        </div>
      </div>
   </>
    )

}
