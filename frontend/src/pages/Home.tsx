import ProfileHero from "../components/home/ProfileHero";
import SocialLinks from "../components/home/SocialLinks";

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      <ProfileHero />
      <SocialLinks />
    </div>
  );
}
