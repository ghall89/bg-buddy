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
  page: number;
  totalPages: number;
  setPage: (p: number) => void;
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

    set({ loading: true, page: 1, totalPages: 0 });

    const results = await handleSearch(query);

    const totalPages = Math.ceil((results?.length ?? 0) / ITEMS_PER_PAGE);

    set({ results, totalPages, loading: false });
  },
  results: [],
  loading: false,
  page: 1,
  totalPages: 0,
  setPage: (page: number) => {
    set({ page });
  },
}));

export default function Page() {
  const {
    query,
    setQuery,
    handleSearch,
    loading,
    results,
    page,
    setPage,
    totalPages,
  } = searchStore();

  const currentPageMemo = useMemo<BoardGame[]>(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;

    return results.splice(startIndex, ITEMS_PER_PAGE);
  }, [results, page]);

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
          <ListboxItem key={result.bggId}>{result.title}</ListboxItem>
        ))}
      </Listbox>

      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            initialPage={page}
            onChange={setPage}
            total={totalPages}
          />
        </div>
      )}
    </div>
  );
}
