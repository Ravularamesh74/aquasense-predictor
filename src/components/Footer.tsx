import { Droplets } from "lucide-react";

const Footer = () => (
  <footer className="py-12 border-t border-border">
    <div className="container mx-auto px-6 text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Droplets className="w-5 h-5 text-primary" />
        <span className="font-bold text-foreground">AquaPredict<span className="text-primary">.AI</span></span>
      </div>
      <p className="text-sm text-muted-foreground max-w-md mx-auto">
        AI-powered dissolved oxygen prediction for environmental monitoring and smart water management.
      </p>
      <p className="text-xs text-muted-foreground mt-6">© 2025 AquaPredict.AI — All rights reserved</p>
    </div>
  </footer>
);

export default Footer;
