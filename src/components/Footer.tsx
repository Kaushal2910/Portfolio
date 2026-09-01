'use client';

import { FiGithub, FiLinkedin, FiInstagram, FiMail, FiMapPin } from 'react-icons/fi';

const socials = [
  { name: 'GitHub', url: 'https://github.com/Kaushal2910', icon: FiGithub },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/kaushal0510', icon: FiLinkedin },
  { name: 'Instagram', url: 'https://www.instagram.com/kaushal_0510_', icon: FiInstagram },
  { name: 'Email', url: 'mailto:sonawanekaushal05@gmail.com', icon: FiMail },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-black border-t border-white/5 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Section */}
        <div className="py-20 text-center">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-white/60 mb-4">Contact</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">Get in touch</h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto leading-relaxed">
            I&apos;m currently open to new opportunities and interesting projects.
            Feel free to reach out — I usually reply within a day.
          </p>

          <a
            href="mailto:sonawanekaushal05@gmail.com"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/[0.06] border border-white/[0.12] text-white/80 text-sm font-medium hover:bg-white/[0.1] hover:border-white/[0.2] transition-all duration-300"
          >
            <FiMail size={16} />
            sonawanekaushal05@gmail.com
          </a>

          <div className="mt-10 flex items-center justify-center gap-3">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target={s.url.startsWith('mailto') ? undefined : '_blank'}
                rel={s.url.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                aria-label={s.name}
                title={s.name}
                className="p-3 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all duration-300"
              >
                <s.icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Kaushal Sonawane</p>
          <p className="inline-flex items-center gap-1.5">
            <FiMapPin size={14} /> Pune, India
          </p>
        </div>
      </div>
    </footer>
  );
}