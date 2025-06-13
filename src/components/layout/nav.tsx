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
        <Link href="/" color="foreground">
          <Dices />
          <p className="font-bold text-inherit">BGBuddy</p>
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="primary" href="/sign-up" variant="ghost">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
