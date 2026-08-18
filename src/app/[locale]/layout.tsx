import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { routing } from '@/i18n/routing';
import { type Locale } from '@/i18n/request';
import { AuthProvider } from '@/components/providers/AuthProvider';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import MessageList from '@/components/MessageList';
import ChatInput from '@/components/ChatInput';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Note Prompt',
  description: 'Generated using Note Prompt',
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-pearl">
        <NextIntlClientProvider messages={messages}>
          <AuthProvider initialUser={user}>
            <Header />
            <Sidebar />
            {children}
            <MessageList />
            <ChatInput />
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
