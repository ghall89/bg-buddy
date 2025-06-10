'use client';

import { Button, Input } from '@heroui/react';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';

import FormCard from '../form-card';
import { handleSignup } from './handle-signup';

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
    <FormCard onSubmit={form.handleSubmit}>
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
    </FormCard>
  );
}
