import { Table } from '@radix-ui/themes';
import type { SearchResult } from 'bgg-client';

interface ResultsTableProps {
	results: SearchResult[];
}

export function ResultsTable({ results }: ResultsTableProps) {
	return (
		<Table.Root>
			<Table.Body>
				{results.map((result) => (
					<Table.Row key={result.bggId}>
						<Table.RowHeaderCell>{result.title}</Table.RowHeaderCell>
					</Table.Row>
				))}
			</Table.Body>
		</Table.Root>
	);
}
