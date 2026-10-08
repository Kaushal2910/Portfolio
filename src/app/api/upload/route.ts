import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { IMAGE_MIMES, extFromMime, extOf } from "@/lib/images";

const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

function slugify(name: string): string {
  return (
    name
      .replace(/\.[^.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "")
      .slice(0, 60) || "file"
  );
}

/**
 * Free file-based uploads. Accepts PNG/JPG/JPEG images (+ PDF for certs/resume).
 * - folder=site & target=profile → public/profile.<real-ext> (extension preserved,
 *   hero tries .png → .jpg → .jpeg so any format works)
 * - folder=site & target=resume → public/resume.pdf (PDF only)
 * - folder=projects → public/projectsImages/<ts>_<slug>.<ext>
 * - folder=certificates → public/certificates/<ts>_<slug>.<ext|pdf>
 */
export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    const folderRaw = form.get("folder");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    const isPdf = file.type === "application/pdf" && extOf(file.name) === "pdf";
    const isImage = IMAGE_MIMES.has(file.type) && ["png", "jpg", "jpeg"].includes(extOf(file.name));

    if (!isImage && !isPdf) {
      return NextResponse.json(
        { error: "Unsupported file type. Images: PNG, JPG, JPEG. Documents: PDF." },
        { status: 400 }
      );
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "File too large (max 10 MB)." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // --- site assets: fixed names, overwrite ---
    if (folderRaw === "site") {
      const target = form.get("target") === "resume" ? "resume" : "profile";
      if (target === "resume") {
        if (!isPdf) return NextResponse.json({ error: "Resume must be a PDF." }, { status: 400 });
        await writeFile(join(process.cwd(), "public", "resume.pdf"), buffer);
        return NextResponse.json({ path: "/resume.pdf", size: file.size });
      }
      if (!isImage) return NextResponse.json({ error: "Profile photo must be PNG, JPG or JPEG." }, { status: 400 });
      const fixedName = `profile.${extFromMime(file.type)}`;
      await writeFile(join(process.cwd(), "public", fixedName), buffer);
      return NextResponse.json({ path: `/${fixedName}`, size: file.size });
    }

    // --- content images: timestamped, never overwrite ---
    const isProject = folderRaw === "projects";
    const folder = isProject ? "projectsImages" : "certificates";
    if (isProject && !isImage) {
      return NextResponse.json({ error: "Project images must be PNG, JPG or JPEG." }, { status: 400 });
    }
    const ext = isPdf ? "pdf" : extFromMime(file.type);
    const uniqueName = `${Date.now()}_${slugify(file.name)}.${ext}`;
    const dir = join(process.cwd(), "public", folder);
    await mkdir(dir, { recursive: true });
    await writeFile(join(dir, uniqueName), buffer);

    return NextResponse.json({ path: `/${folder}/${uniqueName}`, size: file.size });
  } catch {
    return NextResponse.json({ error: "Upload failed." }, { status: 500 });
  }
}
