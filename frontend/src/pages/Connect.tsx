import ConnectHeader from "../components/connect/ConnectHeader";
import ContactForm from "../components/connect/ContactForm";
import SocialLinks from "../components/connect/SocialLinks";

export default function Connect() {
  return (
    <div className="px-4 md:px-8 lg:px-16 py-20">
      <div className="max-w-4xl mx-auto">
        <ConnectHeader />
        <ContactForm />
        <SocialLinks />
      </div>
    </div>
  );
}
