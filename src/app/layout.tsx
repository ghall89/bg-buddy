import BottomTabs from '@/components/layout/bottom-tabs';
import Nav from '@/components/layout/nav/nav';

import './globals.css';
import { Providers } from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Nav />
          <main className="mx-4 mb-20">{children}</main>
          <BottomTabs />
        </Providers>
      </body>
    </html>
  );
}
