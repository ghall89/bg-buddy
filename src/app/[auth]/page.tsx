'use client';

import { Card, CardBody, Tab, Tabs } from '@heroui/react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import LoginForm from './(login)/login-form';
import SignUpForm from './(sign-up)/sign-up-form';

export default function Page() {
  const params = useParams<{ auth: 'login' | 'sign-up' }>();
  const [hasAnimated, setHasAnimated] = useState(false);
  const [[selectedTab, direction], setSelectedTab] = useState([params.auth, 0]);

  const variants = {
    enter: { translateX: -100, opacity: 0 },
    center: { translateX: 0, opacity: 1 },
    exit: { translateX: 100, opacity: 0 },
  };

  const forms = {
    'login': <LoginForm />,
    'sign-up': <SignUpForm />,
  };

  useEffect(() => {
    setHasAnimated(true);
  }, []);

  return (
    <motion.div
      className="mx-auto"
      initial={{ translateY: 30, opacity: 0 }}
      whileInView={{ translateY: 0, opacity: 1 }}
    >
      <Card className="p-4 max-w-sm mx-auto ">
        <CardBody className="overflow-visible">
          <Tabs
            aria-label="Tabs colors"
            color="primary"
            className="mx-auto mb-6"
            selectedKey={selectedTab}
            onSelectionChange={(s) => {
              let direction;

              if (s === 'login') {
                direction = -1;
              } else {
                direction = 1;
              }

              setSelectedTab([s as 'login' | 'sign-up', direction]);
            }}
          >
            <Tab key="login" title="Login" />
            <Tab key="sign-up" title="Sign Up" />
          </Tabs>
          <div
            className={clsx(
              'transition-size',
              selectedTab === 'login' ? 'h-[13rem]' : 'h-[18rem]',
            )}
          >
            <AnimatePresence>
              <motion.div
                key={selectedTab}
                variants={variants}
                custom={direction}
                initial={hasAnimated ? 'enter' : 'center'}
                animate="center"
                exit="exit"
                className="relative"
              >
                <div className="absolute w-full">{forms[selectedTab]}</div>
              </motion.div>
            </AnimatePresence>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
}
