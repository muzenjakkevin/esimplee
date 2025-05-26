import './page.css'; // We'll create this file
import Hero from './components/Hero/Hero';
import Services from './blocks/homepage/services/Services';
import Customers from './blocks/homepage/customers/Customers';
import Faq from './blocks/homepage/faq/Faq';
export const metadata = {
  title: "Hem - eSimplee",
};

export default function Home() {
  return (
    <>
      <Hero image={""} alt="" logo={""} pageClass="hero" />
      <Services />
      <Customers />
      <Faq />
    </>
  );
}
