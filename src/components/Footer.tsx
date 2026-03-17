import { Instagram, Linkedin, Facebook, Youtube } from "lucide-react";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-3 gap-12">
        <div>
          <h3 className="font-display text-2xl font-bold mb-4">HCE SONEPAT</h3>
          <p className="text-primary-foreground/70 text-sm leading-relaxed">
            Hindu College of Engineering, Sonepat — Shaping engineers and
            leaders since 1996. Affiliated to MDU Rohtak, Approved by AICTE New
            Delhi.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-sm tracking-widest mb-4">QUICK LINKS</h4>
          <ul className="space-y-2">
            {["Home", "About", "Courses", "Placements", "Contact"].map((l) => (
              <li key={l}>
                <a
                  href={`#${l.toLowerCase()}`}
                  className="text-primary-foreground/70 text-sm hover:text-primary-foreground transition-colors"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-sm tracking-widest mb-4">CONNECT</h4>
          <div className="flex gap-3 mb-4">
            {[Instagram, Linkedin, Facebook, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/15 flex items-center justify-center hover:bg-primary-foreground/25 transition-colors"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
          <p className="text-primary-foreground/70 text-sm">info@hcesonepat.ac.in</p>
          <p className="text-primary-foreground/70 text-sm">+91-130-2484XXX</p>
        </div>
      </div>
    </div>

    <div className="border-t border-primary-foreground/15 py-6">
      <p className="text-center text-primary-foreground/50 text-sm">
        © 2026 Hindu College of Engineering, Sonepat. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
