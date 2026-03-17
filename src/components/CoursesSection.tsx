import { GraduationCap, Clock, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "./AnimatedSection";

const courses = [
  {
    id: "a1000000-0000-0000-0000-000000000001",
    name: "Diploma",
    branches: "CE, CSE, EE, ECE, ME",
    duration: "3 Years",
    seats: "150 Seats",
    description: "Foundation program in core engineering disciplines with practical training and industry exposure.",
  },
  {
    id: "a1000000-0000-0000-0000-000000000002",
    name: "B.Tech",
    branches: "CE, CSE, EE, ECE, ME",
    duration: "4 Years",
    seats: "270 Seats",
    description: "Comprehensive undergraduate engineering program affiliated to DCRUST, Murthal.",
  },
  {
    id: "a1000000-0000-0000-0000-000000000004",
    name: "BCA",
    branches: "COMPUTER APPLICATIONS",
    duration: "3 Years",
    seats: "120 Seats",
    description: "Bachelor program focusing on software development, web technologies and AWS Academy.",
  },
  {
    id: "a1000000-0000-0000-0000-000000000003",
    name: "M.Tech",
    branches: "CSE, EE, ECE",
    duration: "2 Years",
    seats: "51 Seats",
    description: "Advanced postgraduate program for specialized research and industry-ready expertise.",
  },
];

const CoursesSection = () => (
  <section id="courses" className="py-24 star-bg">
    <div className="max-w-7xl mx-auto px-6">
      <AnimatedSection className="text-center mb-4">
        <p className="section-label mb-4">PROGRAMS</p>
        <h2 className="section-title">
          Courses <span className="section-title-accent">Offered</span>
        </h2>
      </AnimatedSection>

      <AnimatedSection className="text-center mb-16">
        <p className="text-muted-foreground text-sm">Admissions Open for Academic Year 2026-2027</p>
      </AnimatedSection>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((c, i) => (
          <AnimatedSection key={c.name} delay={i * 0.1}>
            <div className="glass-card h-full flex flex-col group">
              <div className="w-12 h-12 rounded-lg bg-primary/15 flex items-center justify-center mb-5 group-hover:bg-primary/25 transition-colors">
                <GraduationCap size={22} className="text-primary" />
              </div>
              <h3 className="text-foreground text-xl font-bold font-display">{c.name}</h3>
              <p className="text-muted-foreground text-xs font-mono tracking-wider mt-1">{c.branches}</p>
              <p className="text-muted-foreground text-sm mt-3 mb-6 leading-relaxed flex-1">{c.description}</p>
              <div className="mt-auto space-y-2 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock size={14} className="text-primary" /> {c.duration}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users size={14} className="text-primary" /> {c.seats}
                </div>
                <Link to={`/course/${c.id}`} className="flex items-center gap-1 text-sm text-primary hover:underline mt-2">
                  View Branches <ArrowRight size={14} />
                </Link>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default CoursesSection;
