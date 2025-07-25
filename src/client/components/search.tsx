import type { SearchResult } from 'bgg-client';
import { create } from 'zustand';

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

export function Search() {
  const { setQuery, handleSearch, results } = searchStore();

  return (
    <>
      <form action="submit" onSubmit={handleSearch}>
        <input
          type="text"
          name="Search"
          id="search-field"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button>Search</button>
      </form>
      {results.length >= 1 && (
        <ul>
          {results.map((result) => (
            <li key={result.bggId}>
              <a href={`/game/${result.bggId}`}>{result.title}</a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
