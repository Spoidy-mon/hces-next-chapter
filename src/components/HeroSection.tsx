import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Phone, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  { src: "/images/campus-1.jpg", tagline: "Learning Today, Leading Tomorrow" },
  { src: "/images/campus-2.jpg", tagline: "We Raise Leaders for the Future" },
  { src: "/images/campus-3.jpg", tagline: "Stop Not, Till the Goal is Reached" },
  { src: "/images/campus-4.webp", tagline: "Life @ HCE Sonepat" },
  { src: "/images/campus-5.jpeg", tagline: "Vision is Everything" },
  { src: "/images/campus-6.webp", tagline: "The Future Awaits" },
  { src: "/images/campus-7.jpg", tagline: "Goals are Dreams with Deadlines" },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((p) => (p + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-28">
      {/* Background slideshow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].src}
            alt={slides[current].tagline}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/75" />
        </motion.div>
      </AnimatePresence>

      {/* Slide arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-background/40 backdrop-blur-sm border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-background/40 backdrop-blur-sm border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === current ? "bg-primary w-8" : "bg-foreground/30 hover:bg-foreground/50"
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <img src="/images/logo.png" alt="HCE Logo" className="w-16 h-16 md:w-20 md:h-20 object-contain" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-mono text-muted-foreground text-xs md:text-sm tracking-[0.4em] mb-6"
        >
          ESTABLISHED 1999 · SONEPAT, HARYANA
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-tight"
        >
          <span className="text-gradient-gold">HINDU COLLEGE</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mt-2"
        >
          OF ENGINEERING
        </motion.h2>

        <AnimatePresence mode="wait">
          <motion.p
            key={current}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="text-primary font-display text-lg md:text-2xl italic mt-6"
          >
            "{slides[current].tagline}"
          </motion.p>
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto mt-4 leading-relaxed"
        >
          Approved by AICTE · Affiliated to DCRUST, Murthal · Hindu Group of Institutions — 110+ Years of Academic Excellence
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
        >
          <a
            href="#contact"
            className="bg-primary text-primary-foreground px-8 py-4 rounded-md font-semibold text-base inline-flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
          >
            Apply Now <ArrowRight size={18} />
          </a>
          <a
            href="#about"
            className="border border-border text-foreground px-8 py-4 rounded-md font-semibold text-base inline-flex items-center justify-center hover:bg-secondary transition-colors"
          >
            Enquiry
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="flex items-center justify-center gap-2 mt-6 text-muted-foreground text-sm"
        >
          <Phone size={14} />
          <span className="font-mono">Admission Helpline: 0130-2212756</span>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
