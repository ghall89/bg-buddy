import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Input,
} from '@heroui/react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useDebounce } from '@uidotdev/usehooks';
import type { SearchResult } from 'bgg-client';
import { useMemo } from 'react';
import { create } from 'zustand';

export interface SearchStore {
	query: string;
	isFocused: boolean;
	setQuery: (v: string) => void;
	setFocused: (b: boolean) => void;
}

export const searchStore = create<SearchStore>((set) => ({
	query: '',
	isFocused: false,
	setQuery: (value: string) => {
		set({ query: value });
	},
	setFocused: (value) => {
		set({ isFocused: value });
	},
}));

export function SearchField() {
	const navigate = useNavigate();

	const store = searchStore();

	const searchParams = useDebounce(store.query, 1000);
	const { data } = useQuery<SearchResult[]>({
		queryFn: async () => {
			if (searchParams === '') {
				return [];
			}

			const res = await fetch(`/api/search/${store.query}`);

			const results = (await res.json()) as SearchResult[];

			return results;
		},
		queryKey: ['search-query', searchParams],
		initialData: [],
	});

	const showPopover = useMemo(
		() => store.query.trim().length > 0 && data.length >= 1,
		[store.query, data],
	);

	const goToGame = (bggId: string) => {
		navigate({
			to: '/game/$bggId',
			params: { bggId },
		});
	};

	return (
		<Dropdown isOpen={showPopover}>
			<DropdownTrigger>
				<div>
					<Input
						type="text"
						name="Search"
						id="search-field"
						className="min-w-[240px]"
						value={store.query}
						onChange={(e) => store.setQuery(e.target.value)}
						onFocus={() => store.setFocused(true)}
						onBlur={() => store.setFocused(false)}
						placeholder="Find a game..."
						startContent={<MagnifyingGlassIcon className="size-6" />}
					/>
				</div>
			</DropdownTrigger>
			<DropdownMenu>
				{data.map((result) => (
					<DropdownItem
						key={result.bggId}
						onClick={() => goToGame(result.bggId)}
					>
						{result.title}
					</DropdownItem>
				))}
			</DropdownMenu>
		</Dropdown>
	);
}
