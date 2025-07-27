import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Box, Flex, IconButton, TextField } from '@radix-ui/themes';

interface SearchFieldProps {
	submit: (e: React.FormEvent<HTMLFormElement>) => void;
	value: string;
	setValue: (v: string) => void;
}

export function SearchField({ submit, value, setValue }: SearchFieldProps) {
	return (
		<Box>
			<form onSubmit={submit}>
				<Flex gap="1">
					<TextField.Root
						type="text"
						name="Search"
						id="search-field"
						value={value}
						onChange={(e) => setValue(e.target.value)}
					/>
					<IconButton type="submit" variant="surface">
						<MagnifyingGlassIcon />
					</IconButton>
				</Flex>
			</form>
		</Box>
	);
}
