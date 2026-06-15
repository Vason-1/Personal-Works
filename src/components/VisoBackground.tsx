import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const VisoBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 2000], [0, 150]);
  const y2 = useTransform(scrollY, [0, 2000], [0, -150]);
  const y3 = useTransform(scrollY, [0, 2000], [0, 100]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Canvas animation for particles, bubbles, and sparkles
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
      twinkleSpeed: number;
      twinklePhase: number;
    }

    interface Bubble {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
      hue: number;
      wobbleSpeed: number;
      wobblePhase: number;
    }

    const particles: Particle[] = [];
    const bubbles: Bubble[] = [];
    const particleCount = 100;
    const bubbleCount = 15;

    // Create particles (small sparkles)
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        hue: Math.random() * 60 + 180,
        twinkleSpeed: Math.random() * 0.05 + 0.02,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    // Create bubbles (larger orbs)
    for (let i = 0; i < bubbleCount; i++) {
      bubbles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.4 - 0.1,
        radius: Math.random() * 80 + 40,
        opacity: Math.random() * 0.15 + 0.05,
        hue: Math.random() * 120 + 160,
        wobbleSpeed: Math.random() * 0.02 + 0.01,
        wobblePhase: Math.random() * Math.PI * 2,
      });
    }

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles (star field)
      particles.forEach((p) => {
        // Mouse attraction
        const dx = mousePos.x - p.x;
        const dy = mousePos.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 400) {
          const force = (400 - distance) / 400;
          p.vx += (dx / distance) * force * 0.015;
          p.vy += (dy / distance) * force * 0.015;
        }

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Friction
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Boundary check
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Twinkle effect
        p.twinklePhase += p.twinkleSpeed;
        const twinkle = (Math.sin(p.twinklePhase) + 1) / 2;
        const currentOpacity = p.opacity * (0.5 + twinkle * 0.5);

        // Draw particle with glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 8);
        gradient.addColorStop(0, `hsla(${p.hue}, 80%, 80%, ${currentOpacity})`);
        gradient.addColorStop(0.3, `hsla(${p.hue}, 70%, 60%, ${currentOpacity * 0.5})`);
        gradient.addColorStop(1, `hsla(${p.hue}, 70%, 50%, 0)`);
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 8, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 90%, ${currentOpacity})`;
        ctx.fill();
      });

      // Draw bubbles (large orbs)
      bubbles.forEach((b) => {
        // Update position
        b.x += b.vx + Math.sin(time * b.wobbleSpeed + b.wobblePhase) * 0.5;
        b.y += b.vy;

        // Boundary check - float up and respawn
        if (b.y < -b.radius * 2) {
          b.y = canvas.height + b.radius;
          b.x = Math.random() * canvas.width;
        }
        if (b.x < -b.radius) b.x = canvas.width + b.radius;
        if (b.x > canvas.width + b.radius) b.x = -b.radius;

        // Draw bubble with gradient
        const gradient = ctx.createRadialGradient(
          b.x - b.radius * 0.3, 
          b.y - b.radius * 0.3, 
          0, 
          b.x, 
          b.y, 
          b.radius
        );
        gradient.addColorStop(0, `hsla(${b.hue}, 80%, 70%, ${b.opacity * 0.5})`);
        gradient.addColorStop(0.5, `hsla(${b.hue}, 70%, 50%, ${b.opacity * 0.3})`);
        gradient.addColorStop(1, `hsla(${b.hue}, 70%, 40%, 0)`);
        
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Add highlight reflection
        const highlightGradient = ctx.createRadialGradient(
          b.x - b.radius * 0.3, 
          b.y - b.radius * 0.3, 
          0, 
          b.x - b.radius * 0.3, 
          b.y - b.radius * 0.3, 
          b.radius * 0.4
        );
        highlightGradient.addColorStop(0, `rgba(255, 255, 255, ${b.opacity})`);
        highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.beginPath();
        ctx.arc(b.x - b.radius * 0.3, b.y - b.radius * 0.3, b.radius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = highlightGradient;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [mousePos]);

  // Animated background orbs
  const orbs = useMemo(() => [
    { color: 'from-cyan-400/15 to-blue-500/15', top: '-20%', left: '-15%', size: '70%', duration: 28, delay: 0 },
    { color: 'from-purple-500/15 to-pink-600/15', bottom: '-25%', right: '-10%', size: '85%', duration: 35, delay: 7 },
    { color: 'from-teal-400/10 to-cyan-500/10', top: '30%', right: '20%', size: '55%', duration: 42, delay: 14 },
    { color: 'from-violet-500/10 to-fuchsia-500/10', bottom: '20%', left: '30%', size: '65%', duration: 38, delay: 21 },
  ], []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-50 overflow-hidden bg-[#050508]">
      {/* Animated orbs */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          style={{ y: i === 0 ? y1 : i === 1 ? y2 : y3 }}
          className={`absolute ${orb.top || ''} ${orb.bottom || ''} ${orb.left || ''} ${orb.right || ''} w-[${orb.size}] h-[${orb.size}]`}
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, 360, 360],
            x: ['-5%', '10%', '-5%'],
            y: ['5%', '-10%', '5%'],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: orb.delay,
          }}
        >
          <div className={`w-full h-full bg-gradient-radial ${orb.color} rounded-full blur-[200px]`} />
        </motion.div>
      ))}

      {/* Canvas for particles and bubbles */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Mouse follower glow */}
      <motion.div
        animate={{
          x: mousePos.x - 350,
          y: mousePos.y - 350,
        }}
        transition={{ type: 'spring', damping: 70, stiffness: 150, mass: 1.5 }}
        className="absolute w-[700px] h-[700px] bg-gradient-radial from-cyan-300/[0.08] via-blue-400/[0.04] to-transparent rounded-full blur-[150px]"
      />

      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#030305]/60 to-black/80" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      {/* Edge glow lines */}
      <motion.div
        className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-400/20 to-transparent"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, delay: 2.5 }}
      />
    </div>
  );
};

export default VisoBackground;
