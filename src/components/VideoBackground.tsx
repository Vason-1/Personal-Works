import { motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

const VideoBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  const { scrollY } = useScroll();
  
  // Parallax effect for the video background
  const videoScale = useTransform(scrollY, [0, 1000], [1, 1.2]);
  const videoOpacity = useTransform(scrollY, [0, 500], [0.4, 0.2]);

  useEffect(() => {
    // Play the video when component mounts
    if (videoRef.current) {
      videoRef.current.load(); // Explicitly load the video
      videoRef.current.play().catch(err => {
        console.log('Video autoplay blocked:', err);
        setVideoError(true);
      });
    }
  }, []);

  const handleVideoError = (e: any) => {
    console.log('Video loading failed:', e);
    console.log('Video error code:', e.target?.error?.code);
    setVideoError(true);
  };

  return (
    <div className="fixed inset-0 pointer-events-none -z-40 overflow-hidden">
      {/* Video Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ scale: videoScale }}
      >
        {videoError ? (
          <div 
            className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900"
            style={{
              filter: 'contrast(1.25) brightness(1.1)',
            }}
          />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              objectPosition: '70% 50%',
              filter: 'contrast(1.25) brightness(1.1)',
            }}
            onError={handleVideoError}
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
        )}
      </motion.div>

      {/* Dark Overlay */}
      <motion.div 
        className="absolute inset-0"
        style={{ opacity: videoOpacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
      </motion.div>

      {/* Additional Glow Effects */}
      <div className="absolute inset-0">
        {/* Left Glow */}
        <motion.div
          animate={{
            x: ['-10%', '10%', '-10%'],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-[20%] left-[10%] w-[40%] h-[40%] bg-blue-500/05 rounded-full blur-[120px]"
        />

        {/* Right Glow */}
        <motion.div
          animate={{
            x: ['10%', '-10%', '10%'],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute bottom-[10%] right-[10%] w-[50%] h-[50%] bg-purple-500/05 rounded-full blur-[150px]"
        />

        {/* Center Glow */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-cyan-500/02 rounded-full blur-[180px]"
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay">
        <svg className="w-full h-full">
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="4"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>
    </div>
  );
};

export default VideoBackground;
