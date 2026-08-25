import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';

interface FieldNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  pulsePhase: number;
  pulseSpeed: number;
  accent: boolean;
}

const CONNECTION_DISTANCE = 130;
const CURSOR_RADIUS = 170;
const BRAND_RGB = '124, 58, 237';
const LEAF_RGB = '34, 197, 94';

/**
 * Abstract node field evoking distributed systems / neural nets — never a
 * literal brain icon. Deliberately slow and low-density (this is a texture
 * behind the Hero copy, not a foreground effect): capped node count, thin
 * low-alpha connections, drift speed an order of magnitude slower than a
 * typical particle-background library default.
 *
 * Perf discipline: rAF loop pauses via IntersectionObserver the instant the
 * section leaves the viewport or the tab is backgrounded, mouse tracking is
 * scoped to this section only (not `window`), and prefers-reduced-motion
 * gets a single static frame instead of the animation loop entirely.
 */
export function NeuralField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas?.closest('section');
    if (!canvas || !section) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let nodes: FieldNode[] = [];
    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let visible = true;
    const mouse = { x: -9999, y: -9999, active: false };

    const seedNodes = () => {
      const density = Math.round((width * height) / 26000);
      const count = Math.max(16, Math.min(density, 55));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        radius: Math.random() * 1.3 + 0.9,
        baseAlpha: Math.random() * 0.3 + 0.14,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.006 + Math.random() * 0.007,
        accent: Math.random() < 0.06,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedNodes();
      if (reduceMotion) drawStatic();
    };

    function drawConnections(cursorReactive: boolean) {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < CONNECTION_DISTANCE) {
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.strokeStyle = `rgba(${BRAND_RGB}, ${(1 - d / CONNECTION_DISTANCE) * 0.1})`;
            ctx!.lineWidth = 0.6;
            ctx!.stroke();
          }
        }
        if (cursorReactive && mouse.active) {
          const d = Math.hypot(nodes[i].x - mouse.x, nodes[i].y - mouse.y);
          if (d < CURSOR_RADIUS) {
            ctx!.beginPath();
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(mouse.x, mouse.y);
            ctx!.strokeStyle = `rgba(${BRAND_RGB}, ${(1 - d / CURSOR_RADIUS) * 0.16})`;
            ctx!.lineWidth = 0.7;
            ctx!.stroke();
          }
        }
      }
    }

    function drawStatic() {
      ctx!.clearRect(0, 0, width, height);
      for (const n of nodes) {
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${n.accent ? LEAF_RGB : BRAND_RGB}, ${n.baseAlpha * 0.6})`;
        ctx!.fill();
      }
      drawConnections(false);
    }

    const draw = () => {
      if (!visible) return;
      ctx.clearRect(0, 0, width, height);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
        n.pulsePhase += n.pulseSpeed;

        let alpha = n.baseAlpha * (0.7 + 0.3 * Math.sin(n.pulsePhase));
        let radius = n.radius;

        if (mouse.active) {
          const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
          if (d < CURSOR_RADIUS) {
            const t = 1 - d / CURSOR_RADIUS;
            alpha = Math.min(1, alpha + t * 0.5);
            radius = n.radius + t * 1.6;
          }
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${n.accent ? LEAF_RGB : BRAND_RGB}, ${alpha})`;
        ctx.fill();
      }

      drawConnections(true);
      raf = requestAnimationFrame(draw);
    };

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 150);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onMouseLeave = () => {
      mouse.active = false;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !reduceMotion) {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(draw);
        }
      },
      { threshold: 0.05 },
    );
    io.observe(section);

    const onVisibilityChange = () => {
      visible = visible && document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    resize();
    window.addEventListener('resize', onResize, { passive: true });

    if (!reduceMotion) {
      section.addEventListener('mousemove', onMouseMove, { passive: true });
      section.addEventListener('mouseleave', onMouseLeave, { passive: true });
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      section.removeEventListener('mousemove', onMouseMove);
      section.removeEventListener('mouseleave', onMouseLeave);
      io.disconnect();
    };
  }, [reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0', className)}
    />
  );
}
