import { ArrowDown } from "lucide-react";
import profile from "../assets/profile.jpg";

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
      <div className="container max-w-4xl mx-auto text-center z-10">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="opacity-0 animate-fade-in">Hi, I'm</span>
            <span className="text-primary opacity-0 animate-fade-in-delay-1">
              {" "}
              Terence
            </span>
            <span className="text-gradient ml-1 opacity-0 animate-fade-in-delay-2">
              {" "}
              Chia
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-2-2xl mx-auto opacity-0 animate-fade-in-delay-3">
            I'm a backend developer passionate about building solid foundations
            for web applications. From APIs to databases, I enjoy learning and
            applying technologies that make applications fast and dependable.
          </p>
          <p className="text-lg md:text-xl text-muted-foreground max-2-2xl mx-auto opacity-0 animate-fade-in-delay-3">
            Everything you see here runs on my homelab, where I experiment with
            backend systems, containers, and deployment pipelines.
          </p>

          <div className="pt4 opacity-0 animate-fade-in-delay-4">
            <a href="#contact" className="cosmic-button">
              Contact me
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <a href="#about" className="flex flex-col items-center justify-center">
          <span className="text-sm text-muted-foreground mb-2">Scroll</span>
          <ArrowDown className="h-5 w-5 text-primary" />
        </a>
      </div>
    </section>
  );
};
