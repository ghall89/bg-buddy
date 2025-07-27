import { Container } from '@radix-ui/themes';
import type { ReactNode } from 'react';

interface LayoutProps {
	children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
	return <Container>{children}</Container>;
}
