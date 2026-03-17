import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const images = [
  { src: "/images/campus-1.jpg", alt: "Campus Life" },
  { src: "/images/campus-2.jpg", alt: "Leaders at HCE" },
  { src: "/images/campus-3.jpg", alt: "Events" },
  { src: "/images/campus-5.jpeg", alt: "Vision" },
  { src: "/images/campus-6.webp", alt: "Future" },
  { src: "/images/campus-7.jpg", alt: "Goals" },
];

// Duplicate for infinite scroll effect
const allImages = [...images, ...images];

const CampusGallery = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animId: number;
    let pos = 0;
    const speed = 0.5;

    const animate = () => {
      pos += speed;
      if (pos >= el.scrollWidth / 2) pos = 0;
      el.scrollLeft = pos;
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    const pause = () => cancelAnimationFrame(animId);
    const resume = () => { animId = requestAnimationFrame(animate); };

    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);

    return () => {
      cancelAnimationFrame(animId);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
    };
  }, []);

  return (
    <section className="py-24 star-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <AnimatedSection className="text-center">
          <p className="section-label mb-4">CAMPUS LIFE</p>
          <h2 className="section-title">
            Life @ <span className="section-title-accent">HCE</span>
          </h2>
        </AnimatedSection>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-hidden cursor-grab"
        style={{ scrollbarWidth: "none" }}
      >
        {allImages.map((img, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, y: -8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="shrink-0 w-72 h-48 md:w-96 md:h-64 rounded-xl overflow-hidden border border-border"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CampusGallery;
