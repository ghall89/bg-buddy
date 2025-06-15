'use client';

import {
  Button,
  NavbarItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@heroui/react';
import { CircleUserRound } from 'lucide-react';
import Link from 'next/link';

import { useAuth } from '@/lib/providers/auth-provider';

export default function UserMenu() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <NavbarItem>
      <Popover placement="bottom" showArrow={true}>
        <PopoverTrigger>
          <Button isIconOnly>
            <CircleUserRound />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="px-1 py-2">
            <div className="text-small font-bold">Popover Content</div>
            <div className="text-tiny">This is the popover content</div>
          </div>
        </PopoverContent>
      </Popover>
    </NavbarItem>
  ) : (
    <NavbarItem>
      <Button as={Link} color="primary" href="/login" variant="ghost">
        Login
      </Button>
    </NavbarItem>
  );
}
