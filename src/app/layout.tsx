import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ToastProvider } from '@/components/ui/toast';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'InvestIQ AI | Intelligent Investment Research Analyst',
  description: 'Analyze any company in seconds using AI-powered investment research pipelines. Get institutional-grade reports instantly.',
  keywords: ['Investment', 'AI Research', 'SWOT Analysis', 'Hedge Fund', 'Stock Analysis', 'Financials'],
  openGraph: {
    title: 'InvestIQ AI',
    description: 'Intelligent Investment Research Analyst',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-neutral-950 text-neutral-100 selection:bg-indigo-500/30 selection:text-indigo-200">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
