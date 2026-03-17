import Navbar from "@/components/Navbar";
import AnnouncementTicker from "@/components/AnnouncementTicker";
import HeroSection from "@/components/HeroSection";
import SocialSidebar from "@/components/SocialSidebar";
import AboutSection from "@/components/AboutSection";
import LeadershipSection from "@/components/LeadershipSection";
import CoursesSection from "@/components/CoursesSection";
import AdmissionForm from "@/components/AdmissionForm";
import CampusGallery from "@/components/CampusGallery";
import WhyHCESection from "@/components/WhyHCESection";
import NewsSection from "@/components/NewsSection";
import PlacementsSection from "@/components/PlacementsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <AnnouncementTicker />
    <SocialSidebar />
    <HeroSection />
    <AboutSection />
    <LeadershipSection />
    <CoursesSection />
    <AdmissionForm />
    <CampusGallery />
    <WhyHCESection />
    <NewsSection />
    <PlacementsSection />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;
