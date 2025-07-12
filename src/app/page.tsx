import Header from '@/components/header';
import LandingSection from '@/components/sections/landing';
import AboutSection from '@/components/sections/about';
import ProjectsSection from '@/components/sections/projects';
import CertificationsSection from '@/components/sections/certifications';
import MiscellaneousSection from '@/components/sections/miscellaneous';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <LandingSection />
        <AboutSection />
        <ProjectsSection />
        <CertificationsSection />
        <MiscellaneousSection />
      </main>
      <Footer />
    </div>
  );
}
