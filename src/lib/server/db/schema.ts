import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const employee = sqliteTable('user', {
	id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	startDate: integer('start_date', { mode: 'timestamp_ms' }).notNull(),
	endDate: integer('end_date', { mode: 'timestamp_ms' }).notNull(),
	createdAt: integer('created_at', { mode: 'timestamp_ms' })
		.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
		.notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
		.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`),
	title: text('title').notNull(),
	department: text('department').notNull(),
});

export * from './better-auth-schema';
