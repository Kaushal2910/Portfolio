'use client';

import { motion } from 'framer-motion';
import { FiCloud, FiCode, FiServer, FiDatabase } from 'react-icons/fi';

const experiences = [
  {
    role: 'Associate DevOps Engineer',
    company: 'Thynk Technology India',
    duration: 'Sep 2025 – Mar 2026',
    description: 'Manage cloud resources on AWS, build CI/CD pipelines with Jenkins, containerize apps using Docker, deploy on AWS and Linux servers.',
    skills: ['Jenkins', 'Kubernetes', 'AWS', 'Docker', 'Linux', 'CI/CD'],
  },
  {
    role: 'Web Development Intern',
    company: 'Young Web Solutions',
    duration: 'Feb 2025 – Jul 2025',
    description: 'Developed 8+ client websites for UK/US markets using Wix Studio & WordPress, delivering responsive, SEO-friendly designs.',
    skills: ['WordPress', 'Wix Studio', 'Elementor', 'Divi', 'Web Design'],
  },
  {
    role: 'Internship Trainee (Cloud & Linux)',
    company: 'CodeZone',
    duration: 'Dec 2024 – Mar 2025',
    description: 'Gained hands-on experience with AWS (EC2, S3, IAM), Linux virtualization & networking.',
    skills: ['AWS', 'Linux', 'Cloud Computing', 'IAM'],
  },
  {
    role: 'Summer Intern (Data Science & AI/ML)',
    company: 'YBI Foundation',
    duration: 'Sep 2024 – Oct 2024',
    description: 'Processed large datasets using Pandas & NumPy, developed basic ML models, created visualizations.',
    skills: ['Python', 'Pandas', 'NumPy', 'Machine Learning', 'Matplotlib'],
  },
];

const skills = [
  { name: 'AWS', icon: FiCloud },
  { name: 'Docker', icon: FiServer },
  { name: 'React', icon: FiCode },
  { name: 'Node.js', icon: FiServer },
  { name: 'Python', icon: FiCode },
  { name: 'TypeScript', icon: FiCode },
  { name: 'Kubernetes', icon: FiCloud },
  { name: 'Jenkins', icon: FiServer },
  { name: 'Java', icon: FiCode },
  { name: 'Tailwind', icon: FiCode },
  { name: 'PostgreSQL', icon: FiDatabase },
  { name: 'Linux', icon: FiServer },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <section id="about" className="py-24 px-4 bg-black relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-white/60 font-mono text-sm mb-2">01.</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">About Me</h2>
        </motion.div>

        {/* Bio */}
        <motion.div
          className="max-w-3xl mx-auto mb-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-gray-400 text-lg leading-relaxed">
            DevOps &amp; Cloud Engineer from Pune, India, passionate about building scalable systems and intelligent applications.
            As an Associate DevOps Engineer at Thynk Technology, I specialize in cloud infrastructure, CI/CD pipelines,
            and full-stack development. I love solving complex problems and continuously learning new technologies.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-20"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              variants={item}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/[0.12] hover:bg-white/[0.03] transition-all duration-300 group"
            >
              <skill.icon className="text-2xl text-gray-500 group-hover:text-white/60 transition-colors" />
              <span className="text-xs text-gray-500 group-hover:text-white/60/80 transition-colors font-mono">{skill.name}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Experience Timeline */}
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl font-bold text-white mb-8 text-center">Experience</h3>
          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                className="relative pl-8 border-l border-white/10 hover:border-white/[0.12] transition-colors"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-white/60 -translate-x-[5px]" />
                <div className="flex flex-wrap items-baseline gap-2 mb-1">
                  <h4 className="text-white font-semibold">{exp.role}</h4>
                  <span className="text-white/60/70 text-sm font-mono">@ {exp.company}</span>
                </div>
                <p className="text-gray-500 text-sm font-mono mb-2">{exp.duration}</p>
                <p className="text-gray-400 text-sm mb-3">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <span key={skill} className="text-xs px-2 py-1 rounded bg-white/[0.05] text-white/60/80 font-mono">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}