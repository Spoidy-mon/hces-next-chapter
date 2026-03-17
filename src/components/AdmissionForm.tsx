import { useState } from "react";
import { Send, GraduationCap } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const courseOptions = [
  "Diploma - CSE",
  "Diploma - ME",
  "Diploma - CE",
  "Diploma - EE",
  "B.Tech - CSE",
  "B.Tech - ME",
  "B.Tech - CE",
  "B.Tech - ECE",
  "BCA",
  "M.Tech - CSE",
  "M.Tech - ME",
];

const AdmissionForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    percentage: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim();
    const trimmedPhone = form.phone.trim();

    if (!trimmedName || trimmedName.length > 100) errs.name = "Enter a valid name (max 100 chars)";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) errs.email = "Enter a valid email";
    if (!/^[6-9]\d{9}$/.test(trimmedPhone)) errs.phone = "Enter a valid 10-digit phone number";
    if (!form.course) errs.course = "Select a course";
    const pct = parseFloat(form.percentage);
    if (isNaN(pct) || pct < 0 || pct > 100) errs.percentage = "Enter percentage between 0 and 100";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    alert("Application submitted successfully! We will contact you soon. (Demo)");
    setForm({ name: "", email: "", phone: "", course: "", percentage: "" });
    setErrors({});
  };

  return (
    <section id="admission" className="py-24 star-bg relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(var(--primary)/0.06)_0%,_transparent_60%)]" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <p className="section-label mb-4">ADMISSIONS 2026-27</p>
          <h2 className="section-title">
            Apply for <span className="section-title-accent">Admission</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-sm md:text-base">
            Fill in your details below and our admissions team will get in touch with you shortly.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <form onSubmit={handleSubmit} className="glass-card space-y-5">
              <div>
                <label className="text-muted-foreground text-xs font-mono tracking-widest block mb-2">FULL NAME *</label>
                <input
                  type="text"
                  maxLength={100}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="text-muted-foreground text-xs font-mono tracking-widest block mb-2">EMAIL *</label>
                <input
                  type="email"
                  maxLength={255}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="text-muted-foreground text-xs font-mono tracking-widest block mb-2">PHONE *</label>
                <input
                  type="tel"
                  maxLength={10}
                  value={form.phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                    setForm({ ...form, phone: val });
                  }}
                  className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                  placeholder="9876543210"
                />
                {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="text-muted-foreground text-xs font-mono tracking-widest block mb-2">COURSE PREFERENCE *</label>
                <select
                  value={form.course}
                  onChange={(e) => setForm({ ...form, course: e.target.value })}
                  className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                >
                  <option value="">Select a course</option>
                  {courseOptions.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                {errors.course && <p className="text-destructive text-xs mt-1">{errors.course}</p>}
              </div>

              <div>
                <label className="text-muted-foreground text-xs font-mono tracking-widest block mb-2">12TH PERCENTAGE *</label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  step={0.01}
                  value={form.percentage}
                  onChange={(e) => setForm({ ...form, percentage: e.target.value })}
                  className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                  placeholder="e.g. 85.5"
                />
                {errors.percentage && <p className="text-destructive text-xs mt-1">{errors.percentage}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-4 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
              >
                Submit Application <Send size={16} />
              </button>
            </form>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="space-y-6">
              <div className="glass-card text-center py-10">
                <GraduationCap size={48} className="text-primary mx-auto mb-4" />
                <h3 className="text-foreground font-display text-2xl font-bold mb-2">Why Apply?</h3>
                <ul className="text-muted-foreground text-sm space-y-3 text-left max-w-sm mx-auto">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    AICTE Approved & DCRUST Affiliated
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    110+ Years of Hindu Group Legacy
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    85%+ Placement Rate with Top Companies
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    AWS Academy in BCA Department
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    PM Vidyalaxmi Education Loan Support
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    Modern Labs & Smart Classrooms
                  </li>
                </ul>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AdmissionForm;
