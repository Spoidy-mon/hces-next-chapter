import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const StudentManager = () => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [search, setSearch] = useState("");

  const { data: courses } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data } = await supabase.from("courses").select("*").order("name");
      return data || [];
    },
  });

  const { data: branches } = useQuery({
    queryKey: ["branches", selectedCourse],
    queryFn: async () => {
      const { data } = await supabase.from("branches").select("*").eq("course_id", selectedCourse).order("name");
      return data || [];
    },
    enabled: !!selectedCourse,
  });

  const { data: years } = useQuery({
    queryKey: ["years"],
    queryFn: async () => {
      const { data } = await supabase.from("academic_years").select("*").order("year_number");
      return data || [];
    },
  });

  const { data: students } = useQuery({
    queryKey: ["students-all", selectedCourse, selectedBranch, selectedYear, search],
    queryFn: async () => {
      let query = supabase.from("students").select("*, courses(name), branches(name, code), academic_years(year_label)");
      if (selectedCourse) query = query.eq("course_id", selectedCourse);
      if (selectedBranch) query = query.eq("branch_id", selectedBranch);
      if (selectedYear) query = query.eq("year_id", selectedYear);
      if (search) query = query.or(`name.ilike.%${search}%,roll_number.ilike.%${search}%`);
      const { data } = await query.order("roll_number").limit(100);
      return data || [];
    },
  });

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground mb-6">Student Details</h2>

      {/* Filters */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <select value={selectedCourse} onChange={(e) => { setSelectedCourse(e.target.value); setSelectedBranch(""); }}
          className="bg-card border border-border rounded-md px-3 py-2 text-sm text-foreground">
          <option value="">All Courses</option>
          {courses?.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>

        <select value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)}
          className="bg-card border border-border rounded-md px-3 py-2 text-sm text-foreground" disabled={!selectedCourse}>
          <option value="">All Branches</option>
          {branches?.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>

        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}
          className="bg-card border border-border rounded-md px-3 py-2 text-sm text-foreground">
          <option value="">All Years</option>
          {years?.map((y) => <option key={y.id} value={y.id}>{y.year_label}</option>)}
        </select>

        <div className="relative">
          <Search size={16} className="absolute left-3 top-3 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name or roll no..." className="pl-10" />
        </div>
      </div>

      {/* Student table */}
      <div className="glass-card !p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-3 text-muted-foreground font-medium">#</th>
              <th className="text-left p-3 text-muted-foreground font-medium">Roll No</th>
              <th className="text-left p-3 text-muted-foreground font-medium">Name</th>
              <th className="text-left p-3 text-muted-foreground font-medium">Course</th>
              <th className="text-left p-3 text-muted-foreground font-medium">Branch</th>
              <th className="text-left p-3 text-muted-foreground font-medium">Year</th>
            </tr>
          </thead>
          <tbody>
            {students?.map((s, i) => (
              <tr key={s.id} className="border-b border-border/50 hover:bg-card/50">
                <td className="p-3 text-muted-foreground">{i + 1}</td>
                <td className="p-3 font-mono text-xs">{s.roll_number}</td>
                <td className="p-3 text-foreground">{s.name}</td>
                <td className="p-3 text-muted-foreground">{(s as any).courses?.name}</td>
                <td className="p-3 text-muted-foreground">{(s as any).branches?.name}</td>
                <td className="p-3 text-muted-foreground">{(s as any).academic_years?.year_label}</td>
              </tr>
            ))}
            {students?.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-muted-foreground">No students found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentManager;
