import {
  Award, BookOpen, Trophy, Monitor, Library, UsersRound,
  Wifi, FlaskConical, Shield, Globe, Target, Sparkles,
} from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const features = [
  { icon: Award, label: "AICTE Approved" },
  { icon: BookOpen, label: "MDU Affiliated" },
  { icon: Trophy, label: "Top Placements" },
  { icon: Monitor, label: "Smart Classrooms" },
  { icon: Library, label: "Digital Library" },
  { icon: UsersRound, label: "Expert Faculty" },
  { icon: Wifi, label: "Wi-Fi Campus" },
  { icon: FlaskConical, label: "Modern Labs" },
  { icon: Shield, label: "Safe Campus" },
  { icon: Globe, label: "Industry Tie-ups" },
  { icon: Target, label: "Skill Development" },
  { icon: Sparkles, label: "Cultural Events" },
];

const WhyHCESection = () => (
  <section id="why-hce" className="py-24 star-bg">
    <div className="max-w-7xl mx-auto px-6">
      <AnimatedSection className="text-center mb-16">
        <p className="section-label mb-4">OUR STRENGTHS</p>
        <h2 className="section-title">
          Why <span className="section-title-accent">HCE?</span>
        </h2>
      </AnimatedSection>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {features.map((f, i) => (
          <AnimatedSection key={f.label} delay={i * 0.04}>
            <div className="glass-card text-center py-8">
              <f.icon size={28} className="text-primary mx-auto mb-3" />
              <p className="text-foreground text-sm font-medium">{f.label}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default WhyHCESection;
