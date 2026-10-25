"use client";

import React, { useEffect, useRef } from "react";

export default function HeroGridAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Grid configuration (matching Framer interactive-pattern "Dots + Lines")
    const spacing = 36;
    const baseDotRadius = 1.35;
    const activeDotRadius = 3.2;
    const proximityRadius = 135;

    // Mouse coordinates (relative to canvas)
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      isHovered: false,
    };

    let time = 0;

    // Resize handler with high-DPI scaling
    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      width = Math.floor(rect.width);
      height = Math.floor(rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Mouse move listeners
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.isHovered = true;
    };

    const handleMouseLeave = () => {
      mouse.isHovered = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Render loop
    const render = () => {
      time += 0.022;

      // Smooth mouse interpolation
      if (mouse.isHovered) {
        mouse.x += (mouse.targetX - mouse.x) * 0.15;
        mouse.y += (mouse.targetY - mouse.y) * 0.15;
      } else {
        mouse.x = -1000;
        mouse.y = -1000;
      }

      ctx.clearRect(0, 0, width, height);

      // Autonomous ambient roving pulse for when mouse is idle
      const ambientX = width * 0.65 + Math.cos(time * 0.75) * (width * 0.28);
      const ambientY = height * 0.5 + Math.sin(time * 0.95) * (height * 0.32);
      const ambientRadius = 140;

      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;

      // ── 1. Draw Grid Lines (Horizontal & Vertical) ──────────
      ctx.lineWidth = 1;

      // Horizontal Lines
      for (let r = 0; r < rows; r++) {
        const y = r * spacing;

        for (let c = 0; c < cols - 1; c++) {
          const x1 = c * spacing;
          const x2 = (c + 1) * spacing;
          const midX = (x1 + x2) / 2;

          // Proximity to mouse
          const distMouse = Math.hypot(midX - mouse.x, y - mouse.y);
          const mouseGlow = mouse.isHovered ? Math.max(0, 1 - distMouse / proximityRadius) : 0;

          // Proximity to ambient light
          const distAmbient = Math.hypot(midX - ambientX, y - ambientY);
          const ambientGlow = Math.max(0, 1 - distAmbient / ambientRadius) * 0.45;

          const intensity = Math.min(1, mouseGlow * 1.2 + ambientGlow);

          // Alpha base + proximity highlight
          const alpha = 0.08 + intensity * 0.45;
          ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;

          ctx.beginPath();
          ctx.moveTo(x1, y);
          ctx.lineTo(x2, y);
          ctx.stroke();
        }
      }

      // Vertical Lines
      for (let c = 0; c < cols; c++) {
        const x = c * spacing;

        for (let r = 0; r < rows - 1; r++) {
          const y1 = r * spacing;
          const y2 = (r + 1) * spacing;
          const midY = (y1 + y2) / 2;

          // Proximity to mouse
          const distMouse = Math.hypot(x - mouse.x, midY - mouse.y);
          const mouseGlow = mouse.isHovered ? Math.max(0, 1 - distMouse / proximityRadius) : 0;

          // Proximity to ambient light
          const distAmbient = Math.hypot(x - ambientX, midY - ambientY);
          const ambientGlow = Math.max(0, 1 - distAmbient / ambientRadius) * 0.45;

          const intensity = Math.min(1, mouseGlow * 1.2 + ambientGlow);

          const alpha = 0.08 + intensity * 0.45;
          ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;

          ctx.beginPath();
          ctx.moveTo(x, y1);
          ctx.lineTo(x, y2);
          ctx.stroke();
        }
      }

      // ── 2. Draw Dots at Line Intersections ─────────────────
      for (let r = 0; r < rows; r++) {
        const y = r * spacing;

        for (let c = 0; c < cols; c++) {
          const x = c * spacing;

          // Calculate distance to mouse
          const distMouse = Math.hypot(x - mouse.x, y - mouse.y);
          const mouseGlow = mouse.isHovered ? Math.max(0, 1 - distMouse / proximityRadius) : 0;

          // Calculate distance to ambient wave
          const distAmbient = Math.hypot(x - ambientX, y - ambientY);
          const ambientGlow = Math.max(0, 1 - distAmbient / ambientRadius) * 0.5;

          const intensity = Math.min(1, mouseGlow * 1.35 + ambientGlow);

          // Dot size: expands near cursor
          const radius = baseDotRadius + intensity * (activeDotRadius - baseDotRadius);

          // Outer halo for illuminated dots
          if (intensity > 0.3) {
            ctx.beginPath();
            ctx.arc(x, y, radius * 2.8, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(16, 185, 129, ${intensity * 0.28})`;
            ctx.fill();
          }

          // Main Dot
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);

          if (intensity > 0.45) {
            // High glow: luminous emerald-cyan core
            ctx.fillStyle = `rgba(52, 211, 153, ${0.4 + intensity * 0.6})`;
          } else {
            // Ambient / baseline dot
            ctx.fillStyle = `rgba(16, 185, 129, ${0.22 + intensity * 0.5})`;
          }

          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[560px] h-[340px] sm:h-[400px] lg:h-[440px] flex items-center justify-center select-none cursor-crosshair overflow-hidden"
      style={{
        // Smooth fade-out towards the text on the left side, plus subtle soft edges top/bottom
        maskImage:
          "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 12%, rgba(0,0,0,0.85) 35%, black 85%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 12%, rgba(0,0,0,0.85) 35%, black 85%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
        maskComposite: "intersect",
        WebkitMaskComposite: "destination-in",
      }}
    >
      {/* ── Soft Ambient Radial Glow Behind the Pattern ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      {/* ── Interactive Canvas ────────────────────────── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />
    </div>
  );
}
