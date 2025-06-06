'use client';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
  Input,
} from '@heroui/react';
import { useForm } from '@tanstack/react-form';
import NextImage from 'next/image';

import { register } from './register';

export default function SignUp() {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      await register(value.email, value.password);
    },
  });

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
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.Field
            name="email"
            children={(field) => (
              <Input
                label="Email"
                type="email"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          />
          <form.Field
            name="password"
            children={(field) => (
              <Input
                label="Password"
                type="Password"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          />
          <Button type="submit" color="primary">
            Login
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
