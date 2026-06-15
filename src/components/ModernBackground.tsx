import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const ModernBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 2000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 2000], [0, -200]);
  const y3 = useTransform(scrollY, [0, 2000], [0, 100]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Canvas animation for particles and grid
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      hue: number;
      trail: { x: number; y: number }[];
    }

    const particles: Particle[] = [];
    const particleCount = 60;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.4 + 0.2,
        hue: Math.random() * 40 + 180,
        trail: []
      });
    }

    const gridSize = 60;
    const gridOpacity = 0.03;

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid lines
      ctx.strokeStyle = `rgba(100, 200, 255, ${gridOpacity})`;
      ctx.lineWidth = 1;

      // Vertical lines with wave animation
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        for (let y = 0; y < canvas.height; y += 20) {
          const wave = Math.sin((y + time * 50) * 0.02) * 10;
          ctx.lineTo(x + wave, y);
        }
        ctx.stroke();
      }

      // Horizontal lines with wave animation
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        for (let x = 0; x < canvas.width; x += 20) {
          const wave = Math.cos((x + time * 50) * 0.02) * 10;
          ctx.lineTo(x, y + wave);
        }
        ctx.stroke();
      }

      // Draw particles
      particles.forEach((p) => {
        // Update position with mouse attraction
        const dx = mousePos.x - p.x;
        const dy = mousePos.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 300) {
          const force = (300 - distance) / 300;
          p.vx += (dx / distance) * force * 0.02;
          p.vy += (dy / distance) * force * 0.02;
        }

        // Add to trail
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 10) p.trail.shift();

        // Draw trail
        p.trail.forEach((pos, i) => {
          const trailOpacity = (i / p.trail.length) * p.opacity * 0.5;
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, p.size * (i / p.trail.length), 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 80%, 60%, ${trailOpacity})`;
          ctx.fill();
        });

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Add friction
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Boundary check
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw particle with glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 6);
        gradient.addColorStop(0, `hsla(${p.hue}, 80%, 70%, ${p.opacity})`);
        gradient.addColorStop(0.3, `hsla(${p.hue}, 70%, 50%, ${p.opacity * 0.5})`);
        gradient.addColorStop(1, `hsla(${p.hue}, 70%, 50%, 0)`);
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 6, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 80%, ${p.opacity})`;
        ctx.fill();
      });

      // Draw connections between particles
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const opacity = (1 - distance / 150) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `hsla(${p1.hue}, 70%, 60%, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [mousePos]);

  // Animated orb backgrounds
  const orbs = useMemo(() => [
    { color: 'from-cyan-500/20 to-blue-600/20', top: '-30%', left: '-20%', size: '80%', duration: 25, delay: 0 },
    { color: 'from-purple-500/20 to-pink-600/20', bottom: '-30%', right: '-20%', size: '90%', duration: 30, delay: 5 },
    { color: 'from-teal-400/15 to-cyan-500/15', top: '40%', left: '50%', size: '60%', duration: 35, delay: 10 },
  ], []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-50 overflow-hidden bg-[#0a0a0f]">
      {/* Animated orbs */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          style={{ y: i === 0 ? y1 : i === 1 ? y2 : y3 }}
          className={`absolute ${orb.top || ''} ${orb.bottom || ''} ${orb.left || ''} ${orb.right || ''} w-[${orb.size}] h-[${orb.size}]`}
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
            x: ['-10%', '10%', '-10%'],
            y: ['5%', '-5%', '5%'],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: orb.delay,
          }}
        >
          <div className={`w-full h-full bg-gradient-radial ${orb.color} rounded-full blur-[180px]`} />
        </motion.div>
      ))}

      {/* Canvas for particles and grid */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Mouse follower glow */}
      <motion.div
        animate={{
          x: mousePos.x - 300,
          y: mousePos.y - 300,
        }}
        transition={{ type: 'spring', damping: 50, stiffness: 100, mass: 1.5 }}
        className="absolute w-[600px] h-[600px] bg-gradient-radial from-cyan-400/[0.06] via-blue-500/[0.03] to-transparent rounded-full blur-[150px]"
      />

      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60" />

      {/* Edge glow lines */}
      <motion.div
        className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, delay: 2 }}
      />
      <motion.div
        className="absolute top-0 left-0 h-full w-[1px] bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-transparent via-purple-400/20 to-transparent"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, delay: 2.5 }}
      />
    </div>
  );
};

export default ModernBackground;
