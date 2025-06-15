'use client';

import { Button, Input } from '@heroui/react';
import { useForm } from '@tanstack/react-form';
import { Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react';
import z from 'zod';

import { useAuth } from '@/lib/providers/auth-provider';

const loginFormSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export default function LoginForm() {
  const { login } = useAuth();

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const form = useForm({
    validators: {
      onChange: loginFormSchema,
      onSubmit: loginFormSchema,
    },
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      await login(value);
    },
  });

  return (
    <form
      className="overflow-visible py-2 flex flex-col gap-6"
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
            type={isVisible ? 'text' : 'password'}
            name={field.name}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
            endContent={
              <button
                aria-label="toggle password visibility"
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <Eye className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeClosed className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
          />
        )}
      />
      <Button type="submit" color="primary">
        Login
      </Button>
    </form>
  );
}
