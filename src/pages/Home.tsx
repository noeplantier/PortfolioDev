import { Hero } from '@/components/sections/hero/Hero';
import { TrustedBy } from '@/components/sections/trusted-by/TrustedBy';
import { Services } from '@/components/sections/services/Services';
import { Process } from '@/components/sections/process/Process';
import { Portfolio } from '@/components/sections/portfolio/Portfolio';

// Sections are added here one at a time as each is built (see the project's
// task list) and finalized in the "assemble Home page" pass.
export function Home() {
  return (
    <div>
      <Hero />
      <TrustedBy />
      <Services />
      <Process />
      <Portfolio />
    </div>
  );
}
