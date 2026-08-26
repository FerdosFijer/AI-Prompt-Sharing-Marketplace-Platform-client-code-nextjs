"use client";

import Link from "next/link";
import {
  Sparkles,
  LogoFacebook,
  LogoGithub,
  LogoLinkedin,
  Globe,
  HeartFill,
} from "@gravity-ui/icons";

// Centralized link configuration for simple updates & reuse
const FOOTER_SECTIONS = {
  platform: [
    { label: "All Prompts", href: "/prompts" },
    { label: "Trending Prompts", href: "/prompts/trending" },
    { label: "Login", href: "/login" },
    { label: "Register", href: "/register" },
    { label: "Demo User", href: "/demo" },
  ],
  resources: [
    { label: "UI Elements", href: "/ui-elements" },
    { label: "Dev Meets Devs", href: "/dev-meets-devs" },
    { label: "Stripe Payment", href: "/stripe-payment" },
    { label: "Firebase Auth", href: "/firebase-auth" },
  ],
  socials: [
    { icon: LogoFacebook, href: "https://x.com", label: "X (Twitter)" },
    { icon: LogoGithub, href: "https://github.com", label: "GitHub" },
    { icon: LogoLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Globe, href: "https://aiverse.com", label: "Website" },
  ],
};

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-[#090a16] text-default-400">
      <div className="mx-auto max-w-7xl px-6 pt-12 pb-8">
        {/* Main Grid Section */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 lg:gap-12">
          
          {/* Column 1: Brand Info */}
          <div className="md:col-span-5 lg:col-span-4">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
              <Sparkles className="h-6 w-6 text-purple-500" />
              <span className="text-white">AI</span>
              <span className="text-cyan-400 -ml-1">verse</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-default-400">
              Discover, copy, and create production-ready AI prompts for Gemini,
              ChatGPT, Claude, and Midjourney. Build better apps, write better
              code, and automate your productivity.
            </p>
          </div>

          {/* Links Grid Layout */}
          <div className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-3 lg:col-span-8">
            
            {/* Column 2: Platform Links */}
            <div>
              <h3 className="text-sm font-semibold tracking-wider text-white uppercase">
                Platform
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {FOOTER_SECTIONS.platform.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Resources Links */}
            <div>
              <h3 className="text-sm font-semibold tracking-wider text-white uppercase">
                Resources
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {FOOTER_SECTIONS.resources.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Connect & Support */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-sm font-semibold tracking-wider text-white uppercase">
                Connect
              </h3>
              
              {/* Social Icon Buttons */}
              <div className="mt-4 flex items-center gap-2">
                {FOOTER_SECTIONS.socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-default-300 transition-all hover:border-purple-500/50 hover:bg-purple-950/40 hover:text-white"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>

              {/* Support Info */}
              <div className="mt-6 text-xs text-default-400">
                <p>Questions? Support at:</p>
                <a
                  href="mailto:support@aiverse.com"
                  className="font-medium text-purple-400 hover:underline"
                >
                  support@aiverse.com
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Copyright & Credit */}
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-default-400">
          <p className="flex items-center justify-center gap-1">
            © {new Date().getFullYear()} Aiverse. All rights reserved. Created {" "}
            <span className="font-bold text-white"> by{" "} Fijer</span>
            <HeartFill className="h-3.5 w-3.5 text-pink-500 inline-block" /> 
          </p>
        </div>
      </div>
    </footer>
  );
}