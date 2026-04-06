import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ImpactSection from "@/components/ImpactSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";

const Index = () => (
  <div className="relative">
    <ParticleBackground />
    <Navbar />
    <HeroSection />
    <AboutSection />
    <ServicesSection />
    <ImpactSection />
    <WhyChooseUs />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;
