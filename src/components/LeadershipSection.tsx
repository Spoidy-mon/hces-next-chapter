import { Quote } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const leaders = [
  {
    quote:
      "Hindu College of Engineering is among the oldest institutions in Sonepat and Haryana as well offering excellence in management and IT education. Since the inception of H.C.E. our aim is to offer integral formation to the students whereby students are encouraged to nurture their intellectual, emotional, spiritual and social persona to evolve as well rounded human beings.",
    name: "Chairman",
    role: "CHAIRMAN'S MESSAGE",
    image: "/images/chairman.jpeg",
    align: "left" as const,
  },
  {
    quote:
      "Nowadays, in the world of competition, any institute shall have to excel with perfection to survive. Our objective is to impart education with creation, dissemination and application of knowledge in an integrated form. A regular student–faculty interaction helps in grooming the students into leaders and not simply the technocrats.",
    name: "Principal",
    role: "PRINCIPAL'S MESSAGE",
    image: null,
    align: "right" as const,
  },
];

const LeadershipSection = () => (
  <section className="py-24 star-bg">
    <div className="max-w-5xl mx-auto px-6">
      <AnimatedSection className="text-center mb-16">
        <p className="section-label mb-4">LEADERSHIP</p>
        <h2 className="section-title">
          Messages from <span className="section-title-accent">Our Leaders</span>
        </h2>
      </AnimatedSection>

      <div className="space-y-10">
        {leaders.map((l, i) => (
          <AnimatedSection key={i} delay={i * 0.15}>
            <div className="glass-card">
              <div className={`flex flex-col md:flex-row gap-6 ${l.align === "right" ? "md:flex-row-reverse" : ""} items-center`}>
                {l.image && (
                  <img
                    src={l.image}
                    alt={l.name}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-xl object-cover border-2 border-primary/30 shrink-0"
                    loading="lazy"
                  />
                )}
                <div className={`${l.align === "right" ? "text-right" : "text-left"} flex-1`}>
                  <div className={`w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-3 ${l.align === "right" ? "ml-auto" : ""}`}>
                    <Quote size={18} className="text-primary" />
                  </div>
                  <p className="text-muted-foreground italic leading-relaxed">"{l.quote}"</p>
                  <div className="mt-4">
                    <p className="text-foreground font-semibold">{l.name}</p>
                    <p className="text-primary text-xs font-mono tracking-widest">{l.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default LeadershipSection;
