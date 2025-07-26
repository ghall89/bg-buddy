import Knex from 'knex';

export const pg = Knex({
	client: 'pg',
	connection: process.env.DATABASE_URL,
});
