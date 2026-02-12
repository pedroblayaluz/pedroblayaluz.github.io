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
    }
    return "M 0,0";
  };

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      <svg
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
        }}
      >
        {clouds.map((cloud) => (
          <g
            key={cloud.id}
            id={`cloud-${cloud.id}`}
            style={{
              transform: `translateX(0) scale(${cloud.scale})`,
              transformOrigin: "0 0",
            }}
          >
            <path
              d={generateRandomPath(cloud.seed)}
              fill={`rgba(220, 210, 245, ${0.6 - cloud.scale * 0.2})`}
              style={{
                left: `${cloud.left}%`,
                top: `${cloud.top}%`,
              }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
};
