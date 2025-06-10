import type { Metadata } from 'next';

import Login from '@/components/auth/login';

export const metadata: Metadata = {
  title: 'My Page Title',
};

export default function Page() {
  return (
    <div className="flex flex-col justify-center h-svh">
      <Login />
    </div>
  );
}
