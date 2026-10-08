const tools = ["React Native", "Expo", "Next.js", "TypeScript", "Python", "AWS", "Docker", "Kubernetes", "Jenkins", "PostgreSQL", "Linux", "CI/CD", "日本語 N4"];

export default function Marquee() {
  const row = [...tools, ...tools];
  return (
    <div className="overflow-hidden border-y border-[rgba(237,234,226,0.12)] bg-[#111110] py-3">
      <div className="animate-marquee flex w-max gap-8 pr-8">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-8 font-mono text-xs uppercase tracking-[0.25em] text-[#edeae2]/50">
            {t} <span className="text-[#ff4d00]">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}
