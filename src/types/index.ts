export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  githubUrl: string;
  demoUrl?: string;
  image: string;
  featured: boolean;
}

// Categories are user-manageable at runtime (data/certificate-categories.json),
// so this is a string alias rather than a closed union.
export type CertificateCategory = string;

export interface Certificate {
  id: string;
  title: string;
  imageUrl: string;
  downloadUrl: string;
  category: CertificateCategory;
  issuer?: string;
  year?: string;
}

export interface CertificateCategoryItem {
  id: string;
  label: string;
}

export interface Experience {
  role: string;
  company: string;
  duration: string;
  description: string;
  skills: string[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}
