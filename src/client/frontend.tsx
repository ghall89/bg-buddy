/**
 * This file is the entry point for the React app, it sets up the root
 * element and renders the App component to the DOM.
 *
 * It is included in `src/index.html`.
 */

import { HeroUIProvider } from '@heroui/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { createRoot } from 'react-dom/client';
import { router } from './router';

import './style.css';

function start() {
	// biome-ignore lint/style/noNonNullAssertion: <false positive>
	const root = createRoot(document.getElementById('root')!);

	const queryClient = new QueryClient();

	root.render(
		<QueryClientProvider client={queryClient}>
			<HeroUIProvider>
				<RouterProvider router={router} />
			</HeroUIProvider>
			,
		</QueryClientProvider>,
	);
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', start);
} else {
	start();
}
