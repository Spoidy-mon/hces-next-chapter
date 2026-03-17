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
        <div className="rounded-xl overflow-hidden border border-border">
          <img
            src="/images/about.jpg"
            alt="HCE Campus"
            className="w-full h-auto object-cover aspect-[4/5]"
            loading="lazy"
          />
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
            The Hindu College of Engineering came into existence in 1999. The Institute is duly
            approved by AICTE and is affiliated to Deenbandhu Chhotu Ram University of Science &
            Technology, Murthal, Sonepat. Under the aegis of the Sonepat Hindu Educational and
            Charitable Society, HCE has been a beacon of technical education in Haryana for over
            two decades.
          </p>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            Our aim is to offer integral formation to students whereby they are encouraged to
            nurture their intellectual, emotional, spiritual and social persona to evolve as well
            rounded human beings. The guiding philosophy has been to create knowledge.
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
