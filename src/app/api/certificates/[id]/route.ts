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
  await fs.writeFile(storeFile(), JSON.stringify(certs, null, 2) + "\n");
}

const FIELDS = ["title", "imageUrl", "downloadUrl", "category", "issuer", "year"] as const;

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json().catch(() => ({}));
    const certs = await readAll();
    const i = certs.findIndex((c) => c.id === id);
    if (i < 0) return NextResponse.json({ error: "Not found." }, { status: 404 });
    const next = { ...certs[i] };
    for (const f of FIELDS) {
      if (typeof body[f] === "string") next[f] = body[f].trim().slice(0, 300);
    }
    if (!next.title || !next.imageUrl) {
      return NextResponse.json({ error: "Title and image are required." }, { status: 400 });
    }
    if (Number.isFinite(Number(body.rank)) && Number(body.rank) > 0) next.rank = Number(body.rank);
    certs[i] = next;
    await writeAll(certs);
    return NextResponse.json(next);
  } catch {
    return NextResponse.json({ error: "Could not update certificate." }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const certs = await readAll();
    const kept = certs.filter((c) => c.id !== id);
    if (kept.length === certs.length) return NextResponse.json({ error: "Not found." }, { status: 404 });
    await writeAll(kept);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not delete certificate." }, { status: 500 });
  }
}
