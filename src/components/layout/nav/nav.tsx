import { Link, Navbar, NavbarBrand, NavbarContent } from '@heroui/react';
import { Dices } from 'lucide-react';

import UserMenu from './user-menu';

export default function Nav() {
  return (
    <Navbar>
      <NavbarBrand>
        <Link href="/" color="foreground">
          <Dices />
          <p className="font-bold text-inherit">BGBuddy</p>
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <UserMenu />
      </NavbarContent>
    </Navbar>
  );
}
