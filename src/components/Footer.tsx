import { FiGithub, FiLinkedin, FiInstagram, FiArrowUp } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(237,234,226,0.12)] bg-[#0a0a09]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="font-mono text-sm text-[#edeae2]">kaushal<span className="text-[#ff4d00]">.</span>dev</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#edeae2]/50">
            Software engineer from Pune. Full-stack + mobile apps, on cloud infra that stays up.
          </p>
          <div className="mt-4 flex gap-2">
            {[
              { icon: FiGithub, href: "https://github.com/Kaushal2910", l: "GitHub" },
              { icon: FiLinkedin, href: "https://www.linkedin.com/in/kaushal0510", l: "LinkedIn" },
              { icon: FiInstagram, href: "https://www.instagram.com/kaushal_0510_/", l: "Instagram" },
            ].map((s) => (
              <a key={s.l} href={s.href} aria-label={s.l} className="rounded-md border border-[rgba(237,234,226,0.12)] p-2.5 text-[#edeae2]/60 hover:border-[#ff4d00] hover:text-white">
                <s.icon size={16} />
              </a>
            ))}
          </div>
        </div>
        <nav>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#edeae2]/40">Sitemap</p>
          <ul className="mt-3 space-y-2 text-sm text-[#edeae2]/65">
            <li><a href="/#about" className="u-link">About</a></li>
            <li><a href="/projects" className="u-link">All projects</a></li>
            <li><a href="/certificates" className="u-link">All certificates</a></li>
            <li><a href="/#contact" className="u-link">Contact</a></li>
          </ul>
        </nav>
        <div>
          <p className="mt-3 text-sm leading-relaxed text-[#edeae2]/50">
            © {new Date().getFullYear()} Kaushal Sonawane<br />
            Built with Next.js · Deployed on Netlify
          </p>
          <a href="/" className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-[#edeae2]/50 hover:text-[#ff4d00]">
            ← Back home
          </a>
          <a href="#top" id="main-anchor" className="mt-2 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-[#edeae2]/50 hover:text-[#ff4d00]">
            <FiArrowUp size={13} /> Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
