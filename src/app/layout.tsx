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
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
      </head>
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
