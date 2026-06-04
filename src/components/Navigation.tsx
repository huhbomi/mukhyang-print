"use client";

import Link from "next/link";
import { useState } from "react";
import { navItems } from "@/lib/navigation";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      className="h-6 w-6 text-gray-700"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      {open ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      )}
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const closeMobile = () => {
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <nav className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4">
        <button
          type="button"
          className="flex w-full items-center justify-between py-3 md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          <span className="text-sm font-medium text-gray-700">메뉴</span>
          <MenuIcon open={mobileOpen} />
        </button>

        {/* Desktop navigation */}
        <ul className="hidden items-center justify-center gap-1 md:flex md:gap-2">
          {navItems.map((item) => (
            <li key={item.label} className="group relative">
              {item.href ? (
                <Link
                  href={item.href}
                  className="block px-4 py-4 text-sm font-medium text-gray-700 transition-colors hover:text-brand md:px-6 md:text-base"
                >
                  {item.label}
                </Link>
              ) : (
                <>
                  <button
                    type="button"
                    className="block cursor-default px-4 py-4 text-sm font-medium text-gray-700 transition-colors group-hover:text-brand md:px-6 md:text-base"
                  >
                    {item.label}
                  </button>
                  {item.children && (
                    <ul className="invisible absolute left-1/2 top-full z-50 min-w-[140px] -translate-x-1/2 border border-border bg-white py-2 opacity-0 shadow-sm transition-all group-hover:visible group-hover:opacity-100">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block whitespace-nowrap px-5 py-2.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-brand"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile navigation */}
        {mobileOpen && (
          <ul id="mobile-menu" className="border-t border-border pb-4 md:hidden">
            {navItems.map((item) => (
              <li key={item.label} className="border-b border-border last:border-b-0">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="block px-2 py-3.5 text-sm font-medium text-gray-700 transition-colors hover:text-brand"
                    onClick={closeMobile}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between px-2 py-3.5 text-sm font-medium text-gray-700 transition-colors hover:text-brand"
                      onClick={() => toggleDropdown(item.label)}
                      aria-expanded={openDropdown === item.label}
                    >
                      {item.label}
                      <ChevronIcon open={openDropdown === item.label} />
                    </button>
                    {item.children && openDropdown === item.label && (
                      <ul className="bg-gray-50 pb-2">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="block px-6 py-2.5 text-sm text-gray-600 transition-colors hover:text-brand"
                              onClick={closeMobile}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}
