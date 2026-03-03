import ConnectHeader from "../components/contact/contactHeader";
import ContactForm from "../components/contact/ContactForm";
import SocialLinks from "../components/contact/SocialLinks";

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
