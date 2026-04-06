import { motion } from "framer-motion";
import { useParallax } from "@/hooks/useScrollAnimation";
import { ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const offset = useParallax();

  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      {/* Parallax background */}
      <div
        className="absolute inset-0 scale-110"
        style={{ transform: `translateY(${offset * 0.3}px) scale(1.1)` }}
      >
        <img
          src={heroBg}
          alt="Reforestation field"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0" style={{ background: "var(--hero-gradient)" }} />
      <div className="absolute inset-0 bg-background/40" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/40 text-primary text-sm font-body tracking-widest uppercase">
            Since 1992
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight max-w-5xl"
          style={{ textShadow: "var(--text-shadow-hero)" }}
        >
          Reforestation{" "}
          <span className="text-gradient">Made Easier</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl font-body leading-relaxed"
        >
          Container seedlings for modern, climate-friendly forestry.
          Trusted by governments and forestry departments worldwide.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#services"
            className="px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-base hover:shadow-[var(--glow-green)] transition-all duration-300 hover:scale-105"
          >
            Explore Our Services
          </a>
          <a
            href="#about"
            className="px-8 py-3.5 rounded-full border border-foreground/20 text-foreground font-semibold text-base hover:border-primary hover:text-primary transition-all duration-300"
          >
            Learn More
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="text-primary" size={32} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
