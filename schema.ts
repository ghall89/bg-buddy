import type { Knex } from 'knex';

import { pg } from './src/lib/knex';

const sharedColumns = (table: Knex.CreateTableBuilder) => {
	table.uuid('id').notNullable().defaultTo(pg.fn.uuid()).index().primary();

	table.timestamps(true, true);
};

async function schema() {
	if (!(await pg.schema.hasTable('games'))) {
		await pg.schema.createTable('games', (table) => {
			sharedColumns(table);
			table.integer('bgg_id').unique().index();
			table.json('data');
		});
	}

	if (!(await pg.schema.hasTable('searches'))) {
		await pg.schema.createTable('searches', (table) => {
			sharedColumns(table);
			table.json('data');
			table.string('query').unique().index();
		});
	}
}

schema();
