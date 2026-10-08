import { FiGithub } from "react-icons/fi";

export default function GithubStrip({ count }: { count: number }) {
  return (
    <section className="border-y border-[rgba(237,234,226,0.12)] bg-[#111110]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-8">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#edeae2]/45">
          Live from GitHub — auto-synced hourly
        </p>
        <div className="flex items-center gap-5 font-mono text-sm text-[#edeae2]/70">
          <span className="inline-flex items-center gap-1.5"><FiGithub size={15} /> {count} repos</span>
          <a href="/projects" className="rounded-md border border-[rgba(237,234,226,0.15)] px-3 py-1.5 text-xs uppercase tracking-widest hover:border-[#ff4d00] hover:text-white">
            Open index
          </a>
        </div>
      </div>
    </section>
  );
}
