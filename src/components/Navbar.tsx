import { useState, useEffect } from "react";
import { Droplets, Menu, X } from "lucide-react";

const links = [
  { href: "#monitor", label: "Monitor" },
  { href: "#predictions", label: "Predictions" },
  { href: "#models", label: "Models" },
  { href: "#features", label: "Features" },
  { href: "#architecture", label: "Architecture" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass-strong shadow-card" : "bg-transparent"}`}>
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <Droplets className="w-6 h-6 text-primary" />
          <span className="font-bold text-foreground">AquaPredict<span className="text-primary">.AI</span></span>
        </a>
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">{l.label}</a>
          ))}
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden glass-strong border-t border-border p-4 flex flex-col gap-3">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-primary transition-colors">{l.label}</a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
