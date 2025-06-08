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
import { z } from 'zod';

import { handleSignup } from './handleSignup';

const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().nonempty(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export default function SignUp() {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validators: {
      onSubmit: signUpSchema,
    },
    onSubmit: async ({ value }) => {
      await handleSignup(value.email, value.password);
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
                errorMessage="Please enter a valid email"
                isInvalid={!field.state.meta.isValid}
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
                errorMessage="Please enter a password"
                isInvalid={!field.state.meta.isValid}
              />
            )}
          />
          <form.Field
            name="confirmPassword"
            children={(field) => (
              <Input
                label="Confirm Password"
                type="Password"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                errorMessage="Passwords must match"
                isInvalid={!field.state.meta.isValid}
              />
            )}
          />
          <Button type="submit" color="primary">
            Create Account
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
