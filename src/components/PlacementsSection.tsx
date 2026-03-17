import { Briefcase, TrendingUp, IndianRupee } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const placementStats = [
  { icon: Briefcase, value: "500+", label: "STUDENTS PLACED" },
  { icon: TrendingUp, value: "85%", label: "PLACEMENT RATE" },
  { icon: IndianRupee, value: "8 LPA", label: "HIGHEST PACKAGE" },
];

const recruiters = [
  "TCS", "Infosys", "Wipro", "HCL", "Tech Mahindra", "Cognizant",
  "Capgemini", "Accenture", "IBM", "Dell", "Samsung", "LG",
];

const PlacementsSection = () => (
  <section id="placements" className="py-24 star-bg">
    <div className="max-w-7xl mx-auto px-6">
      <AnimatedSection className="text-center mb-16">
        <p className="section-label mb-4">CAREER LAUNCHPAD</p>
        <h2 className="section-title">
          Our <span className="section-title-accent">Placements</span>
        </h2>
      </AnimatedSection>

      <div className="grid sm:grid-cols-3 gap-6 mb-16">
        {placementStats.map((s, i) => (
          <AnimatedSection key={i} delay={i * 0.1}>
            <div className="glass-card text-center py-10">
              <s.icon size={32} className="text-primary mx-auto mb-4" />
              <p className="text-primary font-display text-4xl font-bold">{s.value}</p>
              <p className="text-muted-foreground text-xs font-mono tracking-widest mt-2">{s.label}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection>
        <div className="glass-card">
          <p className="text-center text-muted-foreground text-xs font-mono tracking-widest mb-8">OUR RECRUITERS</p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {recruiters.map((r) => (
              <div
                key={r}
                className="bg-secondary rounded-lg py-3 px-4 text-center text-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
              >
                {r}
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default PlacementsSection;
