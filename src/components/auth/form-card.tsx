import { Card, CardBody, CardHeader, Image } from '@heroui/react';
import { type ReactNode } from 'react';

export interface FormCardProps {
  children: ReactNode;
  onSubmit: () => void;
}

export default function FormCard({ children, onSubmit }: FormCardProps) {
  return (
    <Card className="p-4 max-w-sm mx-auto">
      <CardHeader>
        <Image src="/media/login-header.jpg" width={390} height="390" />
      </CardHeader>
      <CardBody className="overflow-visible py-2 flex flex-col gap-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          {children}
        </form>
      </CardBody>
    </Card>
  );
}
