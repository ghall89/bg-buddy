import type { SearchResult } from 'bgg-client';
import { create } from 'zustand';

export interface SearchStore {
	query: string;
	setQuery: (v: string) => void;
	handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
	results: SearchResult[];
	loading: boolean;
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
}));
