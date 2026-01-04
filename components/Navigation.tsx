"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarLogo,
} from "@/components/ui/resizable-navbar";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Work", link: "/#work" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];

  return (
    <Navbar>
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo href="/" className="flex-shrink-0 mr-4 md:mr-6 lg:mr-12">
          <Image
            src="/images/bc-logo.png"
            alt="BC Logo"
            width={40}
            height={40}
            className="h-8 md:h-10 w-auto"
          />
        </NavbarLogo>
        <NavItems 
          items={navItems}
          className="text-gray-300 dark:text-gray-300"
        />
        <div className="relative z-[100] flex items-center gap-2 md:gap-4 flex-shrink-0 justify-end ml-4 md:ml-8 lg:ml-12">
          <a
            href="/Brandon-Campbell-UX-Product-Designer-2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center text-white text-xs md:text-sm font-medium px-3 md:px-4 py-2 rounded-full border border-gray-300/10 bg-[#FFFFFF]/5 hover:bg-[#FFFFFF]/15 hover:border-2 transition-all whitespace-nowrap"
          >
            <GlowingEffect
              disabled={false}
              proximity={50}
              spread={30}
              blur={0}
              borderWidth={3}
              movementDuration={1.5}
            />
            <span className="relative z-10">View Resume</span>
          </a>
          <a
            href="https://linkedin.com/in/bcampbelldesigns"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link hover:text-blue-400 transition-colors inline-flex items-center relative z-[100]"
            aria-label="LinkedIn"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo href="/" className="flex-shrink-0">
            <Image
              src="/images/bc-logo.png"
              alt="BC Logo"
              width={40}
              height={40}
              className="h-8 w-auto"
            />
          </NavbarLogo>
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>
        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {navItems.map((item, idx) => (
            <Link
              key={`mobile-link-${idx}`}
              href={item.link}
              className="text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 text-base sm:text-[1.15rem] font-medium w-full py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <a
            href="/Brandon-Campbell-UX-Product-Designer-2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center justify-center text-white text-sm font-medium px-4 py-2.5 rounded-full border border-gray-300/10 bg-[#FFFFFF]/5 hover:bg-[#FFFFFF]/15 hover:border-2 transition-all w-full sm:w-auto"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <GlowingEffect
              disabled={false}
              proximity={50}
              spread={30}
              blur={0}
              borderWidth={3}
              movementDuration={1.5}
            />
            <span className="relative z-10 whitespace-nowrap">View Resume</span>
          </a>
          <a
            href="https://linkedin.com/in/bcampbelldesigns"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-600 dark:text-neutral-300 hover:text-blue-400 text-base sm:text-[1.15rem] font-medium inline-flex items-center gap-2 w-full py-2"
            aria-label="LinkedIn"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            LinkedIn
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
