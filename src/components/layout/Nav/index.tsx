import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@heroui/react';
import { Dices } from 'lucide-react';

export default function Nav() {
  return (
    <Navbar>
      <NavbarBrand>
        <Dices />
        <p className="font-bold text-inherit">BGBuddy</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="primary" href="/signup" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
