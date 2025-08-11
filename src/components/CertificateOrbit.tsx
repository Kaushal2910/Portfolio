"use client";

import React, { useEffect, useRef, useState } from "react";
import { certificates } from "@/data/certificates";
import CertificateCard from "./CertificateCard";

type Cert = {
  id: string;
  title: string;
  imageUrl: string;
  downloadUrl: string;
};

const TWO_PI = Math.PI * 2;

export default function CertificateOrbit() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const [angleOffset, setAngleOffset] = useState(0);
  const dragRef = useRef<{ dragging: boolean; startX: number; startAngle: number }>({
    dragging: false,
    startX: 0,
    startAngle: 0,
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false); // NEW pause state

  const count = certificates.length;
  const speedRef = useRef(0.000009);
  const radiusBase = 600; // unchanged

  // RAF loop with pause
  useEffect(() => {
    function loop(ts: number) {
      if (lastTimeRef.current == null) lastTimeRef.current = ts;
      const dt = ts - lastTimeRef.current;
      lastTimeRef.current = ts;

      if (!isPaused) {
        setAngleOffset((prev) => (prev + speedRef.current * dt) % TWO_PI);
      }

      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTimeRef.current = null;
    };
  }, [isPaused]);

  // active card calculation
  useEffect(() => {
    const frontAngle = (angleOffset % TWO_PI + TWO_PI) % TWO_PI;
    let bestIndex = 0;
    let bestDiff = Number.POSITIVE_INFINITY;
    for (let i = 0; i < count; i++) {
      const cardAngle = (i / count) * TWO_PI + frontAngle;
      let norm = ((cardAngle + Math.PI) % TWO_PI) - Math.PI;
      const diff = Math.abs(norm);
      if (diff < bestDiff) {
        bestDiff = diff;
        bestIndex = i;
      }
    }
    setActiveIndex(bestIndex);
  }, [angleOffset, count]);

  // Keyboard control
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        setIsPaused(e.type === "keydown");
      } else if (e.key === "ArrowLeft") {
        speedRef.current -= 0.0018;
        setTimeout(() => (speedRef.current += 0.0018), 180);
      } else if (e.key === "ArrowRight") {
        speedRef.current += 0.0018;
        setTimeout(() => (speedRef.current -= 0.0018), 180);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKey);
    };
  }, []);

  // Touch pause
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const onTouchStart = () => setIsPaused(true);
    const onTouchEnd = () => setIsPaused(false);

    el.addEventListener("touchstart", onTouchStart);
    el.addEventListener("touchend", onTouchEnd);

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  // Pointer drag
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const onPointerDown = (ev: PointerEvent) => {
      dragRef.current.dragging = true;
      dragRef.current.startX = ev.clientX;
      dragRef.current.startAngle = angleOffset;
      (ev.target as Element).setPointerCapture(ev.pointerId);
    };

    const onPointerMove = (ev: PointerEvent) => {
      if (!dragRef.current.dragging) return;
      const dx = ev.clientX - dragRef.current.startX;
      const width = el.clientWidth || window.innerWidth;
      const deltaAngle = (dx / width) * Math.PI;
      setAngleOffset(dragRef.current.startAngle - deltaAngle);
    };

    const onPointerUp = () => {
      dragRef.current.dragging = false;
    };

    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, [angleOffset]);

  function cardTransformStyle(i: number) {
    const angle = (i / count) * TWO_PI + angleOffset;
    const x = Math.cos(angle) * radiusBase;
    const y = Math.sin(angle) * (radiusBase * 0.18);
    const depthFactor = (Math.sin(angle) + 1) / 2;
    const zScale = 0.6 + depthFactor * 0.6;
    const translate = `translate(${x}px, ${y}px) scale(${zScale})`;
    const rotateY = (Math.cos(angle) * 20).toFixed(2);
    const zIndex = Math.round(depthFactor * 1000);
    const opacity = 0.35 + depthFactor * 0.65;
    return {
      transform: translate + ` rotateY(${rotateY}deg)`,
      zIndex,
      opacity,
    } as React.CSSProperties;
  }

  return (
    <div className="w-full flex items-center justify-center overflow-hidden">
      <div
        ref={wrapperRef}
        className="relative w-full max-w-6xl h-[500px] touch-none"
        style={{
          perspective: 1600,
          WebkitPerspective: 1600,
          overflow: "hidden",
        }}
      >
        {certificates.map((c: Cert, i: number) => {
          const style = cardTransformStyle(i);
          const isActive = i === activeIndex;
          return (
            <div
              key={c.id}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transformOrigin: "center center",
                transition:
                  "transform 260ms cubic-bezier(.2,.9,.2,1), box-shadow 260ms, opacity 260ms",
                ...style,
              }}
            >
              <div
                style={{
                  transform: isActive
                    ? "translate(-50%,-50%) scale(1.08)"
                    : "translate(-50%,-50%) scale(0.98)",
                  transition: "transform 300ms ease, box-shadow 300ms ease",
                  boxShadow: isActive
                    ? "0 18px 45px rgba(59,130,246,0.28), inset 0 1px 0 rgba(255,255,255,0.02)"
                    : "0 10px 25px rgba(0,0,0,0.35)",

                }}
              >
                <CertificateCard {...c}  />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
