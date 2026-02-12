"use client";

import { useEffect, useState } from "react";

interface Snowflake {
  id: number;
  left: number;
  duration: number;
  delay: number;
  opacity: number;
}

export const SnowflakesAnimation = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const generatedSnowflakes: Snowflake[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.2,
    }));
    setSnowflakes(generatedSnowflakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <style>{`
        @keyframes snowfall {
          0% {
            transform: translateY(-100px) translateX(0deg);
          }
          100% {
            transform: translateY(100vh) translateX(100px);
          }
        }
        
        .snowflake {
          position: fixed;
          width: 3px;
          height: 3px;
          background: #e91e63;
          border-radius: 50%;
          animation: snowfall linear infinite;
          pointer-events: none;
          top: -100px;
        }
      `}</style>
      
      {snowflakes.map((snowflake) => (
        <div
          key={snowflake.id}
          className="snowflake"
          style={{
            left: `${snowflake.left}%`,
            opacity: snowflake.opacity,
            animationDuration: `${snowflake.duration}s`,
            animationDelay: `${snowflake.delay}s`,
          }}
        />
      ))}
    </div>
  );
};
