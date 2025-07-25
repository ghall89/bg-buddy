import type { NeonQueryFunction } from '@neondatabase/serverless';
import { neon } from '@neondatabase/serverless';

export class DatabaseController {
	url: string;
	sql: NeonQueryFunction<false, false>;

	constructor() {
		this.url = process.env.DATABASE_URL ?? '';
		this.sql = neon(this.url);
	}

	private async query(sqlQuery: string, values?: string[]) {
		try {
			const result = await this.sql.query(sqlQuery, values);

			return result;
		} catch (error) {
			throw Error(`Query Error: ${error}`);
		}
	}

	async select(table: string, key: string, value: any) {
		const result = await this.query(
			`SELECT * FROM ${table} WHERE ${key} = $1`,
			[value],
		);

		return result;
	}

	async insert(
		table: string,
		body: { [key: string]: string | number | boolean | Date },
	) {
		const keys = Object.keys(body).join(',');
		const values = Object.values(body).join(',');

		const result = await this.query(
			`INSERT INTO ${table}(${keys}) VALUES (${values})`,
		);

		return result;
	}
}
