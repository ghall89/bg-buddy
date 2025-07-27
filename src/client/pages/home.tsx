import { Heading } from '@radix-ui/themes';
import { ResultsTable } from '../components/results-table';
import { SearchField } from '../components/search-field';
import { Layout } from '../layout';
import { searchStore } from '../stores/search-store';

export function HomePage() {
	const store = searchStore();

	return (
		<Layout>
			<Heading as="h1">Find a game</Heading>
			<SearchField
				value={store.query}
				setValue={store.setQuery}
				submit={store.handleSearch}
			/>
			<ResultsTable results={store.results} />
		</Layout>
	);
}
