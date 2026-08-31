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

export type CertificateCategory = 'Cloud & DevOps' | 'AI & Data' | 'Skills & Experience';

export interface Certificate {
  id: string;
  title: string;
  imageUrl: string;
  downloadUrl: string;
  category: CertificateCategory;
  issuer?: string;
  year?: string;
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
