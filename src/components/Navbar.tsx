'use client';

import { useEffect, useState } from "react";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#work", label: "Work" },
  { href: "/#certs", label: "Certs" },
  { href: "/projects", label: "All projects" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const f = () =>
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    f();
    const t = setInterval(f, 10000);
    return () => clearInterval(t);
  }, []);

  return (
    <nav className="no-print fixed inset-x-0 top-0 z-[80] border-b border-[rgba(237,234,226,0.12)] bg-[#0d0d0c]/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <a href="/" className="font-mono text-sm tracking-tight text-[#edeae2]">
          kaushal<span className="text-[#ff4d00]">.</span>dev
          <span className="ml-2 hidden rounded-full border border-[rgba(237,234,226,0.15)] px-2 py-0.5 text-[10px] uppercase tracking-widest text-[#edeae2]/60 sm:inline">
            Pune · {time} IST
          </span>
        </a>
        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="u-link font-mono text-xs uppercase tracking-widest text-[#edeae2]/60 hover:text-[#edeae2]"
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a href="https://github.com/Kaushal2910" aria-label="GitHub" className="rounded-md p-2 text-[#edeae2]/60 hover:bg-white/5 hover:text-[#edeae2]">
            <FiGithub size={16} />
          </a>
          <a href="https://www.linkedin.com/in/kaushal0510" aria-label="LinkedIn" className="rounded-md p-2 text-[#edeae2]/60 hover:bg-white/5 hover:text-[#edeae2]">
            <FiLinkedin size={16} />
          </a>
          <a
            href="/#contact"
            className="rounded-md bg-[#ff4d00] px-3.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-white transition-transform hover:-translate-y-px"
          >
            Hire me
          </a>
        </div>
      </div>
      {/* mobile links */}
      <div className="flex gap-4 overflow-x-auto border-t border-[rgba(237,234,226,0.08)] px-4 py-2 md:hidden">
        {links.map((l) => (
          <a key={l.label} href={l.href} className="whitespace-nowrap font-mono text-[11px] uppercase tracking-widest text-[#edeae2]/60">
            {l.label}
          </a>
        ))}
        <a href="mailto:sonawanekaushal05@gmail.com" aria-label="Email" className="ml-auto text-[#edeae2]/60">
          <FiMail size={14} />
        </a>
      </div>
    </nav>
  );
}
