import React, { useState, ReactNode, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValue,
  useTransform,
} from "motion/react";
import {
  HelpCircle,
  MapPin,
  Clock,
  Heart,
  CheckCircle2,
  Flower2,
  Volume2,
  VolumeX,
  Sparkles,
} from "lucide-react";

import AdminPage from "./Admin";

export default function App() {
  if (window.location.pathname === '/admin') {
    return <AdminPage />;
  }

  const [hasStarted, setHasStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isOpened, setIsOpened] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const guestPrefix = searchParams.get('prefix');
  const guestName = searchParams.get('name');
  const hasGuestInfo = guestPrefix && guestName;

  const startExperience = () => {
    setHasStarted(true);
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
    if (audioRef.current && !isMuted) {
      audioRef.current.play().catch(console.error);
    }
  };

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    const updateSize = () => setIsSmallScreen(mediaQuery.matches);
    updateSize();
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateSize);
      return () => mediaQuery.removeEventListener("change", updateSize);
    }

    // iOS Safari < 14
    mediaQuery.addListener(updateSize);
    return () => mediaQuery.removeListener(updateSize);
  }, []);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setPrefersReducedMotion(motionQuery.matches);
    updateMotion();
    if (typeof motionQuery.addEventListener === "function") {
      motionQuery.addEventListener("change", updateMotion);
      return () => motionQuery.removeEventListener("change", updateMotion);
    }
    motionQuery.addListener(updateMotion);
    return () => motionQuery.removeListener(updateMotion);
  }, []);

  const isIOS =
    typeof navigator !== "undefined" &&
    (/iP(hone|od|ad)/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && (navigator as any).maxTouchPoints > 1));

  const reduceEffects = prefersReducedMotion || isIOS;

  const handleOpen = () => {
    setIsFlapOpen(true);
    setTimeout(() => {
      setIsOpened(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1200);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = isMuted;

    if (isMuted) {
      audio.pause();
      return;
    }

    const playPromise = audio.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        // iOS/Safari may block playback until a user gesture; the button tap will retry.
      });
    }
  }, [isMuted]);

  return (
    <div
      className="min-h-screen bg-paper text-zinc-800 selection:bg-sage/20 overflow-x-hidden relative"
    >
      <audio ref={audioRef} src="/Dekha Hazaro Dafaa  Rustom  Akshay Kumar & Ileana D'cruz  Arijit Singh , Palak M Jeet Gannguli.mp3" loop preload="auto" />

      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-sage origin-left z-[1000]" style={{ scaleX }} />

      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsMuted((m) => !m)}
        className="fixed bottom-6 right-6 z-[500] w-12 h-12 rounded-full bg-sage text-white shadow-2xl flex items-center justify-center backdrop-blur-md border border-white/20"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} className="animate-pulse" />}
      </motion.button>

      <AnimatePresence>
        {!isOpened && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.5 } }}
            className="fixed inset-0 z-[5000] bg-black flex items-center justify-center overflow-hidden"
          >
            <video
              ref={videoRef}
              src="/Live_video_intro_video_202606262116.mp4"
              muted
              playsInline
              onEnded={() => setIsOpened(true)}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${!hasStarted ? 'blur-[10px] opacity-50 scale-105' : 'blur-0 opacity-80 scale-100'}`}
            />
            
            <div className="absolute inset-0 bg-black/40 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full h-full">
              {!hasStarted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center"
                >
                  {hasGuestInfo && (
                    <div className="mb-12 md:mb-20 space-y-3 bg-black/30 px-8 py-6 rounded-2xl backdrop-blur-sm border border-white/20 shadow-2xl">
                      <p className="text-xs md:text-sm uppercase tracking-[0.4em] text-white/90 font-bold drop-shadow-md">
                        We cordially invite
                      </p>
                      <p className="serif italic text-3xl md:text-5xl text-white drop-shadow-xl font-medium">
                        {guestPrefix} {guestName}
                      </p>
                    </div>
                  )}
                  <h1 className="script text-5xl md:text-7xl text-white drop-shadow-md mb-8">
                    Ashwan & Shehara
                  </h1>
                  <button
                    onClick={startExperience}
                    className="px-8 py-3 rounded-full border border-white/50 text-white/90 text-[10px] md:text-xs uppercase tracking-widest backdrop-blur-md hover:bg-white/20 transition-all cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  >
                    View Invitation
                  </button>
                </motion.div>
              ) : (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5 }}
                    className="space-y-6"
                  >
                    <h1 className="script text-5xl md:text-7xl text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                      Ashwan & Shehara
                    </h1>
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/90 font-medium drop-shadow-md">
                      Welcome to our engagement
                    </p>
                  </motion.div>
                  
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 2 }}
                    onClick={() => setIsOpened(true)}
                    className="absolute bottom-12 md:bottom-20 px-8 py-3 rounded-full border border-white/30 text-white/90 text-[10px] md:text-xs uppercase tracking-widest backdrop-blur-md hover:bg-white/20 transition-all cursor-pointer"
                  >
                    Enter Invitation
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.main
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
        className="w-full flex flex-col relative z-10 min-h-screen bg-white"
      >
        <section className="w-full h-[100dvh] relative overflow-hidden flex items-center justify-center">
          <motion.img
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            src="/hero-bg.png"
            alt="Engagement Ceremony"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            className="relative z-10 text-center px-4"
          >
            <h1 className="script text-6xl md:text-8xl lg:text-9xl text-black drop-shadow-[0_4px_8px_rgba(255,255,255,0.5)]">
              Our Engagement Day
            </h1>
          </motion.div>
        </section>

        {/* Section 2: Save the Date */}
        <section className="w-full min-h-[100dvh] flex flex-col items-center justify-center pt-24 pb-32 md:py-20 px-4 md:px-12 relative overflow-hidden">
          <img src="/hero-bg.png" alt="Background" className="absolute inset-0 w-full h-full object-cover object-center z-0 pointer-events-none" />
          <div className="absolute inset-0 bg-white/20 pointer-events-none z-0" />
          
          <div className="flex flex-col items-center justify-center text-center w-full max-w-sm mx-auto relative z-10">
            <h2 className="script text-4xl md:text-7xl text-[#ad8b56] drop-shadow-sm mb-4 md:mb-6">
              Save the date
            </h2>
            <h3 className="serif text-lg md:text-2xl text-[#634e3a] font-bold mb-6 md:mb-10">
              Sunday 19th July, 2026
            </h3>

            <div className="w-full px-2 max-w-[260px] md:max-w-none mx-auto">
              <div className="grid grid-cols-7 gap-y-2 md:gap-y-4 gap-x-1 md:gap-x-2 text-xs md:text-lg font-bold text-[#634e3a] mb-3 md:mb-6">
                <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
              </div>
              <div className="grid grid-cols-7 gap-y-3 md:gap-y-6 gap-x-1 md:gap-x-2 text-xs md:text-base font-medium text-[#7a6452]">
                <span className="opacity-0">0</span>
                <span className="opacity-0">0</span>
                <span className="opacity-0">0</span>
                <span>1</span><span>2</span><span>3</span><span>4</span>
                <span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span>
                <span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span>
                
                <span className="relative flex items-center justify-center text-[#ad8b56] font-bold">
                  <span className="absolute inset-0 m-auto w-5 h-5 md:w-10 md:h-10 rounded-full border-2 border-[#ad8b56] shadow-sm" />
                  19
                </span>
                
                <span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span>
                <span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Couple Details */}
        <section className="w-full min-h-[100dvh] flex flex-col items-center justify-center pt-24 pb-32 md:py-20 px-4 md:px-12 relative overflow-hidden">
          <img src="/hero-bg.png" alt="Background" className="absolute inset-0 w-full h-full object-cover object-center z-0 pointer-events-none" />
          <div className="absolute inset-0 bg-white/40 pointer-events-none z-0" />
          <div className="relative z-10 w-full max-w-3xl flex flex-col items-center text-center space-y-6 md:space-y-12">
            <div className="flex flex-col items-center">
              <img src="/ChatGPT Image Jun 27, 2026, 01_56_48 AM.png" alt="Decoration" className="w-32 md:w-48 object-contain mb-4 drop-shadow-sm" />
              <p className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">
                "AND WE CREATED YOU IN PAIRS"
              </p>
            </div>

            <div className="flex flex-col items-center justify-center space-y-0">
              <div className="flex flex-col items-center justify-center space-y-0 -mb-1">
                <h3 className="script text-4xl md:text-7xl text-zinc-700 drop-shadow-sm leading-none">Ashwan</h3>
                <p className="text-[8px] md:text-xs uppercase tracking-[0.2em] text-zinc-500 font-medium leading-tight">Son of Salaldeen Sadiyan</p>
              </div>

              <div className="flex items-center justify-center gap-4 py-0 my-0">
                <div className="h-px w-12 md:w-24 bg-zinc-300" />
                <span className="serif italic text-2xl md:text-4xl text-zinc-400 leading-none">&amp;</span>
                <div className="h-px w-12 md:w-24 bg-zinc-300" />
              </div>

              <div className="flex flex-col items-center justify-center space-y-0 -mt-1">
                <h3 className="script text-4xl md:text-7xl text-zinc-700 drop-shadow-sm leading-none">Shehara</h3>
                <p className="text-[8px] md:text-xs uppercase tracking-[0.2em] text-zinc-500 font-medium leading-tight">Daughter of Tuan Sherif Omar</p>
              </div>
            </div>

            <p className="text-[9px] md:text-xs uppercase tracking-[0.3em] text-zinc-400 font-bold leading-relaxed max-w-md pt-4 md:pt-8">
              Request the pleasure of your company to celebrate their engagement
            </p>
          </div>
        </section>

        {/* Section 4: Event Logistics */}
        <section className="w-full min-h-[100dvh] flex flex-col items-center justify-center py-20 px-4 md:px-12 relative overflow-hidden">
          <img src="/hero-bg.png" alt="Background" className="absolute inset-0 w-full h-full object-cover object-center z-0 pointer-events-none" />
          <div className="absolute inset-0 bg-white/40 pointer-events-none z-0" />
          <div className="relative z-10 w-full max-w-2xl flex flex-col items-center text-center space-y-12">
            <div className="flex items-center gap-4 text-zinc-400 w-full max-w-md mx-auto">
              <div className="h-px flex-1 bg-zinc-200" />
              <Heart size={20} className="opacity-50" />
              <div className="h-px flex-1 bg-zinc-200" />
            </div>

            <div className="space-y-8">
              <div className="space-y-3">
                <p className="text-[10px] md:text-sm uppercase tracking-[0.4em] text-zinc-400 font-bold">When</p>
                <h4 className="serif text-3xl md:text-5xl text-zinc-700 font-medium">Sunday, 19 July 2026</h4>
                <p className="serif italic text-xl md:text-2xl text-zinc-500">7:00 PM to 11:00 PM</p>
              </div>

              <div className="space-y-3 pt-6">
                <p className="text-[10px] md:text-sm uppercase tracking-[0.4em] text-zinc-400 font-bold">Where</p>
                <h4 className="serif text-3xl md:text-5xl text-zinc-700 font-medium">The River Edge</h4>
                <p className="serif italic text-xl md:text-2xl text-zinc-500">Kaduwela</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-zinc-400 w-full max-w-md mx-auto pt-4">
              <div className="h-px flex-1 bg-zinc-200" />
              <Heart size={20} className="opacity-50" />
              <div className="h-px flex-1 bg-zinc-200" />
            </div>
          </div>
        </section>

        {/* Section 5: Footer */}
        <section className="w-full min-h-[100dvh] flex flex-col items-center justify-center py-20 px-4 border-t border-zinc-200 relative overflow-hidden">
          <img src="/hero-bg.png" alt="Background" className="absolute inset-0 w-full h-full object-cover object-center z-0 pointer-events-none" />
          <div className="absolute inset-0 bg-white/40 pointer-events-none z-0" />
          <footer className="relative z-10 text-center space-y-8 w-full max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-6 text-zinc-400">
              <div className="h-px w-16 bg-zinc-200" />
              <span className="text-[10px] md:text-xs uppercase tracking-[0.6em] font-bold">Est. 2026</span>
              <div className="h-px w-16 bg-zinc-200" />
            </div>

            <p className="serif italic text-zinc-500 text-lg md:text-xl leading-relaxed px-4 md:px-12 max-w-xl mx-auto">
              Come &amp; join us in celebrating this special day as we gather with love and joy! Your presence will make this moment even more memorable
            </p>

            <div className="flex justify-center pt-4">
              <img src="/ChatGPT Image Jun 27, 2026, 02_02_52 AM.png" alt="Decoration" className="w-48 md:w-64 object-contain drop-shadow-sm opacity-90" />
            </div>

            <p className="script text-4xl md:text-5xl text-zinc-600 mt-8">Ashwan &amp; Shehara</p>
          </footer>
        </section>
      </motion.main>

      {/* Heavy background motion removed for iOS stability */}
    </div>
  );
}