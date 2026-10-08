export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  updated_at: string;
  fork: boolean;
  archived: boolean;
  topics: string[];
}

export interface CuratedOverride {
  hide?: boolean;
  featuredRank?: number;
  title?: string;
  blurb?: string;
  demoUrl?: string;
  image?: string;
  tech?: string[];
}

export interface ProjectView extends GitHubRepo {
  displayTitle: string;
  displayBlurb: string;
  displayTech: string[];
  demoUrl: string | null;
  image: string | null;
  featuredRank: number | null;
  hidden: boolean;
}

export interface Certificate {
  id: string;
  title: string;
  imageUrl: string;
  downloadUrl: string;
  category: string;
  issuer?: string;
  year?: string;
  /** 1 = most valuable. Homepage shows rank 1–3. */
  rank: number;
}
