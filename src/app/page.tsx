import { redirect } from 'next/navigation';

export default function Page() {
  redirect('/collection');

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}
