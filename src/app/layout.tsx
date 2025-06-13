import Nav from '@/components/layout/nav';

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
          <main className="mx-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
