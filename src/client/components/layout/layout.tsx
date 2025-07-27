import type { ReactNode } from 'react';

import { Navbar } from './navbar';

interface LayoutProps {
	children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
	return (
		<>
			<Navbar />
			<main className="container mx-auto">{children}</main>
		</>
	);
}
