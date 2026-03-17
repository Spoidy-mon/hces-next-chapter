import { Calendar } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const news = [
  { date: "MARCH 15, 2025", title: "Annual Tech Fest 2025", desc: "A celebration of innovation with coding contests, robotics, and more." },
  { date: "FEBRUARY 20, 2025", title: "Industry Expert Seminar", desc: "Leading engineers from top MNCs share insights on AI and ML." },
  { date: "JANUARY 10, 2025", title: "Sports Tournament", desc: "Inter-college championship featuring cricket, basketball, and athletics." },
  { date: "DECEMBER 5, 2024", title: "Hackathon 2024", desc: "48-hour coding marathon with prizes worth ₹1 Lakh." },
];

const NewsSection = () => (
  <section className="py-24 star-bg">
    <div className="max-w-7xl mx-auto px-6">
      <AnimatedSection className="text-center mb-16">
        <p className="section-label mb-4">STAY UPDATED</p>
        <h2 className="section-title">
          News & <span className="section-title-accent">Events</span>
        </h2>
      </AnimatedSection>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {news.map((n, i) => (
          <AnimatedSection key={i} delay={i * 0.1}>
            <div className="glass-card h-full">
              <div className="flex items-center gap-2 text-primary text-xs font-mono tracking-wider mb-4">
                <Calendar size={14} /> {n.date}
              </div>
              <h3 className="text-foreground font-bold text-lg mb-2">{n.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{n.desc}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default NewsSection;
