'use client';

import { Button, Input } from '@heroui/react';
import { Search } from 'lucide-react';

interface SearchFieldProps {
  query: string;
  placeholder?: string;
  setQuery: (q: string) => void;
  searchAction: () => void;
}

export default function SearchField({
  query,
  placeholder = '',
  setQuery,
  searchAction,
}: SearchFieldProps) {
  return (
    <form
      className="flex flex-row gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        searchAction();
      }}
    >
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
      />
      <Button isIconOnly color="primary">
        <Search onClick={searchAction} />
      </Button>
    </form>
  );
}
