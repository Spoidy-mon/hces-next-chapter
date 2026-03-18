import { useEffect, useRef } from "react";

const announcements = [
  "APPLICATION FOR THE POST OF PRINCIPAL — Click Here for Details",
  "Amazon Web Services Academy started in BCA Department @ HCE",
  "Availability of education loan under PM Vidyalaxmi scheme for meritorious students — visit pmvidyalaxmi.co.in",
  "Admissions Open for Academic Year 2026-2027 — Apply Now!",
  "ALUMNI ADVISORY BOARD @ HCE — Building bridges between campus and industry",
  "Workshop on Career Counseling @ HCE — Register Today",
];

const AnnouncementTicker = () => {
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = tickerRef.current;
    if (!el) return;

    let pos = 0;
    let animId: number;

    const animate = () => {
      pos -= 1;
      if (Math.abs(pos) >= el.scrollWidth / 2) pos = 0;
      el.style.transform = `translateX(${pos}px)`;
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    const pause = () => cancelAnimationFrame(animId);
    const resume = () => {
      animId = requestAnimationFrame(animate);
    };

    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);

    return () => {
      cancelAnimationFrame(animId);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
    };
  }, []);

  const allItems = [...announcements, ...announcements];

  return (
    <div className="fixed top-16 md:top-20 left-0 right-0 z-30 bg-primary/95 backdrop-blur-sm overflow-hidden">
      <div ref={tickerRef} className="flex whitespace-nowrap py-2">
        {allItems.map((text, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-8 text-primary-foreground text-xs md:text-sm font-medium"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground/60 shrink-0" />
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementTicker;
