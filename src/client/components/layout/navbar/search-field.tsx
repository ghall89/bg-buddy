import { Input } from '@heroui/react';
import type { SearchResult } from 'bgg-client';
import { create } from 'zustand';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';

export interface SearchStore {
	query: string;
	setQuery: (v: string) => void;
	handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
	results: SearchResult[];
	loading: boolean;
	isFocused: boolean;
	setFocused: (b: boolean) => void;
}

export const searchStore = create<SearchStore>((set, get) => ({
	query: '',
	setQuery: (value: string) => {
		set({ query: value });
	},
	handleSearch: async (event) => {
		event.preventDefault();

		const { query, loading } = get();

		if (loading) {
			return;
		}

		set({ loading: true });

		const res = await fetch(`/api/search/${query}`);

		const results = (await res.json()) as SearchResult[];

		set({ results, loading: false });
	},
	results: [],
	loading: false,
	isFocused: false,
	setFocused: (value) => {
		set({ isFocused: value });
	},
}));

export function SearchField() {
	const store = searchStore();

	const showPopover = store.query.trim().length > 0;

	return (
		<Input
			type="text"
			name="Search"
			id="search-field"
			value={store.query}
			onChange={(e) => store.setQuery(e.target.value)}
			onFocus={() => store.setFocused(true)}
			onBlur={() => store.setFocused(false)}
			placeholder="Find a game..."
			startContent={<MagnifyingGlassIcon className="size-6" />}
		/>
	);
}
