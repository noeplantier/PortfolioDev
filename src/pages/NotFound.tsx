import { ArrowLeft } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { GlowOrb } from '@/components/ui/GlowOrb';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export function NotFound() {
  useDocumentTitle('Page not found | Plantiers');

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <GlowOrb color="brand" className="left-1/2 top-1/3 h-[40vw] w-[40vw] -translate-x-1/2" />
      <Container size="narrow" className="relative z-10 text-center">
        <p className="font-mono text-sm tracking-[0.3em] text-brand-400">404</p>
        <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">This page grew somewhere else.</h1>
        <p className="mx-auto mt-4 max-w-md text-white/60">
          The page you're looking for doesn't exist, or has moved. Let's get you back on track.
        </p>
        <Button
          href="/"
          magnetic
          size="lg"
          icon={<ArrowLeft className="h-4 w-4 rotate-180 transition-transform group-hover:translate-x-0.5" />}
          className="mt-8"
        >
          Back to home
        </Button>
      </Container>
    </section>
  );
}
