"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Avatar } from "@heroui/react";
import {
  Bars,
  Xmark,
  ArrowRightFromSquare,
  Sparkles,
} from "@gravity-ui/icons";

// Centralized navigation links
const NAV_LINKS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "All Prompts",
    href: "/prompts",
  },
];

export default function Navbar({ user = null, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = !!user;

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-white/10 bg-background/80 backdrop-blur-lg">
      <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Left Section: Mobile Toggle & Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-default-400 hover:bg-default-100/10 hover:text-white md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <Xmark className="h-6 w-6" /> : <Bars className="h-6 w-6" />}
          </button>

          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <Sparkles className="h-6 w-6 text-purple-500" />
            <span className="text-white">AI</span>
            <span className="text-cyan-400 -ml-1">verse</span>
          </Link>
        </div>

        {/* Desktop Navigation Links & User Controls */}
        <div className="hidden md:flex md:items-center md:gap-6">
          <ul className="flex items-center gap-6 text-sm font-medium">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-default-400 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* User Session Section */}
          {isLoggedIn ? (
            <div className="flex items-center gap-4 pl-4 border-l border-white/10">
              <div className="flex items-center gap-2.5">
                <Avatar
                  src={user.avatarUrl}
                  name={user.name}
                  size="sm"
                  className="ring-2 ring-purple-500/50"
                />
                <span className="text-sm font-medium text-white max-w-[120px] truncate">
                  {user.name}
                </span>
              </div>

              <Button
                size="sm"
                variant="flat"
                onClick={onLogout}
                className="bg-default-100/10 text-default-300 hover:bg-danger-500/20 hover:text-danger-400"
                startContent={<ArrowRightFromSquare className="h-4 w-4" />}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
              <Button as={Link} href="/login" size="sm" variant="light">
                Sign In
              </Button>
              <Button as={Link} href="/register" size="sm" color="primary">
                Get Started
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Drawer Dropdown */}
      {isMenuOpen && (
        <div className="border-t border-white/10 bg-background/95 backdrop-blur-xl md:hidden">
          <ul className="flex flex-col gap-3 p-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-base font-medium text-default-300 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}

            <li className="pt-2 border-t border-white/10">
              {isLoggedIn ? (
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <Avatar src={user.avatarUrl} name={user.name} size="sm" />
                    <span className="text-sm font-medium text-white">{user.name}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="flat"
                    onClick={() => {
                      setIsMenuOpen(false);
                      onLogout?.();
                    }}
                    startContent={<ArrowRightFromSquare className="h-4 w-4" />}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 pt-2">
                  <Button as={Link} href="/login" fullWidth variant="bordered">
                    Sign In
                  </Button>
                  <Button as={Link} href="/register" fullWidth color="primary">
                    Get Started
                  </Button>
                </div>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}