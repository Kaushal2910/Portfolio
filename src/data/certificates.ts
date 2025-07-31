// src/data/certificates.ts
import { Certificate } from "@/components/Certifications";

export const certificates: Certificate[] = [
  {
    id: "1",
    title: "JLPT N5 Certificate",
    imageUrl: "/certificates/n5.png",      // Put images in public/certificates/
    downloadUrl: "/certificates/n5.pdf",   // Put PDFs in public/certificates/
  },
  {
    id: "2",
    title: "React Beginner Course",
    imageUrl: "/certificates/react.png",
    downloadUrl: "/certificates/react.pdf",
  },
];
