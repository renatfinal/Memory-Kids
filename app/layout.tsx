import type {Metadata} from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Jogo da Memória / Memory Game',
  description: 'Jogo da memória divertido para aprender idiomas',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt">
      <body className={`${nunito.variable} font-sans antialiased`} suppressHydrationWarning>{children}</body>
    </html>
  );
}
