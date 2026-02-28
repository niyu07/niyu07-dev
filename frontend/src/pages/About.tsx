import AboutHeader from "../components/about/AboutHeader";
import ProfileCard from "../components/about/ProfileCard";
import EventSection from "../components/about/WorkExperienceSection/EventSection";
import InternshipSection from "../components/about/WorkExperienceSection/InternshipSection";

export default function About() {
  return (
    <div className="px-4 md:px-8 lg:px-16 py-20">
      <div className="max-w-6xl mx-auto">
        <AboutHeader />
        <ProfileCard />
        <EventSection />
        <InternshipSection />
      </div>
    </div>
  );
}
