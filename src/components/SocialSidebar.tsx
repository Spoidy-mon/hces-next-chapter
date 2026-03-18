import { Instagram, Linkedin, Facebook, Youtube } from "lucide-react";

const socials = [
  { icon: Instagram, href: "https://www.instagram.com/explore/locations/655964648/hindu-college-sonepat/", label: "Instagram" },
  { icon: Linkedin, href: "https://in.linkedin.com/in/hindu-college-of-engineering-1b8807133", label: "LinkedIn" },
  { icon: Facebook, href: "https://www.facebook.com/hceian/", label: "Facebook" },
  { icon: Youtube, href: "https://www.youtube.com/@hcesonepat", label: "YouTube" },
];

const SocialSidebar = () => (
  <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4">
    {socials.map(({ icon: Icon, href, label }) => (
      <a
        key={label}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
      >
        <Icon size={16} />
      </a>
    ))}
  </div>
);

export default SocialSidebar;
