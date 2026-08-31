# Portfolio Redesign — Complete Plan

## Overview
A full rebuild of Kaushal Sonawane's portfolio with:
- **3D Hybrid UI**: Three.js hero scene + parallax/tilt cards + scroll animations
- **Admin Portal**: Hidden URL (`/admin-dash-9x2k`) with form-based JSON editing (no auth)
- **Cert Logic**: Top 3 visible on homepage, "Load More" expands full list
- **All 11 projects + 23 certificates** consolidated from all sources

---

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Animation**: Framer Motion
- **3D**: `@designcodeio/threeui` (pre-built Three.js components — NEVER build from scratch)
- **Icons**: `react-icons`
- **Fonts**: Geist (already configured)

### ThreeUI Components to Reuse (npm install @designcodeio/threeui)
Import pattern:
```tsx
import { ComponentName } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";
```

| Component | Use For | Category |
|-----------|---------|----------|
| `OrbitalSphereBackground` | Hero background — floating orbital spheres | Hero / Backgrounds |
| `ConstellationField` | Hero background alternative — star constellation network | Hero / Backgrounds |
| `ParticleDrift` | Section divider or subtle background particles | Motion Design |
| `NebulaBackground` | Cert section atmospheric background | Backgrounds |
| `FluidFieldBackground` | About section flowing background | Backgrounds |
| `DotMatrixBackground` | Projects section tech-feel background | Backgrounds |
| `GlassmorphismCta` | CTA buttons (View All Certs, Contact Me) | Buttons |
| `GradientCta` | Primary action buttons | Buttons |
| `ShaderButtons` | Navigation / filter buttons | Buttons |
| `TextAnimationCollection` | Section headings with animated text | Text Animation |
| `CharacterCarousel` | Skills showcase — rotating tech stack names | Motion Design |
| `Gallery` | Certificate gallery grid with 3D effects | Sections |
| `EditorialIntroSection` | About section layout template | Sections |
| `WarpFieldBackground` | Footer atmospheric background | Backgrounds |

**Rule: Always check ThreeUI first before building any 3D component from scratch.**

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with Navbar
│   ├── page.tsx                # Home page (Hero, About, Projects, Certs, GitHub, Footer)
│   ├── globals.css
│   ├── certificates/
│   │   └── page.tsx            # Full certificates gallery page
│   └── admin-dash-9x2k/
│       └── page.tsx            # Admin portal (hidden URL)
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx                # 3D Three.js scene + intro text
│   ├── About.tsx               # Bio, skills, experience cards
│   ├── Projects.tsx            # Project grid with 3D tilt cards
│   ├── ProjectCard.tsx         # Individual tilted project card
│   ├── Certifications.tsx      # Top 3 certs + Load More
│   ├── CertificationsAll.tsx   # Full cert gallery page component
│   ├── CertificateCard.tsx     # Individual cert card with modal preview
│   ├── GithubGraph.tsx         # GitHub contribution calendar
│   ├── Footer.tsx
│   ├── BackToTopButton.tsx
│   └── ThreeUIWrapper.tsx       # Wrapper for ThreeUI components (lazy loading + error boundaries)
├── data/
│   ├── projects.json           # All 11 projects
│   └── certificates.ts         # All 23 certificates (TypeScript)
└── types/
    └── index.ts                # Shared TypeScript interfaces
```

---

## Complete Data

### Projects (11 total)

```json
[
  {
    "title": "LoopHire",
    "description": "An automated career pipeline assistant that scrapes developer job postings, scores profile matches, and dynamically generates ATS-optimized CVs and cover letters.",
    "tech": ["Python", "AI", "BeautifulSoup", "docx"],
    "githubUrl": "https://github.com/Kaushal2910/LoopHire",
    "image": "/projectsImages/LoopHire.png",
    "featured": true
  },
  {
    "title": "NeuroBiz",
    "description": "AI-powered business platform featuring analytics, automation, and intelligent insights designed to streamline enterprise workflows.",
    "tech": ["Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
    "githubUrl": "https://github.com/Kaushal2910/NeuroBiz",
    "image": "/projectsImages/neurobiz.png",
    "featured": true
  },
  {
    "title": "RelationshipOS",
    "description": "Mobile App: A centralized mobile operating system for managing personal relationships, communication logs, reminders, and life events.",
    "tech": ["React Native", "TypeScript", "Expo", "SQLite"],
    "githubUrl": "https://github.com/Kaushal2910/RelationshipOS",
    "image": "/projectsImages/relationshipOS.png",
    "featured": true
  },
  {
    "title": "MediTrack",
    "description": "Mobile App: A decentralized Personal Health Record (PHR) mobile system leveraging blockchain for secure medical record tracking and data privacy.",
    "tech": ["React Native", "Blockchain", "Node.js", "Cryptography"],
    "githubUrl": "https://github.com/Kaushal2910/MediTrack",
    "image": "/projectsImages/meditrack.png",
    "featured": false
  },
  {
    "title": "MoneyMind",
    "description": "A modular personal finance management platform built with Node.js and Express. Track expenses, manage budgets, analyze spending patterns, and handle recurring payments.",
    "tech": ["Node.js", "Express", "JavaScript"],
    "githubUrl": "https://github.com/Kaushal2910/MoneyMind",
    "image": "/projectsImages/moneymind.png",
    "featured": true
  },
  {
    "title": "Trendzz",
    "description": "A modern fashion e-commerce web app focusing on modern UI and seamless shopping experience with product browsing, categories, and responsive design.",
    "tech": ["React.js", "Next.js", "CSS", "E-Commerce"],
    "githubUrl": "https://github.com/Kaushal2910/Trendzz",
    "image": "/projectsImages/Trendzz.png",
    "featured": false
  },
  {
    "title": "TourHouse Website",
    "description": "A sleek travel-booking website offering custom packages, stays, and tour itineraries with a strong focus on high-end UI/UX polish.",
    "tech": ["Next.js", "Tailwind CSS", "React.js", "JavaScript"],
    "githubUrl": "https://github.com/Kaushal2910/TourHouse-Website",
    "demoUrl": "https://tour-house-website.vercel.app/",
    "image": "/projectsImages/Tourhouse.png",
    "featured": true
  },
  {
    "title": "Sanz Café",
    "description": "Paid client freelance project – A fully responsive website for a local café featuring custom menus and optimized layouts.",
    "tech": ["HTML", "CSS", "JavaScript"],
    "githubUrl": "https://github.com/Kaushal2910/sanz-cafe",
    "demoUrl": "https://sanzcafe.netlify.app/",
    "image": "/projectsImages/sanzcafe.png",
    "featured": false
  },
  {
    "title": "EZ-Train",
    "description": "A Java-based train booking system with file persistence and role-based dashboards (Admin & Customer). Applied OOP, DSA, and OS concepts.",
    "tech": ["Java", "OOP", "DSA", "File Handling"],
    "githubUrl": "https://github.com/Kaushal2910/EZ-Train",
    "image": "/projectsImages/eztrain.png",
    "featured": false
  },
  {
    "title": "NeuroBiz-App",
    "description": "Frontend or companion application for the NeuroBiz platform.",
    "tech": ["TypeScript", "React"],
    "githubUrl": "https://github.com/Kaushal2910/NeuroBiz-App",
    "image": "/projectsImages/neurobiz-app.png",
    "featured": false
  },
  {
    "title": "Sanz Café Admin",
    "description": "Admin dashboard / panel application for the Sanz Café platform.",
    "tech": ["JavaScript", "React"],
    "githubUrl": "https://github.com/Kaushal2910/sanz_cafe_admin",
    "image": "/projectsImages/sanzcafe-admin.png",
    "featured": false
  }
]
```

### Certificates (23 total — ordered by importance)

```typescript
export const certificates = [
  // 🏆 Top Tier — Homepage Top 3
  { title: "Oracle Certified Architect Associate", imageUrl: "/certificates/Oracle_Certified_Architect_Associate.jpg", downloadUrl: "/certificates/Oracle_Certified_Architect_Associate.pdf" },
  { title: "Certified Agentforce Specialist - Salesforce", imageUrl: "/certificates/Salesforce_Certified_Agentforce_Specialist.jpg", downloadUrl: "/certificates/Salesforce_Certified_Agentforce_Specialist.pdf" },
  { title: "Snowflake Platform Training", imageUrl: "/certificates/SnowFlake_Platform_Training.jpg", downloadUrl: "/certificates/SnowFlake_Platform_Training.pdf" },

  // 🌐 Language & Cloud
  { title: "Japanese N5 Cleared - JLPT", imageUrl: "/certificates/JLPT_N5.jpg", downloadUrl: "/certificates/JLPT_N5.pdf" },
  { title: "Oracle Certified Foundations Associate – Agentic AI", imageUrl: "/certificates/Oracle_Certified_Foundations_Associate_Agentic_AI.jpg", downloadUrl: "/certificates/Oracle_Certified_Foundations_Associate_Agentic_AI.pdf" },
  { title: "Copado Certified AI", imageUrl: "/certificates/Copado_Certified_AI.jpg", downloadUrl: "/certificates/Copado_Certified_AI.jpg" },
  { title: "Diploma in MySQL and Statistics for Data Analysis", imageUrl: "/certificates/Alison_Diploma_MySQL_Statistics_Data_Analysis.jpg", downloadUrl: "/certificates/Alison_Diploma_MySQL_Statistics_Data_Analysis.pdf" },
  { title: "Oracle Certified DevOps Professional", imageUrl: "/certificates/Oracle_DevOps_Professional.jpg", downloadUrl: "/certificates/Oracle_DevOps_Professional.pdf" },
  { title: "Oracle Cloud Infrastructure Foundations Associate", imageUrl: "/certificates/Oracle_Certified_foundational_Certificate.jpg", downloadUrl: "/certificates/Oracle_Certified_foundational_Certificate.pdf" },
  { title: "Oracle AI Foundation Associate", imageUrl: "/certificates/Oracle_AI_Foundation_Associate.jpg", downloadUrl: "/certificates/Oracle_AI_Foundation_Associate.pdf" },
  { title: "Oracle Data Platform Foundations Associate", imageUrl: "/certificates/Oracle_Data_Platform_Foundations_Associate.jpg", downloadUrl: "/certificates/Oracle_Data_Platform_Foundations_Associate.pdf" },
  { title: "AWS Summit – Certificate of Attendance", imageUrl: "/certificates/aws_summit_certificate.jpeg", downloadUrl: "/certificates/aws_summit_certificate.pdf" },

  // 🧠 Experience & Skills
  { title: "Software Engineer Intern - HackerRank", imageUrl: "/certificates/software_engineer_intern certificate.jpg", downloadUrl: "/certificates/software_engineer_intern certificate.pdf" },
  { title: "Data Science & AI/ML Internship – YBI Foundation", imageUrl: "/certificates/data_science_aiml_ybi.jpg", downloadUrl: "/certificates/data_science_aiml_ybi.pdf" },
  { title: "Software Development Workshop – Crio.do", imageUrl: "/certificates/software_dev_workshop_crio.jpg", downloadUrl: "/certificates/software_dev_workshop_crio.pdf" },
  { title: "Data Analytics Certificate – Forage", imageUrl: "/certificates/data_analytics_forage.jpg", downloadUrl: "/certificates/data_analytics_forage.pdf" },
  { title: "Project Management Certificate – Forage", imageUrl: "/certificates/project_management_forage.jpg", downloadUrl: "/certificates/project_management_forage.pdf" },

  // ⚙️ Skill Enhancement
  { title: "C# Basics Certification – HackerRank", imageUrl: "/certificates/csharp_basic_hackerrank.jpg", downloadUrl: "/certificates/csharp_basic_hackerrank.pdf" },
  { title: "CSS Certification – HackerRank", imageUrl: "/certificates/css_hackerrank.jpg", downloadUrl: "/certificates/css_hackerrank.pdf" },
  { title: "WordPress Certificate – Udemy", imageUrl: "/certificates/wordpress_udemy.jpg", downloadUrl: "/certificates/wordpress_udemy.pdf" },

  // 💼 Experience & Soft Skills
  { title: "Certificate of Experience – YWS", imageUrl: "/certificates/YWSintership.jpg", downloadUrl: "/certificates/YWSintership.pdf" },
  { title: "Employability Skills Program – RPG Foundation & Zensar", imageUrl: "/certificates/employability_skill_rpg_zensar.jpeg", downloadUrl: "/certificates/employability_skill_rpg_zensar.pdf" },
  { title: "ServiceNow Micro-Certification", imageUrl: "/certificates/servicenow_micro.jpeg", downloadUrl: "/certificates/servicenow_micro.pdf" }
];
```

---

## Design Specs

### Color Palette
- **Background**: Deep black (#0a0a0a) with subtle gradient
- **Primary accent**: Electric blue (#3b82f6) / Cyan (#06b6d4)
- **Secondary**: Purple (#8b5cf6)
- **Text**: White (#ffffff) / Gray (#a1a1aa)
- **Cards**: Dark glassmorphism (rgba(255,255,255,0.05) with backdrop-blur)

### Hero Section (3D)
- **ThreeUI `OrbitalSphereBackground`** as the main 3D scene
- Fallback: `ConstellationField` if orbital doesn't fit
- Name + tagline overlaid with **ThreeUI `TextAnimationCollection`** for animated heading
- Gradient overlay on top of 3D scene for text readability
- Framer Motion fade-in for subtitle and CTA

### Projects Section
- **ThreeUI `DotMatrixBackground`** as subtle tech background
- Grid layout (responsive: 1 col mobile, 2 col tablet, 3 col desktop)
- Each card has CSS 3D tilt effect on hover (perspective + transform)
- Glassmorphism card style
- Tech stack pills/tags
- **ThreeUI `GradientCta`** for GitHub + Demo link buttons
- Framer Motion entrance animation (staggered)

### Certifications Section (Homepage)
- **ThreeUI `NebulaBackground`** behind cert section
- Shows top 3 certificates as large cards with glassmorphism
- Each card: certificate image thumbnail, title, download button
- **ThreeUI `GlassmorphismCta`** for "View All Certificates" button → navigates to `/certificates`
- On `/certificates` page: **ThreeUI `Gallery`** component for 3D cert grid with search/filter
- Click cert → modal with full-size preview + download

### About Section
- **ThreeUI `FluidFieldBackground`** as flowing background
- **ThreeUI `EditorialIntroSection`** layout for bio text
- **ThreeUI `CharacterCarousel`** for skills showcase — rotating tech stack names
- Experience timeline (4 roles from LinkedIn data)
- Framer Motion fade-in animations

### GitHub Section
- `react-github-calendar` contribution graph
- Pinned repos displayed

### Footer
- **ThreeUI `WarpFieldBackground`** as atmospheric footer background
- Social links (GitHub, LinkedIn, Instagram)
- **ThreeUI `GradientCta`** for social link buttons
- Copyright + "Built with Next.js"

---

## Admin Portal (`/admin-dash-9x2k`)

### Features
1. **Add Project**: Form with fields (title, description, tech[], githubUrl, demoUrl, image, featured)
2. **Add Certificate**: Form with fields (title, imageUrl, downloadUrl)
3. **List & Edit existing** projects/certs
4. **Delete** projects/certs
5. All changes write directly to `data/projects.json` and `src/data/certificates.ts`

### Implementation
- Use Next.js API Routes (`/api/projects`, `/api/certificates`)
- API routes read/write JSON files on disk
- Admin page is a simple form UI (no fancy design needed)
- No authentication — just hidden URL

### API Routes
```
POST   /api/projects       → Add new project
PUT    /api/projects/[id]  → Update project
DELETE /api/projects/[id]  → Delete project
POST   /api/certificates   → Add new certificate
PUT    /api/certificates/[id] → Update certificate
DELETE /api/certificates/[id] → Delete certificate
```

---

## Personal Info (for Hero/About)

- **Name**: Kaushal Sonawane
- **Username**: Kaushal2910
- **Bio**: Final year CSE student | Passionate about coding, DSA, and software development.
- **Location**: Pune, India
- **Website**: https://1mynewportfolio.netlify.app/
- **LinkedIn**: https://www.linkedin.com/in/kaushal0510
- **Instagram**: https://www.instagram.com/kaushal_0510_/
- **GitHub**: https://github.com/Kaushal2910

### Experience
1. **Associate DevOps Engineer** — Thynk Technology India (Sep 2025 – Mar 2026) — AWS, Jenkins, Docker, Kubernetes
2. **Web Development Intern** — Young Web Solutions (Feb 2025 – Jul 2025) — WordPress, Wix Studio, Elementor
3. **Internship Trainee (Cloud & Linux)** — CodeZone (Dec 2024 – Mar 2025) — AWS, Linux, Cloud Infrastructure
4. **Summer Intern (Data Science & AI/ML)** — YBI Foundation (Sep 2024 – Oct 2024) — Python, Pandas, ML

### Key Skills
AWS, Docker, Kubernetes, Jenkins, CI/CD, React, Next.js, TypeScript, Python, Java, Node.js, Tailwind CSS, Figma, Git, Linux, Blockchain

---

## Implementation Order
1. Set up project structure + install Three.js deps
2. Build Hero with 3D scene
3. Build About section
4. Build Projects with tilt cards
5. Build Certifications (top 3 + load more)
6. Build certificates full page
7. Build GitHub graph section
8. Build Footer
9. Build Admin portal + API routes
10. Polish animations + responsive design
