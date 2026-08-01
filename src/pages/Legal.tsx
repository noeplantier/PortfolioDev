import { Container } from '@/components/ui/Container';
import { site } from '@/data/site';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export function Legal() {
  useDocumentTitle('Legal & Privacy | Plantiers');

  return (
    <div className="pb-24 pt-36">
      <Container size="narrow">
        <p className="font-mono text-sm tracking-[0.3em] text-brand-400">LEGAL</p>
        <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">Legal notice &amp; privacy</h1>
        <p className="mt-4 text-white/60">Last updated {new Date().getFullYear()}.</p>

        <div className="prose-invert mt-14 space-y-12 text-white/70">
          <section>
            <h2 className="text-xl font-bold text-white">Legal notice</h2>
            <p className="mt-3 leading-relaxed">
              This site is published by {site.legalName} ({site.founder.name}), a software engineering studio. For any
              question regarding this site or its content, contact{' '}
              <a href={`mailto:${site.email}`} className="text-brand-300 underline underline-offset-4">
                {site.email}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">Privacy</h2>
            <p className="mt-3 leading-relaxed">
              This site collects only what you choose to submit through the contact form — name, email, and message
              content — solely to respond to your enquiry. It is not sold, shared with third parties, or used for
              advertising. No analytics or marketing cookies are set; the only data processor involved is Netlify,
              which hosts this site and handles form submissions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white">Your rights</h2>
            <p className="mt-3 leading-relaxed">
              You may request access to, correction of, or deletion of any data you've submitted at any time by
              emailing{' '}
              <a href={`mailto:${site.email}`} className="text-brand-300 underline underline-offset-4">
                {site.email}
              </a>
              .
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
