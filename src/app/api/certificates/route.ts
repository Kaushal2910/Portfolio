import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import type { Certificate } from "@/types";

function storeFile() {
  return path.join(process.cwd(), "data", "certificates.json");
}

async function readAll(): Promise<Certificate[]> {
  try {
    const raw = await fs.readFile(storeFile(), "utf8");
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

async function writeAll(certs: Certificate[]) {
  await fs.mkdir(path.dirname(storeFile()), { recursive: true });
  await fs.writeFile(storeFile(), JSON.stringify(certs, null, 2) + "\n");
}

export async function GET() {
  const certs = await readAll();
  return NextResponse.json([...certs].sort((a, b) => a.rank - b.rank));
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const title = String(body.title ?? "").trim().slice(0, 160);
    const imageUrl = String(body.imageUrl ?? "").trim().slice(0, 300);
    if (!title || !imageUrl) {
      return NextResponse.json({ error: "Title and image are required." }, { status: 400 });
    }
    const certs = await readAll();
    const maxRank = certs.reduce((m, c) => Math.max(m, c.rank || 0), 0);
    const rank = Number.isFinite(Number(body.rank)) && Number(body.rank) > 0 ? Number(body.rank) : maxRank + 1;
    const cert: Certificate = {
      id: String(Date.now()),
      rank,
      title,
      imageUrl,
      downloadUrl: String(body.downloadUrl ?? imageUrl).trim().slice(0, 300) || imageUrl,
      category: String(body.category ?? "Uncategorized").trim().slice(0, 60) || "Uncategorized",
      issuer: String(body.issuer ?? "").trim().slice(0, 80),
      year: String(body.year ?? "").trim().slice(0, 8),
    };
    certs.push(cert);
    await writeAll(certs);
    return NextResponse.json(cert, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Could not save certificate." }, { status: 500 });
  }
}
