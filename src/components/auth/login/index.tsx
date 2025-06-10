'use client';

import { Button, Input } from '@heroui/react';
import { useForm } from '@tanstack/react-form';
import { Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react';

import FormCard from '../form-card';
import { handleLogin } from './handle-login';

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      await handleLogin(value);
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
    </FormCard>
  );
}
