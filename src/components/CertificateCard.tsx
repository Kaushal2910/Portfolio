// src/components/CertificateCard.tsx
import React from "react";

export interface CertificateCardProps {
  id: string;
  title: string;
  imageUrl: string;
  downloadUrl: string; // should point to the PDF version
}

const CertificateCard: React.FC<CertificateCardProps> = ({
  title,
  imageUrl,
  downloadUrl,
}) => {
  return (
    <div className="bg-[#111729] rounded-xl shadow-lg overflow-hidden w-[280px] transition-transform duration-300 hover:scale-[1.02]">
      <div className="relative w-full h-40 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full"
          loading="lazy"
        />
      </div>
      <div className="p-4 flex flex-col items-center">
        <h3 className="text-lg font-medium text-[#10b3f3] text-center">{title}</h3>
        <a
          href={downloadUrl}
          download
          className="mt-3 inline-block px-4 py-2 text-sm font-small text-white bg-blue-600 rounded-lg shadow-md hover:shadow-[0px_0px_15px_rgba(0,150,255,0.5)] hover:bg-blue-500 transition-all duration-300"
        >
          Download PDF
        </a>
      </div>
    </div>
  );
};

export default CertificateCard;
