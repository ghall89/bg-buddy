import {
	Link,
	Navbar as NavbarRoot,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
} from '@heroui/react';

import { SearchField } from './search-field';

export function Navbar() {
	return (
		<NavbarRoot>
			<NavbarBrand>
				<p className="font-bold text-inherit">Board Game Buddy</p>
			</NavbarBrand>
			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				<NavbarItem>
					<Link color="foreground" href="#">
						Features
					</Link>
				</NavbarItem>
				<NavbarItem isActive>
					<Link aria-current="page" href="#">
						Customers
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link color="foreground" href="#">
						Integrations
					</Link>
				</NavbarItem>
			</NavbarContent>
			<NavbarContent justify="end">
				<NavbarItem>
					<SearchField />
				</NavbarItem>
			</NavbarContent>
		</NavbarRoot>
	);
}
