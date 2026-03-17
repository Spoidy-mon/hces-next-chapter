import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Clock, Users, GraduationCap, Building2 } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();

  const { data: course, isLoading: courseLoading } = useQuery({
    queryKey: ["course", courseId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("id", courseId!)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!courseId,
  });

  const { data: branches, isLoading: branchesLoading } = useQuery({
    queryKey: ["branches", courseId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("branches")
        .select("*")
        .eq("course_id", courseId!)
        .order("name");
      if (error) throw error;
      return data;
    },
    enabled: !!courseId,
  });

  const isLoading = courseLoading || branchesLoading;

  const branchIcons: Record<string, string> = {
    CE: "🏗️",
    CSE: "💻",
    EE: "⚡",
    ECE: "📡",
    ME: "⚙️",
    CA: "🖥️",
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Course not found</p>
        <Link to="/" className="text-primary hover:underline">← Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-16 star-bg">
        <div className="max-w-7xl mx-auto px-6">
          <Link to="/#courses" className="inline-flex items-center gap-2 text-primary hover:underline text-sm mb-8">
            <ArrowLeft size={16} /> Back to Courses
          </Link>
          
          <AnimatedSection>
            <p className="section-label mb-4">PROGRAM DETAILS</p>
            <h1 className="section-title mb-4">
              {course.name} <span className="section-title-accent">Program</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">{course.description}</p>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="mt-8 flex flex-wrap gap-6">
            <div className="glass-card flex items-center gap-3 !p-4">
              <Clock size={20} className="text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Duration</p>
                <p className="text-foreground font-semibold">{course.duration}</p>
              </div>
            </div>
            <div className="glass-card flex items-center gap-3 !p-4">
              <Users size={20} className="text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Total Seats</p>
                <p className="text-foreground font-semibold">{course.total_seats}</p>
              </div>
            </div>
            <div className="glass-card flex items-center gap-3 !p-4">
              <Building2 size={20} className="text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Affiliation</p>
                <p className="text-foreground font-semibold">{course.affiliation}</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Branches */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-12">
            <p className="section-label mb-4">SPECIALIZATIONS</p>
            <h2 className="section-title">
              Available <span className="section-title-accent">Branches</span>
            </h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {branches?.map((branch, i) => (
              <AnimatedSection key={branch.id} delay={i * 0.1}>
                <div className="glass-card h-full flex flex-col group hover:scale-[1.02] transition-transform duration-300">
                  <div className="text-4xl mb-4">{branchIcons[branch.code] || "📚"}</div>
                  <h3 className="text-foreground text-xl font-bold font-display">{branch.name}</h3>
                  <p className="text-primary text-xs font-mono tracking-wider mt-1">{branch.code}</p>
                  <p className="text-muted-foreground text-sm mt-3 mb-6 leading-relaxed flex-1">
                    {branch.description}
                  </p>
                  <div className="mt-auto pt-4 border-t border-border flex items-center gap-2 text-sm text-muted-foreground">
                    <GraduationCap size={14} className="text-primary" />
                    {branch.seats} Seats
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CourseDetail;
