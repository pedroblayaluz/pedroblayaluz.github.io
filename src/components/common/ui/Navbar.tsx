"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { LAYERS } from "@/lib/layerConfig";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Close menu when clicking anywhere outside
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        headerRef.current?.contains(target) ||
        navRef.current?.contains(target)
      ) {
        return; // click was inside header or nav, ignore
      }
      setMobileMenuOpen(false);
    };

    // Use timeout so the opening click doesn't immediately close
    const timer = setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Header bar — entire bar is clickable to toggle menu */}
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 h-14 bg-white flex items-center px-4 shadow-sm cursor-pointer"
        style={{ fontWeight: 350, zIndex: LAYERS.NAVBAR }}
        onClick={() => setMobileMenuOpen((v) => !v)}
      >
        <h2
          className="m-0 text-lg text-gray-900 flex items-center gap-2"
          style={{ fontWeight: 350, pointerEvents: "none" }}
        >
          <div className="w-5 h-5 flex-shrink-0">
            <Image
              src="/pedroluz.ico"
              alt="pedroluz"
              width={20}
              height={20}
            />
          </div>
          <span>pedroluz</span>
        </h2>

        {/* Burger Menu Button (visual only — click handled by header) */}
        <div className="flex flex-col gap-1.5 ml-auto pointer-events-none">
          <span
            className={`block w-7 h-0.5 transition-all ${mobileMenuOpen ? "translate-y-2 rotate-45" : ""}`}
            style={{ backgroundColor: "#a397eb" }}
          />
          <span
            className={`block w-7 h-0.5 transition-all ${mobileMenuOpen ? "opacity-0" : ""}`}
            style={{ backgroundColor: "#a397eb" }}
          />
          <span
            className={`block w-7 h-0.5 transition-all ${mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""}`}
            style={{ backgroundColor: "#a397eb" }}
          />
        </div>
      </header>

      {/* Dropdown menu */}
      <nav
        ref={navRef}
        className={`fixed top-14 left-0 right-0 bg-white shadow-sm ${mobileMenuOpen ? "block" : "hidden"}`}
        style={{ zIndex: LAYERS.MENU_DROPDOWN }}
      >
        <ul className="list-none p-2 m-0 space-y-1">
          <li>
            <Link
              href="/"
              className="block px-3 py-2.5 no-underline rounded text-base"
              style={{ color: "#6b629d", fontWeight: 350 }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f2e6ff")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              onClick={() => setMobileMenuOpen(false)}
            >
              página inicial
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="block px-3 py-2.5 no-underline rounded text-base"
              style={{ color: "#6b629d", fontWeight: 350 }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f2e6ff")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              onClick={() => setMobileMenuOpen(false)}
            >
              arte
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="block px-3 py-2.5 no-underline rounded text-base"
              style={{ color: "#6b629d", fontWeight: 350 }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f2e6ff")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              onClick={() => setMobileMenuOpen(false)}
            >
              software
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};
