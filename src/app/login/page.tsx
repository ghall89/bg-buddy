'use client';

import { Card, CardBody, Tab, Tabs } from '@heroui/react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

import LoginForm from './login-form';
import SignUpForm from './sign-up-form';

export default function Page() {
  const [selectedTab, setSelectedTab] = useState(TabOption.login);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    setHasAnimated(true);
  }, []);

  return (
    <motion.div
      className="mx-auto"
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
    >
      <Card className="p-4 max-w-sm mx-auto ">
        <CardBody className="overflow-visible">
          <Tabs
            selectedKey={selectedTab}
            onSelectionChange={(key) => setSelectedTab(key as TabOption)}
            aria-label="Log in or sign up"
            color="primary"
            className="mx-auto mb-6"
          >
            <Tab key={TabOption.login} title="Login" />
            <Tab key={TabOption.signUp} title="Sign Up" />
          </Tabs>
          <div
            className={clsx(
              'transition-size',
              selectedTab === TabOption.login ? 'h-[13rem]' : 'h-[18rem]',
            )}
          >
            <AnimatePresence>
              <FormWrapper tab={selectedTab} hasAnimated={hasAnimated} />
            </AnimatePresence>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
}

interface FormWrapperProps {
  tab: TabOption;
  hasAnimated: boolean;
}

enum TabOption {
  login = 'sign-in',
  signUp = 'sign-up',
}

function FormWrapper({ tab, hasAnimated }: FormWrapperProps) {
  const forms = {
    'sign-in': <LoginForm />,
    'sign-up': <SignUpForm />,
  };

  const variants = {
    enter: { translateX: -100, opacity: 0 },
    center: { translateX: 0, opacity: 1 },
    exit: { translateX: 100, opacity: 0 },
  };

  return (
    <motion.div
      key={tab}
      variants={variants}
      initial={hasAnimated ? 'enter' : 'center'}
      animate="center"
      exit="exit"
      className="relative"
    >
      <div className="absolute w-full">{forms[tab]}</div>
    </motion.div>
  );
}
