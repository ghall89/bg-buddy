'use client';

import { Listbox, ListboxItem, Spinner } from '@heroui/react';
import type { SearchResult } from 'bgg-client';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { create } from 'zustand';

import GameDetails from '@/components/content/game-details';
import SearchField from '@/components/ui/search-field';

interface SearchStore {
  query: string;
  setQuery: (v: string) => void;
  handleSearch: () => void;
  results: SearchResult[];
  loading: boolean;
}

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

    const res = await fetch(`/api/search/${query}`);

    const results = (await res.json()) as SearchResult[];

    set({ results, loading: false });
  },
  results: [],
  loading: false,
}));

export default function Page() {
  const { query, setQuery, handleSearch, loading, results } = searchStore();

  const { push } = useRouter();

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
          <ListboxItem
            onClick={() => {
              push(`?id=${result.bggId}`);
            }}
            key={result.bggId}
          >
            {result.title}
          </ListboxItem>
        ))}
      </Listbox>
      <Suspense fallback={null}>
        <GameDetails />
      </Suspense>
    </div>
  );
}
