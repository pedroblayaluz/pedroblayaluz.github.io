"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

interface Cloud {
  id: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
  scale: number;
  variant: number;
  seed: number;
}

export const CloudsAnimation = () => {
  const [clouds, setClouds] = useState<Cloud[]>([]);

  useEffect(() => {
    const generatedClouds: Cloud[] = Array.from({ length: 45 }, (_, i) => ({
      id: i,
      left: (i % 50) * 2.4 - 20,
      top: Math.random() * 100,
      duration: Math.random() * 60 + 100,
      delay: Math.random() * 15,
      scale: Math.random() * 0.9 + 0.4,
      variant: Math.floor(Math.random() * 4),
      seed: Math.random(),
    }));
    setClouds(generatedClouds);
  }, []);

  useEffect(() => {
    if (clouds.length === 0) return;

    const ctx = gsap.context(() => {
      clouds.forEach((cloud) => {
        const element = document.getElementById(`cloud-${cloud.id}`);
        if (element) {
          gsap.to(element, {
            x: window.innerWidth + 200,
            duration: cloud.duration,
            delay: cloud.delay,
            ease: "none",
            repeat: -1,
            onRepeat: () => {
              gsap.set(element, { x: -200 });
            },
          });

          gsap.to(element, {
            y: 50,
            duration: 6 + Math.random() * 4,
            delay: cloud.delay,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
          });
        }
      });
    });

    return () => ctx.revert();
  }, [clouds]);

  const generateRandomPath = (seed: number) => {
    const random = (offset: number) => {
      return Math.sin(seed * 12.9898 + offset * 78.233) * 0.5 + 0.5;
    };

    const cloudType = Math.floor(random(0) * 5);
    const variation = random(1);

    if (cloudType === 0) {
      const h1 = 15 + variation * 25;
      const h2 = 20 + random(3) * 30;
      const h3 = 10 + random(4) * 20;
      const y1 = Math.max(20, h1);
      const y2 = 65 - random(5) * 15;
      const y3 = Math.max(15, h2);
      const y4 = 62 - random(6) * 12;
      const y5 = Math.max(18, h3);
      const y6 = 64 - random(7) * 13;
      const y7 = Math.max(22, h1 - 5);
      const y8 = 66 - random(8) * 14;
      const y9 = Math.max(25, h2 - 10);
      return `M 40,70 Q 60,${y1},90,${y2} Q 110,${y3},140,${y4} Q 160,${y5},190,${y6} Q 220,${y7},250,${y8} Q 270,${y9},290,75 L 285,78 Q 250,82 210,83 Q 170,83 130,82 Q 90,82 50,78 Z`;
    } else if (cloudType === 1) {
      const peak1 = 25 + random(2) * 35;
      const peak2 = 20 + random(3) * 30;
      const y1 = Math.max(20, peak1);
      const y2 = 60 - random(4) * 10;
      const y3 = Math.max(18, peak2);
      const y4 = 58 - random(5) * 8;
      const y5 = Math.max(22, peak1 - 10);
      const y6 = 61 - random(6) * 9;
      const y7 = Math.max(20, peak2 - 5);
      const y8 = 64 - random(7) * 7;
      return `M 35,68 Q 55,${y1},85,${y2} Q 110,${y3},145,${y4} Q 175,${y5},210,${y6} Q 240,${y7},275,${y8} L 280,76 Q 240,80 190,81 Q 140,81 90,80 Q 50,79 35,75 Z`;
    } else if (cloudType === 2) {
      const bump1 = 30 + random(2) * 25;
      const bump2 = 25 + random(3) * 30;
      const bump3 = 28 + random(4) * 28;
      const y1 = Math.max(22, bump1);
      const y2 = 64 - random(5) * 12;
      const y3 = Math.max(20, bump2);
      const y4 = 62 - random(6) * 10;
      const y5 = Math.max(18, bump3);
      const y6 = 68 - random(7) * 8;
      return `M 50,72 Q 70,${y1},110,${y2} Q 140,${y3},180,${y4} Q 220,${y5},260,${y6} L 275,74 Q 245,79 195,80 Q 145,80 100,79 Q 60,78 50,75 Z`;
    } else if (cloudType === 3) {
      const c1y = 30 + random(2) * 25;
      const c2y = 22 + random(3) * 28;
      const y1 = Math.max(24, c1y);
      const y2 = 63 - random(4) * 11;
      const y3 = Math.max(20, c2y);
      const y4 = 61 - random(5) * 9;
      const y5 = Math.max(25, c1y - 8);
      const y6 = 65 - random(6) * 10;
      const y7 = Math.max(28, c2y - 5);
      return `M 45,70 Q 65,${y1},100,${y2} Q 130,${y3},170,${y4} Q 205,${y5},240,${y6} Q 265,${y7},285,72 L 280,77 Q 240,81 185,82 Q 130,82 80,81 Q 55,80 45,76 Z`;
    } else {
      const s1 = 20 + random(2) * 30;
      const s2 = 18 + random(3) * 32;
      const s3 = 22 + random(4) * 28;
      const y1 = Math.max(18, s1);
      const y2 = 62 - random(5) * 14;
      const y3 = Math.max(16, s2);
      const y4 = 60 - random(6) * 11;
      const y5 = Math.max(20, s3);
      const y6 = 64 - random(7) * 12;
      const y7 = Math.max(24, s1 - 5);
      const y8 = 68 - random(8) * 9;
      return `M 42,71 Q 62,${y1},95,${y2} Q 125,${y3},160,${y4} Q 190,${y5},225,${y6} Q 255,${y7},285,${y8} L 288,76 Q 250,81 200,83 Q 150,83 110,82 Q 70,81 42,77 Z`;
    }
  };

  const CloudShape = ({ id, seed }: { id: number; seed: number }) => {
    const r = 190 + Math.floor(seed * 65);
    const g = 130 + Math.floor(seed * 80);
    const b = 240 - Math.floor(seed * 35);

    return (
      <svg
        viewBox="0 0 300 90"
        className="w-full h-full"
        style={{
          filter: "drop-shadow(0 8px 18px rgba(168, 85, 247, 0.4))",
          overflow: "visible",
        }}
      >
        <defs>
          <radialGradient
            id={`cloud-grad-${id}`}
            cx={`${30 + seed * 25}%`}
            cy="25%"
          >
            <stop
              offset="0%"
              stopColor={`rgba(${Math.min(255, r + 50)}, ${Math.min(255, g + 50)}, 255, 0.96)`}
            />
            <stop
              offset="25%"
              stopColor={`rgba(${r + 20}, ${g + 20}, ${b + 10}, 0.92)`}
            />
            <stop offset="50%" stopColor={`rgba(${r}, ${g}, ${b}, 0.82)`} />
            <stop
              offset="75%"
              stopColor={`rgba(${r - 30}, ${g - 40}, ${b - 25}, 0.65)`}
            />
            <stop
              offset="100%"
              stopColor={`rgba(${r - 50}, ${g - 60}, ${b - 30}, 0.35)`}
            />
          </radialGradient>

          <filter id={`cloud-blur-${id}`}>
            <feGaussianBlur in="SourceGraphic" stdDeviation={2.2 + seed * 1.2} />
          </filter>
        </defs>

        <path
          d={generateRandomPath(seed)}
          fill={`url(#cloud-grad-${id})`}
          filter={`url(#cloud-blur-${id})`}
        />

        <ellipse
          cx={`${70 + seed * 40}`}
          cy="40"
          rx={`${60 + seed * 35}`}
          ry="28"
          fill="rgba(255, 255, 255, 0.25)"
          filter={`url(#cloud-blur-${id})`}
          opacity="0.55"
        />
        <ellipse
          cx={`${155 + seed * 45}`}
          cy="38"
          rx={`${55 + seed * 30}`}
          ry="25"
          fill="rgba(255, 255, 255, 0.2)"
          filter={`url(#cloud-blur-${id})`}
          opacity="0.45"
        />
        <ellipse
          cx={`${240 + seed * 25}`}
          cy="45"
          rx={`${45 + seed * 25}`}
          ry="22"
          fill="rgba(255, 255, 255, 0.15)"
          filter={`url(#cloud-blur-${id})`}
          opacity="0.35"
        />
      </svg>
    );
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          id={`cloud-${cloud.id}`}
          className="absolute"
          style={{
            left: `${cloud.left}%`,
            top: `${cloud.top}%`,
            width: "300px",
            height: "90px",
            transform: `scale(${cloud.scale})`,
          }}
        >
          <CloudShape id={cloud.id} seed={cloud.seed} />
        </div>
      ))}
    </div>
  );
};
