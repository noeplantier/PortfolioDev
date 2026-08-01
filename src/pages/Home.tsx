import { Hero } from '@/components/sections/hero/Hero';
import { TrustedBy } from '@/components/sections/trusted-by/TrustedBy';
import { Services } from '@/components/sections/services/Services';
import { Process } from '@/components/sections/process/Process';
import { Portfolio } from '@/components/sections/portfolio/Portfolio';
import { WhyPlantiers } from '@/components/sections/why-plantiers/WhyPlantiers';
import { Testimonials } from '@/components/sections/testimonials/Testimonials';
import { FAQ } from '@/components/sections/faq/FAQ';
import { Contact } from '@/components/sections/contact/Contact';

export function Home() {
  return (
    <div>
      <Hero />
      <TrustedBy />
      <Services />
      <Process />
      <Portfolio />
      <WhyPlantiers />
      <Testimonials />
      <FAQ />
      <Contact />
    </div>
  );
}
