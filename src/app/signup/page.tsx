import type { Metadata } from 'next';

import SignUp from '@/components/auth/signup';

export const metadata: Metadata = {
  title: 'My Page Title',
};

export default function Page() {
  return (
    <div className="flex flex-col justify-center h-svh">
      <SignUp />
    </div>
  );
}
