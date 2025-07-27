import { pg } from './knex';

export async function handleCache(
	table: string,
	key: string,
	value: string,
	dataFunction: () => Promise<string>,
): Promise<Response> {
	let response: string;

	const cachedData = await pg
		.select()
		.from(table)
		.where({
			[key]: value,
		});

	if (cachedData.length === 0) {
		const fetchedData = await dataFunction();
		const dataAsString = JSON.stringify(fetchedData);

		const newItem = await pg
			.insert({ [key]: value, data: dataAsString }, ['data'])
			.into(table);

		response = newItem[0].data;
	} else {
		console.log('Getting data from cache');
		response = cachedData[0].data;
	}

	return new Response(response);
}
