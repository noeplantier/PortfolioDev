import { Hero } from '@/components/sections/hero/Hero';
import { TrustedBy } from '@/components/sections/trusted-by/TrustedBy';

// Sections are added here one at a time as each is built (see the project's
// task list) and finalized in the "assemble Home page" pass.
export function Home() {
  return (
    <div>
      <Hero />
      <TrustedBy />
    </div>
  );
}
