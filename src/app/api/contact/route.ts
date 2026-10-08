import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const RATE = new Map<string, number>();

function messagesFile() {
  return path.join(process.cwd(), "data", "messages.json");
}

/** Inbox reader for the hidden admin page. */
export async function GET() {
  try {
    const raw = await fs.readFile(messagesFile(), "utf8");
    const arr = JSON.parse(raw);
    return NextResponse.json(Array.isArray(arr) ? arr.reverse() : []);
  } catch {
    return NextResponse.json([]);
  }
}

/**
 * Free contact pipeline:
 * 1. Web3Forms (free) → straight to inbox
 * 2. SHEET_WEBHOOK_URL (free Apps Script) → Google Sheet row
 * 3. data/messages.json → file backup (always; doubles as free CRUD inbox)
 */
export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "local";
    const last = RATE.get(ip) ?? 0;
    if (Date.now() - last < 30_000) {
      return NextResponse.json({ error: "Slow down — one message per 30s." }, { status: 429 });
    }

    const body = await req.json().catch(() => ({}));
    const name = String(body.name ?? "").trim().slice(0, 80);
    const email = String(body.email ?? "").trim().slice(0, 120);
    const message = String(body.message ?? "").trim().slice(0, 3000);
    if (body.company) return NextResponse.json({ ok: true }); // honeypot
    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields required." }, { status: 400 });
    }

    RATE.set(ip, Date.now());
    const row = { at: new Date().toISOString(), name, email, message, ip };

    // 1. email via Web3Forms (free)
    if (process.env.WEB3FORMS_KEY) {
      try {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: process.env.WEB3FORMS_KEY,
            subject: `Portfolio ping from ${name}`,
            from_name: name,
            reply_to: email.includes("@") ? email : undefined,
            message: `${message}\n\n— ${name} (${email})`,
          }),
        });
      } catch { /* fall through to file backup */ }
    }

    // 2. Google Sheet log (free Apps Script webhook)
    if (process.env.SHEET_WEBHOOK_URL) {
      try {
        await fetch(process.env.SHEET_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(row),
        });
      } catch { /* non-fatal */ }
    }

    // 3. file backup — always
    try {
      const file = path.join(process.cwd(), "data", "messages.json");
      let arr: unknown[] = [];
      try {
        arr = JSON.parse(await fs.readFile(file, "utf8"));
      } catch { /* first message */ }
      arr.push(row);
      await fs.mkdir(path.dirname(file), { recursive: true });
      await fs.writeFile(file, JSON.stringify(arr, null, 2));
    } catch { /* non-fatal */ }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Send failed." }, { status: 500 });
  }
}
