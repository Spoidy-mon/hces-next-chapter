import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    label: "ABOUT US",
    children: [
      { label: "About Society", href: "#about" },
      { label: "About College", href: "#about" },
      { label: "Vision & Mission", href: "#about" },
      { label: "Campus", href: "#why-hce" },
      { label: "Leadership", href: "#leadership" },
    ],
  },
  {
    label: "ADMINISTRATION",
    children: [
      { label: "President's Message", href: "#leadership" },
      { label: "Governing Body", href: "#leadership" },
      { label: "Director Principal's Message", href: "#leadership" },
    ],
  },
  {
    label: "DEPARTMENTS",
    children: [
      { label: "Dept. of Applied Sciences", href: "/course/a1000000-0000-0000-0000-000000000001" },
      { label: "Dept. of Computer Science & Engineering", href: "/course/a1000000-0000-0000-0000-000000000002" },
      { label: "Dept. of Electronics & Communication", href: "/course/a1000000-0000-0000-0000-000000000002" },
      { label: "Dept. of Electrical Engineering", href: "/course/a1000000-0000-0000-0000-000000000002" },
      { label: "Dept. of Mechanical Engineering", href: "/course/a1000000-0000-0000-0000-000000000002" },
      { label: "Dept. of Civil Engineering", href: "/course/a1000000-0000-0000-0000-000000000001" },
      { label: "Dept. of BCA", href: "/course/a1000000-0000-0000-0000-000000000004" },
    ],
  },
  {
    label: "ACADEMICS",
    children: [
      { label: "Courses Offered", href: "#courses" },
      { label: "Achievers", href: "#placements" },
      { label: "Academic Calendar", href: "#courses" },
      { label: "Time Table", href: "#courses" },
      { label: "Academic Events", href: "#news" },
    ],
  },
  {
    label: "ADMISSION",
    children: [
      { label: "Online Registration", href: "#contact" },
      { label: "Admission Procedure 2026-27", href: "#contact" },
      { label: "Prospectus", href: "#contact" },
      { label: "Eligibility Required", href: "#contact" },
      { label: "Documents Required", href: "#contact" },
      { label: "Fee Structure", href: "#contact" },
      { label: "Scholarship", href: "#contact" },
    ],
  },
  {
    label: "FACILITIES",
    children: [
      { label: "Library", href: "#why-hce" },
      { label: "Laboratories", href: "#why-hce" },
      { label: "Sports", href: "#why-hce" },
      { label: "Hostel", href: "#why-hce" },
      { label: "Transport", href: "#why-hce" },
      { label: "Wi-Fi Campus", href: "#why-hce" },
    ],
  },
  {
    label: "PLACEMENT",
    children: [
      { label: "Placement Record", href: "#placements" },
      { label: "Internship Details", href: "#placements" },
      { label: "Industrial Visits & Tieups", href: "#placements" },
      { label: "Our Recruiters", href: "#placements" },
    ],
  },
  { label: "CAMPUS LIFE", href: "#why-hce" },
  { label: "CONTACT US", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    setOpenDropdown(null);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-visible ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg"
          : "bg-background/80 backdrop-blur-sm"
      }`}
    >
      {/* Top bar with logo */}
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <a href="#home" onClick={() => handleNavClick("#home")} className="flex items-center gap-3">
          <img src="/images/hce-logo.png" alt="HCE" className="w-11 h-11 object-contain" />
          <div className="flex flex-col">
            <span className="text-primary font-display text-lg font-bold leading-tight">HCE SONEPAT</span>
            <span className="text-muted-foreground text-[10px] leading-tight hidden sm:block">Hindu College of Engineering</span>
          </div>
          <img src="/images/society-logo.png" alt="HFROE" className="w-11 h-11 object-contain hidden sm:block" />
        </a>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/login"
            className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors border border-border rounded-md px-3 py-1.5"
          >
            <Shield size={14} />
            Admin Panel
          </Link>
          <button
            onClick={() => handleNavClick("#contact")}
            className="hidden md:block bg-primary text-primary-foreground px-5 py-2 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Apply Now
          </button>
          <button
            className="lg:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Desktop mega menu bar */}
      <div className="hidden lg:block border-t border-border bg-card/80 backdrop-blur-sm overflow-visible">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center overflow-visible">
          {navItems.map((item, index) => (
            <div
              key={item.label}
              className="relative static-dropdown"
              onMouseEnter={() => item.children && handleMouseEnter(item.label)}
              onMouseLeave={handleMouseLeave}
            >
              {item.href && !item.children ? (
                <button
                  onClick={() => handleNavClick(item.href!)}
                  className="flex items-center gap-1 px-3 py-3 text-xs font-semibold tracking-wider text-foreground/80 hover:text-primary transition-colors whitespace-nowrap"
                >
                  {item.label}
                </button>
              ) : (
                <button
                  className={`flex items-center gap-1 px-3 py-3 text-xs font-semibold tracking-wider transition-colors whitespace-nowrap ${
                    openDropdown === item.label ? "text-primary" : "text-foreground/80 hover:text-primary"
                  }`}
                >
                  {item.label}
                  {item.children && <ChevronDown size={12} className={`transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`} />}
                </button>
              )}

              {/* Dropdown */}
              <AnimatePresence>
                {item.children && openDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute top-full min-w-[260px] bg-card border border-border rounded-b-lg shadow-xl z-50 ${index <= 1 ? 'left-0' : index >= navItems.length - 2 ? 'right-0' : 'left-1/2 -translate-x-1/2'}`}
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="py-2">
                      {item.children.map((child) =>
                        child.href.startsWith("/") ? (
                          <Link
                            key={child.label}
                            to={child.href}
                            className="block px-5 py-2.5 text-sm text-foreground/80 hover:text-primary hover:bg-primary/5 transition-colors"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {child.label}
                          </Link>
                        ) : (
                          <button
                            key={child.label}
                            onClick={() => handleNavClick(child.href)}
                            className="block w-full text-left px-5 py-2.5 text-sm text-foreground/80 hover:text-primary hover:bg-primary/5 transition-colors"
                          >
                            {child.label}
                          </button>
                        )
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/95 backdrop-blur-md border-b border-border overflow-hidden max-h-[80vh] overflow-y-auto"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                        className="flex items-center justify-between w-full py-2.5 text-sm font-semibold tracking-wider text-foreground/80"
                      >
                        {item.label}
                        <ChevronDown size={14} className={`transition-transform ${mobileExpanded === item.label ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {mobileExpanded === item.label && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 pb-2 flex flex-col gap-1 border-l-2 border-primary/30 ml-2">
                              {item.children.map((child) =>
                                child.href.startsWith("/") ? (
                                  <Link
                                    key={child.label}
                                    to={child.href}
                                    className="py-2 text-sm text-muted-foreground hover:text-primary"
                                    onClick={() => setMobileOpen(false)}
                                  >
                                    {child.label}
                                  </Link>
                                ) : (
                                  <button
                                    key={child.label}
                                    onClick={() => handleNavClick(child.href)}
                                    className="text-left py-2 text-sm text-muted-foreground hover:text-primary"
                                  >
                                    {child.label}
                                  </button>
                                )
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <button
                      onClick={() => handleNavClick(item.href!)}
                      className="w-full text-left py-2.5 text-sm font-semibold tracking-wider text-foreground/80 hover:text-primary"
                    >
                      {item.label}
                    </button>
                  )}
                </div>
              ))}
              <Link
                to="/admin/login"
                className="flex items-center gap-1.5 py-2.5 text-sm font-semibold text-muted-foreground hover:text-primary"
                onClick={() => setMobileOpen(false)}
              >
                <Shield size={14} />
                Admin Panel
              </Link>
              <button
                onClick={() => handleNavClick("#contact")}
                className="bg-primary text-primary-foreground px-6 py-2.5 rounded-md text-sm font-semibold text-center mt-2"
              >
                Apply Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
