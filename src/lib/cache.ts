import { pg } from './knex';

export async function handleCache(
	table: string,
	id: string,
	dataFunction: () => Promise<string>,
): Promise<Response> {
	let response: string;

	const allowedTables = ['games'];
	if (!allowedTables.includes(table)) {
		throw new Error('Invalid table name');
	}

	// const cachedData = await db.select(table, 'bgg_id', id);

	const cachedData = await pg.select().from(table).where({
		bgg_id: id,
	});

	if (cachedData.length === 0) {
		const fetchedData = await dataFunction();
		const dataAsString = JSON.stringify(fetchedData);

		await pg.insert({ bgg_id: id, data: dataAsString }).into(table);

		response = dataAsString;
	} else {
		console.log('Getting data from cache');
		response = cachedData[0].data;
	}

	return new Response(response);
}
