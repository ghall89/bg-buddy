// src/client/router.tsx
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from '@tanstack/react-router';
import { HomePage } from './pages/home';
import { GameInfoPage } from './pages/game';

// Root route component (like a layout)
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// Child routes
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const gameRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/game/$bggId',
  component: GameInfoPage,
});

const routeTree = rootRoute.addChildren([homeRoute, gameRoute]);

export const router = createRouter({ routeTree });

// Optional: so you can use `router` in devtools
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
