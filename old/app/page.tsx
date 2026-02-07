import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ProjectsSection from "@/components/projects-section";
import BlogSection from "@/components/blog-section";
import ResumeSection from "@/components/resume-section";
import ContactSection from "@/components/contact-section";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <BlogSection />
      <ResumeSection />
      <ContactSection />
      <Toaster />
    </>
  );
}
