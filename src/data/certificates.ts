// src/data/certificates.ts
import { Certificate } from "@/components/Certifications";

export const certificates: Certificate[] = [
  {
    id: "1",
    title: "CSS Certificate",
    imageUrl: "/certificates/css certificate.pdf",      // Put images in public/certificates/
    downloadUrl: "/certificates/css certificate.pdf",   // Put PDFs in public/certificates/
  },
  {
    id: "2",
    title: "React Beginner Course",
    imageUrl: "/certificates/react.png",
    downloadUrl: "/certificates/react.pdf",
  },
];
