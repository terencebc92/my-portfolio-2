import { ThemeToggle } from "@/components/ThemeToggle";
import { StarBackground } from "@/components/StarBackground";
import { NavBar } from "@/components/NavBar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ContactsSection } from "@/components/ContactsSection";
import { Footer } from "@/components/Footer";
import { ChatbotSection } from "../components/Chatbot";

export const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Theme togggle */}
      {/* <ThemeToggle /> */}

      {/* Background effects */}
      <StarBackground />

      {/* Navbar */}
      <NavBar />

      {/* Main Content */}
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        {/* <ProjectsSection /> */}
        <ChatbotSection />
        <ContactsSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
