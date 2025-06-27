'use client';

import { Listbox, ListboxItem, Pagination, Spinner } from '@heroui/react';
import { useMemo } from 'react';
import { create } from 'zustand';

import SearchField from '@/components/ui/search-field';
import type { BoardGame } from '@/lib/clients/bgg-client';

import { handleSearch } from './handle-search';

interface SearchStore {
  query: string;
  setQuery: (v: string) => void;
  handleSearch: () => void;
  results: BoardGame[];
  loading: boolean;
}

const ITEMS_PER_PAGE = 15 as const;

const searchStore = create<SearchStore>((set, get) => ({
  query: '',
  setQuery: (value: string) => {
    set({ query: value });
  },
  handleSearch: async () => {
    const { query, loading } = get();

    if (loading) {
      return;
    }

    set({ loading: true });

    const results = await handleSearch(query);

    const totalPages = Math.ceil((results?.length ?? 0) / ITEMS_PER_PAGE);

    set({ results, loading: false });
  },
  results: [],
  loading: false,
}));

export default function Page() {
  const { query, setQuery, handleSearch, loading, results } = searchStore();

  return (
    <div>
      <SearchField
        query={query}
        setQuery={setQuery}
        searchAction={handleSearch}
      />
      {loading && <Spinner />}

      <Listbox className="my-4">
        {results?.map((result) => (
          <ListboxItem href={`/games/${result.bggId}`} key={result.bggId}>
            {result.title}
          </ListboxItem>
        ))}
      </Listbox>
    </div>
  );
}
