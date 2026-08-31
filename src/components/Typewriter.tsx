'use client';

import { useEffect, useState } from 'react';

const ROLES = ['Software Engineer', 'Cloud Engineer', 'DevOps Engineer', 'Full Stack Developer'];

export default function Typewriter() {
  const [text, setText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIndex];
    let delay: number;
    if (!deleting) {
      delay = text.length === current.length ? 1800 : 70;
    } else {
      delay = 40;
    }
    const timer = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) {
          setTimeout(() => setDeleting(true), 1800);
        }
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === '') {
          setDeleting(false);
          setRoleIndex((r) => (r + 1) % ROLES.length);
        }
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [text, deleting, roleIndex]);

  return (
    <span className="relative">
      {text}
      <span className="inline-block w-[2px] h-[0.9em] bg-amber-400 ml-1 align-middle animate-pulse" />
    </span>
  );
}