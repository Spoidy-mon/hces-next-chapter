import { useState } from "react";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent! (Demo)");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 star-bg">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <p className="section-label mb-4">GET IN TOUCH</p>
          <h2 className="section-title">
            Contact <span className="section-title-accent">Us</span>
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8">
          <AnimatedSection>
            <form onSubmit={handleSubmit} className="glass-card space-y-6">
              {[
                { key: "name", label: "FULL NAME", type: "text" },
                { key: "email", label: "EMAIL", type: "email" },
                { key: "phone", label: "PHONE", type: "tel" },
              ].map((f) => (
                <div key={f.key}>
                  <label className="text-muted-foreground text-xs font-mono tracking-widest block mb-2">{f.label}</label>
                  <input
                    type={f.type}
                    required
                    value={form[f.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>
              ))}
              <div>
                <label className="text-muted-foreground text-xs font-mono tracking-widest block mb-2">MESSAGE</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-secondary border border-border rounded-md px-4 py-3 text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-4 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
              >
                Send Message <Send size={16} />
              </button>
            </form>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="space-y-6">
              <div className="glass-card space-y-5">
                <div className="flex items-start gap-4">
                  <MapPin size={20} className="text-primary mt-0.5 shrink-0" />
                  <p className="text-foreground text-sm">Sonepat-Gohana Road, Sonepat, Haryana 131001</p>
                </div>
                <div className="flex items-center gap-4">
                  <Phone size={20} className="text-primary shrink-0" />
                  <p className="text-foreground text-sm">+91-130-2484XXX</p>
                </div>
                <div className="flex items-center gap-4">
                  <Mail size={20} className="text-primary shrink-0" />
                  <p className="text-foreground text-sm">info@hcesonepat.ac.in</p>
                </div>
              </div>

              <div className="glass-card overflow-hidden p-0">
                <iframe
                  title="HCE Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3487.3!2d77.02!3d28.98!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDAwJzAwLjAiTiA3N8KwMDEnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                  className="w-full h-64 border-0"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
