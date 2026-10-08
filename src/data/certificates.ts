import type { Certificate } from "@/types";

// Ranked: rank 1 = most valuable. Homepage shows rank 1–3 in a
// feature + 2-card grid. Reorder by changing rank.
// NOTE: rank 2 and 3 files are pending upload — drop the exact filenames
// below into public/certificates/ and they appear automatically.

export const certificates: Certificate[] = [
  // --- Homepage top 3: DevOps · Software · Language ---
  { id: "3", rank: 1, title: "Oracle Certified DevOps Professional", imageUrl: "/certificates/Oracle_DevOps_Professional.jpg", downloadUrl: "/certificates/Oracle_DevOps_Professional.pdf", category: "Cloud & DevOps", issuer: "Oracle", year: "2025" },
  { id: "25", rank: 2, title: "Software Engineer Certification – HackerRank", imageUrl: "/certificates/software_engineer_hackerrank.jpg", downloadUrl: "/certificates/software_engineer_hackerrank.pdf", category: "Skills & Experience", issuer: "HackerRank", year: "2025" },
  { id: "26", rank: 3, title: "Japanese N4 Cleared – JLPT", imageUrl: "/certificates/JLPT_N4.jpg", downloadUrl: "/certificates/JLPT_N4.pdf", category: "Skills & Experience", issuer: "JLPT", year: "2025" },

  // --- The rest, in rank order ---
  { id: "1", rank: 4, title: "Oracle Certified Architect Associate", imageUrl: "/certificates/Oracle_Certified_Architect_Associate.jpg", downloadUrl: "/certificates/Oracle_Certified_Architect_Associate.pdf", category: "Cloud & DevOps", issuer: "Oracle", year: "2025" },
  { id: "7", rank: 5, title: "Certified Agentforce Specialist", imageUrl: "/certificates/Salesforce_Certified_Agentforce_Specialist.jpg", downloadUrl: "/certificates/Salesforce_Certified_Agentforce_Specialist.pdf", category: "AI & Data", issuer: "Salesforce", year: "2025" },
  { id: "2", rank: 6, title: "Snowflake Platform Training", imageUrl: "/certificates/SnowFlake_Platform_Training.jpg", downloadUrl: "/certificates/SnowFlake_Platform_Training.pdf", category: "Cloud & DevOps", issuer: "Snowflake", year: "2025" },
  { id: "4", rank: 7, title: "Oracle Cloud Infrastructure Foundations Associate", imageUrl: "/certificates/Oracle_Certified_foundational_Certificate.jpg", downloadUrl: "/certificates/Oracle_Certified_foundational_Certificate.pdf", category: "Cloud & DevOps", issuer: "Oracle", year: "2024" },
  { id: "8", rank: 8, title: "Oracle Certified Foundations Associate – Agentic AI", imageUrl: "/certificates/Oracle_Certified_Foundations_Associate_Agentic_AI.jpg", downloadUrl: "/certificates/Oracle_Certified_Foundations_Associate_Agentic_AI.pdf", category: "AI & Data", issuer: "Oracle", year: "2025" },
  { id: "9", rank: 9, title: "Oracle AI Foundation Associate", imageUrl: "/certificates/Oracle_AI_Foundation_Associate.jpg", downloadUrl: "/certificates/Oracle_AI_Foundation_Associate.pdf", category: "AI & Data", issuer: "Oracle", year: "2024" },
  { id: "10", rank: 10, title: "Oracle Data Platform Foundations Associate", imageUrl: "/certificates/Oracle_Data_Platform_Foundations_Associate.jpg", downloadUrl: "/certificates/Oracle_Data_Platform_Foundations_Associate.pdf", category: "AI & Data", issuer: "Oracle", year: "2024" },
  { id: "24", rank: 11, title: "Data Engineering on AWS - Foundations", imageUrl: "/certificates/1788285095793_data_engineering_on_aws_foundations.jpg", downloadUrl: "/certificates/1788285101829_data_engineering_on_aws_foundations.pdf", category: "AWS Training", issuer: "AWS", year: "2026" },
  { id: "6", rank: 12, title: "Copado Certified AI", imageUrl: "/certificates/Copado_Certified_AI.jpg", downloadUrl: "/certificates/Copado_Certified_AI.jpg", category: "Cloud & DevOps", issuer: "Copado", year: "2025" },
  { id: "5", rank: 13, title: "AWS Summit – Certificate of Attendance", imageUrl: "/certificates/aws_summit_certificate.jpeg", downloadUrl: "/certificates/aws_summit_certificate.pdf", category: "Cloud & DevOps", issuer: "AWS", year: "2024" },
  { id: "14", rank: 14, title: "Japanese N5 Cleared – JLPT", imageUrl: "/certificates/JLPT_N5.jpg", downloadUrl: "/certificates/JLPT_N5.pdf", category: "Skills & Experience", issuer: "JLPT", year: "2024" },
  { id: "11", rank: 15, title: "Diploma in MySQL & Statistics for Data Analysis", imageUrl: "/certificates/Alison_Diploma_MySQL_Statistics_Data_Analysis.jpg", downloadUrl: "/certificates/Alison_Diploma_MySQL_Statistics_Data_Analysis.pdf", category: "AI & Data", issuer: "Alison", year: "2024" },
  { id: "12", rank: 16, title: "Data Science & AI/ML Internship", imageUrl: "/certificates/data_science_aiml_ybi.jpg", downloadUrl: "/certificates/data_science_aiml_ybi.pdf", category: "AI & Data", issuer: "YBI Foundation", year: "2024" },
  { id: "15", rank: 17, title: "Software Engineer Intern", imageUrl: "/certificates/software_engineer_intern_certificate.jpg", downloadUrl: "/certificates/software_engineer_intern_certificate.pdf", category: "Skills & Experience", issuer: "HackerRank", year: "2024" },
  { id: "21", rank: 18, title: "Certificate of Experience – YWS", imageUrl: "/certificates/YWSintership.jpg", downloadUrl: "/certificates/YWSintership.pdf", category: "Skills & Experience", issuer: "Young Web Solutions", year: "2025" },
  { id: "16", rank: 19, title: "Software Development Workshop", imageUrl: "/certificates/software_dev_workshop_crio.jpg", downloadUrl: "/certificates/software_dev_workshop_crio.pdf", category: "Skills & Experience", issuer: "Crio.do", year: "2024" },
  { id: "13", rank: 20, title: "Data Analytics Certificate", imageUrl: "/certificates/data_analytics_forage.jpg", downloadUrl: "/certificates/data_analytics_forage.pdf", category: "AI & Data", issuer: "Forage", year: "2024" },
  { id: "17", rank: 21, title: "Project Management Certificate", imageUrl: "/certificates/project_management_forage.jpg", downloadUrl: "/certificates/project_management_forage.pdf", category: "Skills & Experience", issuer: "Forage", year: "2024" },
  { id: "18", rank: 22, title: "C# Basics Certification", imageUrl: "/certificates/csharp_basic_hackerrank.jpg", downloadUrl: "/certificates/csharp_basic_hackerrank.pdf", category: "Skills & Experience", issuer: "HackerRank", year: "2024" },
  { id: "19", rank: 23, title: "CSS Certification", imageUrl: "/certificates/css_hackerrank.jpg", downloadUrl: "/certificates/css_hackerrank.pdf", category: "Skills & Experience", issuer: "HackerRank", year: "2024" },
  { id: "20", rank: 24, title: "WordPress Certificate", imageUrl: "/certificates/wordpress_udemy.jpg", downloadUrl: "/certificates/wordpress_udemy.pdf", category: "Skills & Experience", issuer: "Udemy", year: "2024" },
  { id: "22", rank: 25, title: "Employability Skills Program", imageUrl: "/certificates/employability_skill_rpg_zensar.jpeg", downloadUrl: "/certificates/employability_skill_rpg_zensar.pdf", category: "Skills & Experience", issuer: "RPG Foundation & Zensar", year: "2024" },
  { id: "23", rank: 26, title: "ServiceNow Micro-Certification", imageUrl: "/certificates/servicenow_micro.jpeg", downloadUrl: "/certificates/servicenow_micro.pdf", category: "Skills & Experience", issuer: "ServiceNow", year: "2024" },
];
