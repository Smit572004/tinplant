import { motion } from "framer-motion";
import { useParallax } from "@/hooks/useScrollAnimation";
import { ChevronDown } from "lucide-react";
import heroVideo from "@/assets/hero-video.mp4.asset.json";

const HeroSection = () => {
  const offset = useParallax();

  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      {/* Video background */}
      <div
        className="absolute inset-0"
        style={{ transform: `translateY(${offset * 0.15}px)` }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-110"
          poster=""
        >
          <source src={heroVideo.url} type="video/mp4" />
        </video>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0" style={{ background: "var(--hero-gradient)" }} />
      <div className="absolute inset-0 bg-background/50" />

      {/* Animated grain texture */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
      }} />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-block px-5 py-2 rounded-full border border-primary/40 text-primary text-sm font-body tracking-[0.25em] uppercase">
            Pflanzenvermehrung und Forschung seit 1992
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl md:text-7xl lg:text-9xl font-bold leading-[0.9] max-w-6xl"
          style={{ textShadow: "var(--text-shadow-hero)" }}
        >
          Reforestation{" "}
          <span className="text-gradient">Made Easier</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl font-body leading-relaxed"
        >
          Premium container seedlings for modern, climate-friendly forestry.
          Trusted by government forestry departments across Germany and beyond.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <a
            href="/services"
            className="px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-base hover:shadow-[var(--glow-green)] transition-all duration-300 hover:scale-105"
          >
            Explore Our Services
          </a>
          <a
            href="/about"
            className="px-8 py-3.5 rounded-full border border-foreground/20 text-foreground font-semibold text-base hover:border-primary hover:text-primary transition-all duration-300"
          >
            About TinPlant
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-10"
        >
          <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown className="text-primary" size={32} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
