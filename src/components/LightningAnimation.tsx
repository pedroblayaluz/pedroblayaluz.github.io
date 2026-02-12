"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

interface Lightning {
  id: number;
  strikeInterval: number;
}

// Generate jagged lightning path
const generateLightningPath = (
  startX: number,
  startY: number,
  targetX: number,
  targetY: number,
  points: number = 20
) => {
  let path = `M ${startX} ${startY}`;
  const deltaX = (targetX - startX) / points;
  const deltaY = (targetY - startY) / points;

  for (let i = 1; i <= points; i++) {
    const x = startX + deltaX * i + (Math.random() - 0.5) * 60;
    const y = startY + deltaY * i + (Math.random() - 0.5) * 20;
    path += ` L ${x} ${y}`;
  }

  return path;
};

// Generate branch from main bolt
const generateBranch = (
  fromX: number,
  fromY: number,
  direction: number
) => {
  const length = 150 + Math.random() * 150;
  const angle = direction + (Math.random() - 0.5) * 0.8;
  const endX = fromX + Math.cos(angle) * length;
  const endY = fromY + Math.sin(angle) * length;

  return generateLightningPath(fromX, fromY, endX, endY, 10);
};

export const LightningAnimation = () => {
  const [lightnings, setLightnings] = useState<Lightning[]>([]);
  const initRef = useRef(false);

  useEffect(() => {
    const generatedLightnings: Lightning[] = Array.from({ length: 2 }, (_, i) => ({
      id: i,
      strikeInterval: Math.random() * 20 + 15,
    }));
    setLightnings(generatedLightnings);
  }, []);

  useEffect(() => {
    if (lightnings.length === 0 || initRef.current) return;
    initRef.current = true;

    const timeouts: NodeJS.Timeout[] = [];
    const intervals: NodeJS.Timer[] = [];

    lightnings.forEach((lightning) => {
      const triggerStrike = () => {
        // Don't create lightning if page is not visible
        if (document.visibilityState !== 'visible') return;

        // Random position across the screen, from the very top
        const randomX = Math.random() * 0.8 + 0.1; // 10-90%
        const randomY = Math.random() * 0.08; // 0-8% (very top)

        // Create SVG container for this strike
        const svgContainer = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        svgContainer.setAttribute("viewBox", "0 0 1200 800");
        svgContainer.setAttribute("preserveAspectRatio", "none");
        svgContainer.style.position = "fixed";
        svgContainer.style.top = "0";
        svgContainer.style.left = "0";
        svgContainer.style.width = "100%";
        svgContainer.style.height = "100%";
        svgContainer.style.pointerEvents = "none";
        svgContainer.style.zIndex = "1";
        svgContainer.id = `lightning-container-${lightning.id}-${Date.now()}`;

        // Add defs
        const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");

        const filter1 = document.createElementNS("http://www.w3.org/2000/svg", "filter");
        filter1.id = `lightning-glow1-${Date.now()}`;
        filter1.setAttribute("x", "-50%");
        filter1.setAttribute("y", "-50%");
        filter1.setAttribute("width", "200%");
        filter1.setAttribute("height", "200%");

        const blur1 = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "feGaussianBlur"
        );
        blur1.setAttribute("stdDeviation", "2");
        blur1.setAttribute("result", "coloredBlur");

        const merge1 = document.createElementNS("http://www.w3.org/2000/svg", "feMerge");
        const node1 = document.createElementNS("http://www.w3.org/2000/svg", "feMergeNode");
        node1.setAttribute("in", "coloredBlur");
        const node2 = document.createElementNS("http://www.w3.org/2000/svg", "feMergeNode");
        node2.setAttribute("in", "SourceGraphic");

        merge1.appendChild(node1);
        merge1.appendChild(node2);
        filter1.appendChild(blur1);
        filter1.appendChild(merge1);

        const filter2 = document.createElementNS("http://www.w3.org/2000/svg", "filter");
        filter2.id = `lightning-glow2-${Date.now()}`;
        filter2.setAttribute("x", "-100%");
        filter2.setAttribute("y", "-100%");
        filter2.setAttribute("width", "300%");
        filter2.setAttribute("height", "300%");

        const blur2 = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "feGaussianBlur"
        );
        blur2.setAttribute("stdDeviation", "4");
        blur2.setAttribute("result", "coloredBlur");

        const merge2 = document.createElementNS("http://www.w3.org/2000/svg", "feMerge");
        const node3 = document.createElementNS("http://www.w3.org/2000/svg", "feMergeNode");
        node3.setAttribute("in", "coloredBlur");
        const node4 = document.createElementNS("http://www.w3.org/2000/svg", "feMergeNode");
        node4.setAttribute("in", "SourceGraphic");

        merge2.appendChild(node3);
        merge2.appendChild(node4);
        filter2.appendChild(blur2);
        filter2.appendChild(merge2);

        const gradient = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "linearGradient"
        );
        gradient.id = `bolt-gradient-${Date.now()}`;
        gradient.setAttribute("x1", "0%");
        gradient.setAttribute("y1", "0%");
        gradient.setAttribute("x2", "0%");
        gradient.setAttribute("y2", "100%");

        const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        stop1.setAttribute("offset", "0%");
        stop1.setAttribute("stopColor", "#c084fc");
        stop1.setAttribute("stopOpacity", "0.7");

        const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        stop2.setAttribute("offset", "30%");
        stop2.setAttribute("stopColor", "#ec4899");
        stop2.setAttribute("stopOpacity", "1");

        const stop3 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        stop3.setAttribute("offset", "70%");
        stop3.setAttribute("stopColor", "#db2777");
        stop3.setAttribute("stopOpacity", "1");

        const stop4 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        stop4.setAttribute("offset", "100%");
        stop2.setAttribute("stopColor", "#a855f7");
        stop2.setAttribute("stopOpacity", "0.1");

        gradient.appendChild(stop1);
        gradient.appendChild(stop2);
        gradient.appendChild(stop3);
        gradient.appendChild(stop4);

        defs.appendChild(filter1);
        defs.appendChild(filter2);
        defs.appendChild(gradient);
        svgContainer.appendChild(defs);

        // Create main bolt - longer, from very top to near mountains
        const startX = randomX * 1200;
        const startY = 0; // Start from absolute top
        const endX = startX + (Math.random() - 0.5) * 120;
        const endY = 700; // Hit closer to mountains

        const mainPath = generateLightningPath(startX, startY, endX, endY, 28);

        // Outer glow
        const outerBolt = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        outerBolt.setAttribute("d", mainPath);
        outerBolt.setAttribute("stroke", "rgba(236, 72, 153, 0.15)");
        outerBolt.setAttribute("strokeWidth", "8");
        outerBolt.setAttribute("fill", "none");
        outerBolt.setAttribute("filter", `url(#lightning-glow2-${Date.now()})`);
        outerBolt.style.mixBlendMode = "screen";
        svgContainer.appendChild(outerBolt);

        // Middle glow
        const middleBolt = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        middleBolt.setAttribute("d", mainPath);
        middleBolt.setAttribute("stroke", "rgba(168, 85, 247, 0.3)");
        middleBolt.setAttribute("strokeWidth", "3");
        middleBolt.setAttribute("fill", "none");
        middleBolt.setAttribute("filter", `url(#lightning-glow1-${Date.now()})`);
        middleBolt.style.mixBlendMode = "overlay";
        svgContainer.appendChild(middleBolt);

        // Main bolt
        const mainBolt = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        mainBolt.setAttribute("d", mainPath);
        mainBolt.setAttribute("stroke", `url(#bolt-gradient-${Date.now()})`);
        mainBolt.setAttribute("strokeWidth", "1.5");
        mainBolt.setAttribute("fill", "none");
        mainBolt.setAttribute("filter", `url(#lightning-glow1-${Date.now()})`);
        mainBolt.setAttribute("strokeLinecap", "round");
        mainBolt.setAttribute("strokeLinejoin", "round");
        mainBolt.style.mixBlendMode = "overlay";
        mainBolt.style.filter =
          "drop-shadow(0 0 6px rgba(168, 85, 247, 0.5))";
        svgContainer.appendChild(mainBolt);

        // Branches - multiple levels from top to bottom
        const branchCount = 6 + Math.random() * 5;
        for (let i = 0; i < branchCount; i++) {
          const branchPositionT = 0.2 + Math.random() * 0.7;
          const branchStartX =
            startX +
            (endX - startX) * branchPositionT +
            (Math.random() - 0.5) * 60;
          const branchStartY =
            startY +
            (endY - startY) * branchPositionT +
            (Math.random() - 0.5) * 40;
          const branchDirection = (Math.PI / 2) + (Math.random() - 0.5) * 1.4;

          const branchPath = generateBranch(
            branchStartX,
            branchStartY,
            branchDirection
          );

          const branch = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
          );
          branch.setAttribute("d", branchPath);
          branch.setAttribute("stroke", "rgba(168, 85, 247, 0.4)");
          branch.setAttribute("strokeWidth", "0.8");
          branch.setAttribute("fill", "none");
          branch.style.mixBlendMode = "overlay";
          svgContainer.appendChild(branch);

          // Sub-branches with more frequency
          if (Math.random() > 0.4) {
            const subBranchT = 0.3 + Math.random() * 0.6;
            const subBranchX =
              branchStartX +
              (Math.cos(branchDirection) * 150) * subBranchT +
              (Math.random() - 0.5) * 40;
            const subBranchY =
              branchStartY +
              (Math.sin(branchDirection) * 150) * subBranchT +
              (Math.random() - 0.5) * 30;

            const subBranchPath = generateBranch(
              subBranchX,
              subBranchY,
              branchDirection + (Math.random() - 0.5) * 1
            );

            const subBranch = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "path"
            );
            subBranch.setAttribute("d", subBranchPath);
            subBranch.setAttribute("stroke", "rgba(168, 85, 247, 0.2)");
            subBranch.setAttribute("strokeWidth", "0.5");
            subBranch.setAttribute("fill", "none");
            subBranch.style.mixBlendMode = "overlay";
            svgContainer.appendChild(subBranch);
          }
        }

        // Screen flash effect
        const flashDiv = document.createElement("div");
        flashDiv.style.position = "fixed";
        flashDiv.style.inset = "0";
        flashDiv.style.pointerEvents = "none";
        flashDiv.style.zIndex = "1";
        flashDiv.style.background = `radial-gradient(ellipse at ${randomX * 100}% ${randomY * 100}%, rgba(168, 85, 247, 0.2), transparent 60%)`;
        flashDiv.style.mixBlendMode = "overlay";

        // Add to DOM
        document.body.appendChild(svgContainer);
        document.body.appendChild(flashDiv);

        // Animate fade out and removal
        gsap.to([svgContainer, flashDiv], {
          opacity: 0,
          duration: 0.5,
          delay: 0.8,
          onComplete: () => {
            svgContainer.remove();
            flashDiv.remove();
          },
        });
      };

      // Initial delay, then recurring strikes
      const delayTimeout = setTimeout(() => {
        triggerStrike();

        const recurringInterval = setInterval(
          triggerStrike,
          lightning.strikeInterval * 1000
        );
        intervals.push(recurringInterval);
      }, Math.random() * 5000);

      timeouts.push(delayTimeout);
    });
  }, [lightnings]);

  return null;
};
