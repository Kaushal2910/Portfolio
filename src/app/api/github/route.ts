import { NextResponse } from "next/server";

// Free proxy: hides GITHUB_TOKEN, shares the hourly cache between pages.
export async function GET() {
  const user = process.env.GITHUB_USERNAME || "Kaushal2910";
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "portfolio-muse",
  };
  if (process.env.GITHUB_TOKEN) h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const res = await fetch(`https://api.github.com/users/${user}/repos?per_page=100&sort=pushed`, {
    headers: h,
    next: { revalidate: 3600 },
  });
  if (!res.ok) return NextResponse.json([], { status: res.status });
  const data = await res.json();
  return NextResponse.json(data);
}
