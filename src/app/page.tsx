import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Page Title',
};

export default function Page() {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}
