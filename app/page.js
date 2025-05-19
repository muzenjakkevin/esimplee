import './page.css'; // We'll create this file
import Hero from './components/Hero/Hero';

export const metadata = {
  title: "Hem - eSimplee",
};

export default function Home() {
  return (
    <>
      <Hero image={""} alt="" logo={""} pageClass="hero" />
    </>
  );
}
