import { Quote } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const leaders = [
  {
    quote: "At HCE, we believe in nurturing not just engineers, but leaders who will shape the future. Our commitment to excellence in education and holistic development remains unwavering.",
    name: "Sh. Mahender Pratap Singh",
    role: "CHAIRMAN",
    align: "left" as const,
  },
  {
    quote: "We strive to create an environment where innovation thrives. Our students are equipped with cutting-edge knowledge and the confidence to tackle real-world challenges head-on.",
    name: "Dr. Rajesh Kumar",
    role: "PRINCIPAL",
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
              <div className={`flex flex-col ${l.align === "right" ? "items-end text-right" : "items-start text-left"} gap-4`}>
                {l.align === "left" && (
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Quote size={20} className="text-primary" />
                  </div>
                )}
                <p className="text-muted-foreground italic leading-relaxed max-w-3xl">"{l.quote}"</p>
                {l.align === "right" && (
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Quote size={20} className="text-primary" />
                  </div>
                )}
                <div>
                  <p className="text-foreground font-semibold">{l.name}</p>
                  <p className="text-primary text-xs font-mono tracking-widest">{l.role}</p>
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
