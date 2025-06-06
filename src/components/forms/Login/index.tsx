import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
  Input,
} from '@heroui/react';
import NextImage from 'next/image';

import { signIn } from '@/auth';

export default function Login() {
  return (
    <Card className="p-4 max-w-sm mx-auto">
      <CardHeader>
        <Image
          src="/media/login-header.jpg"
          as={NextImage}
          width={390}
          height="390"
        />
      </CardHeader>
      <CardBody className="overflow-visible py-2 flex flex-col gap-6">
        <form
          action={async (formData) => {
            'use server';

            signIn('credentials', formData);
          }}
        >
          <Input label="Email" type="email" />
          <Input label="Password" type="Password" />
          <Button type="submit" color="primary">
            Login
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
