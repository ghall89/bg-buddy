/**
 * This file is the entry point for the React app, it sets up the root
 * element and renders the App component to the DOM.
 *
 * It is included in `src/index.html`.
 */

import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { RouterProvider } from '@tanstack/react-router';
import { createRoot } from 'react-dom/client';
import { router } from './router';

function start() {
	const root = createRoot(document.getElementById('root')!);
	root.render(
		<Theme>
			<RouterProvider router={router} />
		</Theme>,
	);
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', start);
} else {
	start();
}
