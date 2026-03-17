import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Check, X, Clock } from "lucide-react";

const AttendanceManager = () => {
  const queryClient = useQueryClient();
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [attendanceState, setAttendanceState] = useState<Record<string, string>>({});

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

  const { data: subjects } = useQuery({
    queryKey: ["subjects", selectedCourse, selectedBranch, selectedYear],
    queryFn: async () => {
      const { data } = await supabase.from("subjects").select("*")
        .eq("course_id", selectedCourse)
        .eq("branch_id", selectedBranch)
        .eq("year_id", selectedYear);
      return data || [];
    },
    enabled: !!selectedCourse && !!selectedBranch && !!selectedYear,
  });

  const { data: students } = useQuery({
    queryKey: ["students", selectedCourse, selectedBranch, selectedYear],
    queryFn: async () => {
      const { data } = await supabase.from("students").select("*")
        .eq("course_id", selectedCourse)
        .eq("branch_id", selectedBranch)
        .eq("year_id", selectedYear)
        .order("roll_number");
      return data || [];
    },
    enabled: !!selectedCourse && !!selectedBranch && !!selectedYear,
  });

  // Load existing attendance for selected date/subject
  const { data: existingAttendance } = useQuery({
    queryKey: ["attendance", selectedSubject, selectedDate],
    queryFn: async () => {
      const { data } = await supabase.from("attendance").select("*")
        .eq("subject_id", selectedSubject)
        .eq("date", selectedDate);
      return data || [];
    },
    enabled: !!selectedSubject && !!selectedDate,
  });

  // Initialize attendance state from existing records
  const getStatus = (studentId: string) => {
    if (attendanceState[studentId]) return attendanceState[studentId];
    const existing = existingAttendance?.find((a) => a.student_id === studentId);
    return existing?.status || "";
  };

  const toggleStatus = (studentId: string) => {
    const current = getStatus(studentId);
    const next = current === "present" ? "absent" : current === "absent" ? "late" : "present";
    setAttendanceState((prev) => ({ ...prev, [studentId]: next }));
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const records = (students || [])
        .filter((s) => getStatus(s.id))
        .map((s) => ({
          student_id: s.id,
          subject_id: selectedSubject,
          date: selectedDate,
          status: getStatus(s.id),
          marked_by: user.id,
        }));

      if (records.length === 0) throw new Error("No attendance marked");

      const { error } = await supabase.from("attendance").upsert(records, {
        onConflict: "student_id,subject_id,date",
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Attendance saved!");
      queryClient.invalidateQueries({ queryKey: ["attendance"] });
      setAttendanceState({});
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const markAllPresent = () => {
    const newState: Record<string, string> = {};
    students?.forEach((s) => { newState[s.id] = "present"; });
    setAttendanceState(newState);
  };

  const statusIcon = (status: string) => {
    if (status === "present") return <Check size={16} className="text-green-400" />;
    if (status === "absent") return <X size={16} className="text-destructive" />;
    if (status === "late") return <Clock size={16} className="text-yellow-400" />;
    return <span className="w-4 h-4 rounded-full border border-border inline-block" />;
  };

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground mb-6">Attendance Manager</h2>

      {/* Filters */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <select value={selectedCourse} onChange={(e) => { setSelectedCourse(e.target.value); setSelectedBranch(""); setSelectedSubject(""); }}
          className="bg-card border border-border rounded-md px-3 py-2 text-sm text-foreground">
          <option value="">Select Course</option>
          {courses?.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>

        <select value={selectedBranch} onChange={(e) => { setSelectedBranch(e.target.value); setSelectedSubject(""); }}
          className="bg-card border border-border rounded-md px-3 py-2 text-sm text-foreground" disabled={!selectedCourse}>
          <option value="">Select Branch</option>
          {branches?.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>

        <select value={selectedYear} onChange={(e) => { setSelectedYear(e.target.value); setSelectedSubject(""); }}
          className="bg-card border border-border rounded-md px-3 py-2 text-sm text-foreground">
          <option value="">Select Year</option>
          {years?.map((y) => <option key={y.id} value={y.id}>{y.year_label}</option>)}
        </select>

        <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}
          className="bg-card border border-border rounded-md px-3 py-2 text-sm text-foreground" disabled={!selectedBranch || !selectedYear}>
          <option value="">Select Subject</option>
          {subjects?.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>

        <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}
          className="bg-card border border-border rounded-md px-3 py-2 text-sm text-foreground" />
      </div>

      {/* Student list */}
      {students && students.length > 0 && selectedSubject && (
        <>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">{students.length} students</p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={markAllPresent}>Mark All Present</Button>
              <Button size="sm" onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
                {saveMutation.isPending ? "Saving..." : "Save Attendance"}
              </Button>
            </div>
          </div>

          <div className="glass-card !p-0 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 text-muted-foreground font-medium">#</th>
                  <th className="text-left p-3 text-muted-foreground font-medium">Roll No</th>
                  <th className="text-left p-3 text-muted-foreground font-medium">Name</th>
                  <th className="text-center p-3 text-muted-foreground font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, i) => {
                  const status = getStatus(s.id);
                  return (
                    <tr key={s.id} className="border-b border-border/50 hover:bg-card/50 cursor-pointer" onClick={() => toggleStatus(s.id)}>
                      <td className="p-3 text-muted-foreground">{i + 1}</td>
                      <td className="p-3 font-mono text-xs">{s.roll_number}</td>
                      <td className="p-3 text-foreground">{s.name}</td>
                      <td className="p-3 text-center">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          status === "present" ? "bg-green-400/15 text-green-400" :
                          status === "absent" ? "bg-destructive/15 text-destructive" :
                          status === "late" ? "bg-yellow-400/15 text-yellow-400" :
                          "bg-muted text-muted-foreground"
                        }`}>
                          {statusIcon(status)}
                          {status || "Not marked"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {students && students.length === 0 && selectedBranch && selectedYear && (
        <div className="glass-card text-center py-12">
          <p className="text-muted-foreground">No students found for this selection.</p>
        </div>
      )}
    </div>
  );
};

export default AttendanceManager;
