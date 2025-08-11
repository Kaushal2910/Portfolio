// src/pages/Certifications.tsx
"use client";
import React from "react";
import CertificateOrbit from "@/components/CertificateOrbit";

export default function CertificationsPage() {
  return (
    <main className="min-h-screen bg-[#070914] text-white pt-16 pb-28">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-8">Certifications</h1>
        <CertificateOrbit />
      </div>
    </main>
  );
}
