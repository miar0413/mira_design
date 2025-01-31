// eslint-disable-next-line import/order
import { ThemeProvider } from '@/components/ThemeProvider';

import 'normalize.css/normalize.css';
import './globals.css';

import Header from '@/components/Header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
