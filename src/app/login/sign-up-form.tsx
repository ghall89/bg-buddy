'use client';

import { Button, Input, Tab, Tabs } from '@heroui/react';
import { useForm } from '@tanstack/react-form';
import { Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react';
import z from 'zod';

import { handleSignup } from './handle-signup';

const signUpFormSchema = z.object({
  email: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
});

export default function SignUpForm() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const form = useForm({
    validators: {
      onChange: signUpFormSchema,
    },
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async ({ value }) => {
      await handleSignup(value.email, value.password);
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

      <Button type="submit" color="secondary">
        Create Account
      </Button>
    </form>
  );
}
