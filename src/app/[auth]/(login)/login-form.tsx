'use client';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
  Input,
  Tab,
  Tabs,
} from '@heroui/react';
import { useForm, useStore } from '@tanstack/react-form';
import { Eye, EyeClosed } from 'lucide-react';
import { AnimatePresence, animate, motion } from 'motion/react';
import { useState } from 'react';
import z from 'zod';

import { handleSignup } from '../(sign-up)/handle-signup';
import { handleLogin } from './handle-login';

const loginFormSchema = z.object({
  tab: z.enum(['login', 'sign-up']),
  email: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
});

export default function LoginForm() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const form = useForm({
    validators: {
      onChange: loginFormSchema,
    },
    defaultValues: {
      tab: 'login',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async ({ value }) => {
      switch (value.tab) {
        case 'login':
          await handleLogin(value);
          break;
        case 'sign-up':
          await handleSignup(value.email, value.password);
      }
    },
  });

  const selectedTab = useStore(form.store, (state) => state.values.tab);

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
      <div>
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
        <AnimatePresence>
          {selectedTab === 'sign-up' && (
            <motion.div
              key="confirmPasswordField"
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 60, marginTop: 26 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
            >
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Button type="submit" color="primary">
        Login
      </Button>
    </form>
  );
}
