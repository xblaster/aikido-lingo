import Link from 'next/link';
import { Credits } from '@/components/Credits';
import { ThemeProvider } from '@/utils/theme';

export const metadata = { title: 'Crédits — Aikido Lingo' };

/** « Crédits » page: about the app, and the free-licensed media generated from the manifest. */
export default function CreditsPage() {
  return (
    <ThemeProvider>
      <main className="min-h-screen bg-aiki-nuit text-slate-100 p-4 sm:p-8">
        <div className="max-w-3xl mx-auto space-y-4">
          <Link href="/" className="text-sm font-black text-aiki-ai-clair underline">← Retour au parcours</Link>
          <h1 className="text-2xl font-black">Crédits</h1>
          <Credits />
        </div>
      </main>
    </ThemeProvider>
  );
}
