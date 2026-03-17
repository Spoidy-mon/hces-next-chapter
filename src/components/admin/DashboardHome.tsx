import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Users, GraduationCap, BookOpen, ClipboardCheck } from "lucide-react";

const DashboardHome = () => {
  const { data: studentCount } = useQuery({
    queryKey: ["student-count"],
    queryFn: async () => {
      const { count } = await supabase.from("students").select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const { data: courseCount } = useQuery({
    queryKey: ["course-count"],
    queryFn: async () => {
      const { count } = await supabase.from("courses").select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const { data: subjectCount } = useQuery({
    queryKey: ["subject-count"],
    queryFn: async () => {
      const { count } = await supabase.from("subjects").select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const { data: attendanceCount } = useQuery({
    queryKey: ["attendance-count"],
    queryFn: async () => {
      const { count } = await supabase.from("attendance").select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const stats = [
    { label: "Total Students", value: studentCount ?? 0, icon: Users, color: "text-primary" },
    { label: "Courses", value: courseCount ?? 0, icon: GraduationCap, color: "text-green-400" },
    { label: "Subjects", value: subjectCount ?? 0, icon: BookOpen, color: "text-blue-400" },
    { label: "Attendance Records", value: attendanceCount ?? 0, icon: ClipboardCheck, color: "text-purple-400" },
  ];

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground mb-6">Dashboard Overview</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="glass-card flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-card flex items-center justify-center">
              <s.icon size={24} className={s.color} />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
