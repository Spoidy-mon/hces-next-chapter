import { GraduationCap, Clock, Users } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const courses = [
  { name: "Diploma", branches: "CSE, ME, CE, EE", duration: "3 Years", seats: "240 Seats" },
  { name: "B.Tech", branches: "CSE, ME, CE, ECE", duration: "4 Years", seats: "480 Seats" },
  { name: "BCA", branches: "COMPUTER APPLICATIONS", duration: "3 Years", seats: "120 Seats" },
  { name: "M.Tech", branches: "CSE, ME", duration: "2 Years", seats: "60 Seats" },
];

const CoursesSection = () => (
  <section id="courses" className="py-24 star-bg">
    <div className="max-w-7xl mx-auto px-6">
      <AnimatedSection className="text-center mb-16">
        <p className="section-label mb-4">PROGRAMS</p>
        <h2 className="section-title">
          Courses <span className="section-title-accent">Offered</span>
        </h2>
      </AnimatedSection>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((c, i) => (
          <AnimatedSection key={c.name} delay={i * 0.1}>
            <div className="glass-card h-full flex flex-col">
              <div className="w-12 h-12 rounded-lg bg-primary/15 flex items-center justify-center mb-5">
                <GraduationCap size={22} className="text-primary" />
              </div>
              <h3 className="text-foreground text-xl font-bold font-display">{c.name}</h3>
              <p className="text-muted-foreground text-xs font-mono tracking-wider mt-1 mb-6">{c.branches}</p>
              <div className="mt-auto space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock size={14} className="text-primary" /> {c.duration}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users size={14} className="text-primary" /> {c.seats}
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default CoursesSection;
