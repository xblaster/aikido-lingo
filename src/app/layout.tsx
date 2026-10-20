import type { Metadata } from 'next';
import './globals.css';

// favicon: an ensō (brush circle) stamped with a red seal
const FAVICON =
  "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>" +
  "<rect width='100' height='100' rx='22' fill='%230B1026'/>" +
  "<path d='M50 14a36 36 0 1 0 33 22' fill='none' stroke='%23F7F4EC' stroke-width='11' stroke-linecap='round'/>" +
  "<rect x='62' y='60' width='22' height='22' rx='4' fill='%23D7263D'/></svg>";

export const metadata: Metadata = {
  title: 'Aikido Lingo',
  description:
    "Apprendre les bases de l'aikido en français, comme sur Duolingo : vocabulaire japonais, étiquette (reishiki), noms de techniques et préparation aux passages de grade, du 6e kyu au shodan.",
  icons: { icon: FAVICON },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="h-full">
      <body className="h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
