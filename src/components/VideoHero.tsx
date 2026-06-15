import { motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

const VideoHero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { scrollY } = useScroll();
  
  const fadeOut = useTransform(scrollY, [0, 600], [0, 1]);
  const videoOpacity = useTransform(scrollY, [0, 400], [1, 0.8]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setIsLoaded(true);
      video.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log('Video autoplay blocked:', err);
        setIsPlaying(false);
      });
    };

    const handleError = () => {
      console.error('Video load error');
      setVideoError(true);
      setIsLoaded(true);
    };

    const handleCanPlay = () => {
      if (!isPlaying) {
        video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('error', handleError);
    video.addEventListener('canplay', handleCanPlay);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('error', handleError);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [isPlaying]);

  return (
    <div className="absolute inset-0 h-screen overflow-hidden z-[1]">
      {/* Progressive Loading Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/50 to-purple-900/30">
          <motion.div
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20"
          />
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent"
          />
        </div>
      )}
      
      {/* Video Container */}
      <motion.div 
        className="absolute inset-0"
        style={{ 
          opacity: videoOpacity,
        }}
      >
        {videoError ? (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900" />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%230a0a14'/%3E%3Cstop offset='50%25' style='stop-color:%231a1a2e'/%3E%3Cstop offset='100%25' style='stop-color:%2316213e'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23g)'/%3E%3C/svg%3E"
            className={`w-full h-full object-cover transition-opacity duration-700 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              objectPosition: '70% 50%',
              filter: 'contrast(1.02) brightness(0.88) saturate(1.05)',
              imageRendering: 'auto',
            }}
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
        )}
        
        {/* Video smoothing overlay - reduces pixelation artifacts */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.03) 100%)',
          }}
        />
        
        {/* Anti-aliasing edge blur */}
        <div className="absolute inset-0 pointer-events-none border-8 border-transparent rounded-[1px] shadow-[inset_0_0_60px_rgba(0,0,0,0.15)]" />
      </motion.div>

      {/* Top Gradient Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
      </div>

      {/* Glow Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            x: ['-5%', '5%', '-5%'],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[15%] left-[5%] w-[50%] h-[50%] bg-blue-500/12 rounded-full blur-[180px]"
        />
        <motion.div
          animate={{
            x: ['5%', '-5%', '5%'],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-[20%] right-[5%] w-[60%] h-[60%] bg-purple-500/10 rounded-full blur-[200px]"
        />
        <motion.div
          animate={{
            opacity: [0.2, 0.35, 0.2],
            y: ['0%', '20%', '0%'],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-[10%] left-[10%] w-[70%] h-[40%] bg-indigo-500/08 rounded-full blur-[250px]"
        />
      </div>

      {/* Bottom Fade Transition - Clean seamless gradient */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[600px] pointer-events-none"
        style={{ opacity: fadeOut }}
      >
        <div className="absolute inset-0" 
          style={{
            background: 'linear-gradient(to top, rgba(10, 10, 20, 0.95) 0%, rgba(10, 10, 20, 0.85) 20%, rgba(10, 10, 20, 0.7) 40%, rgba(10, 10, 20, 0.5) 60%, rgba(10, 10, 20, 0.3) 75%, rgba(10, 10, 20, 0.1) 90%, transparent 100%)'
          }}
        />
      </motion.div>

      {/* Subtle noise overlay for film grain effect - reduces digital look */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default VideoHero;
