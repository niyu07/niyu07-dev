import AboutHeader from "../components/about/AboutHeader";
import ProfileCard from "../components/about/ProfileCard";
import WorkSection from "../components/about/WorkExperienceSection/WorkSection";
import EventSection from "../components/about/WorkExperienceSection/EventSection";
import InternshipSection from "../components/about/WorkExperienceSection/InternshipSection";
import CertificationSection from "../components/about/CertificationSection";

export default function About() {
  return (
    <div className="px-4 md:px-8 lg:px-16 py-20">
      <div className="max-w-6xl mx-auto">
        <AboutHeader />
        <ProfileCard />
        <WorkSection />
        <CertificationSection />
        <EventSection />
        <InternshipSection />
      </div>
    </div>
  );
}
