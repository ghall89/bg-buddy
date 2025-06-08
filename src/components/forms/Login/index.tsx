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
import { Eye, EyeClosed } from 'lucide-react';
import NextImage from 'next/image';
import { useState } from 'react';

import { handleLogin } from './handleLogin';

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
      </CardBody>
    </Card>
  );
}
