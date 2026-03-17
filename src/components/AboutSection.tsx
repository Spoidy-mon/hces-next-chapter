import AnimatedSection from "./AnimatedSection";

const stats = [
  { value: "25+", label: "YEARS" },
  { value: "75+", label: "FACULTY" },
  { value: "1000+", label: "STUDENTS" },
  { value: "5000+", label: "ALUMNI" },
];

const AboutSection = () => (
  <section id="about" className="py-24 star-bg">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
      <AnimatedSection>
        <div className="glass-card aspect-[4/5] flex items-center justify-center relative overflow-hidden">
          <div className="absolute w-48 h-48 border border-primary/40 rounded-full top-1/4 left-1/4" />
          <div className="absolute w-32 h-32 border border-muted-foreground/20 rounded-full bottom-1/3 left-1/3" />
          <p className="text-muted-foreground text-sm font-mono">Campus Image</p>
        </div>
      </AnimatedSection>

      <div>
        <AnimatedSection>
          <p className="section-label mb-4">ABOUT US</p>
          <h2 className="section-title">
            A Legacy of <span className="section-title-accent">Excellence</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <p className="text-muted-foreground mt-6 leading-relaxed">
            Hindu College of Engineering (HCE), Sonepat was established in 1996 under the aegis
            of Hindu Educational Society. Affiliated to Maharshi Dayanand University, Rohtak, HCE
            has been a beacon of technical education in Haryana for over two decades.
          </p>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            Our mission is to provide quality education that empowers students to become
            innovative engineers and responsible citizens, contributing to the nation's
            technological and social development.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <div className="grid grid-cols-4 gap-4 mt-10">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-primary font-display text-3xl md:text-4xl font-bold">{s.value}</p>
                <p className="text-muted-foreground text-xs font-mono tracking-widest mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  </section>
);

export default AboutSection;
