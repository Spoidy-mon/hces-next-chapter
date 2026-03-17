import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center star-bg overflow-hidden">
      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.08)_0%,_transparent_70%)]" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-mono text-muted-foreground text-xs md:text-sm tracking-[0.4em] mb-8"
        >
          ESTABLISHED 1996 · SONEPAT, HARYANA
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="font-display text-6xl md:text-8xl lg:text-9xl font-black tracking-tight"
        >
          <span className="text-gradient-gold">ENGINEERING</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mt-2"
        >
          THE INFINITE.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mt-8 leading-relaxed"
        >
          Hindu College of Engineering, Sonepat — where rigorous logic meets
          limitless ambition. Join the next generation of architects, coders, and
          visionaries.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
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
          className="flex items-center justify-center gap-2 mt-8 text-muted-foreground text-sm"
        >
          <Phone size={14} />
          <span className="font-mono">Admission Helpline: +91-130-2484XXX</span>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
