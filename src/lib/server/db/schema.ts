import { sql, type InferSelectModel } from 'drizzle-orm';
import { index, integer, numeric, sqliteTable, text, unique } from 'drizzle-orm/sqlite-core';
import { user } from './better-auth-schema';

export const products = sqliteTable("products", {
	id: text().primaryKey(),
	title: text().notNull(),
	category: text().notNull(),
	subCategory: text("sub_category").notNull(),
	imageUrl: text("image_url"),
	firstSeen: numeric("first_seen").default(sql`(CURRENT_TIMESTAMP)`),
	lastSeen: numeric("last_seen").default(sql`(CURRENT_TIMESTAMP)`),
	productUrl: text("product_url"),
});

export const priceHistory = sqliteTable("price_history", {
	id: integer().primaryKey({ autoIncrement: true }),
	productId: text("product_id").notNull().references(() => products.id),
	price: text().notNull(),
	regularPrice: text("regular_price"),
	salePrice: text("sale_price"),
	onSale: numeric("on_sale").notNull(),
	timestamp: numeric().default(sql`(CURRENT_TIMESTAMP)`),
},
	(table) => [
		index("idx_price_history_product").on(table.productId, table.timestamp),
	]);

export const availabilityHistory = sqliteTable("availability_history", {
	id: integer().primaryKey({ autoIncrement: true }),
	productId: text("product_id").notNull().references(() => products.id),
	available: numeric().notNull(),
	timestamp: numeric().default(sql`(CURRENT_TIMESTAMP)`),
},
	(table) => [
		index("idx_availability_product").on(table.productId, table.timestamp),
	]);

export const saleHistory = sqliteTable("sale_history", {
	id: integer().primaryKey({ autoIncrement: true }),
	productId: text("product_id").notNull().references(() => products.id),
	onSale: numeric("on_sale").notNull(),
	timestamp: numeric().default(sql`(CURRENT_TIMESTAMP)`),
},
	(table) => [
		index("idx_sale_product").on(table.productId, table.timestamp),
	]);

// The wishlist container
export const wishlists = sqliteTable("wishlists", {
	id: integer().primaryKey({ autoIncrement: true }),
	name: text().notNull(),
	description: text(),
	userId: text("user_id").notNull().references(() => user.id, {
		onDelete: "cascade",
	}),
	isPublic: integer("is_public", { mode: 'boolean' }).notNull().default(false),
	createdAt: numeric("created_at").default(sql`(CURRENT_TIMESTAMP)`),
	updatedAt: numeric("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
}, (table) => [
	index("idx_wishlists_user").on(table.userId),
]);

// Individual items in a wishlist
export const wishlistItems = sqliteTable("wishlist_items", {
	id: integer().primaryKey({ autoIncrement: true }),
	wishlistId: integer("wishlist_id").notNull().references(() => wishlists.id, {
		onDelete: "cascade", // Delete items when wishlist is deleted
	}),
	productId: text("product_id").notNull().references(() => products.id, {
		onDelete: "cascade", // Delete item if product is deleted
	}),
	notes: text(), // User notes about this specific item
	priority: integer().default(0), // 1=high, 0=normal, -1=low
	addedAt: numeric("added_at").default(sql`(CURRENT_TIMESTAMP)`),
}, (table) => [
	index("idx_wishlist_items_wishlist").on(table.wishlistId),
	index("idx_wishlist_items_product").on(table.productId),
	unique().on(table.wishlistId, table.productId), // Can't add same product twice to one list
]);

export const friends = sqliteTable("friends", {
	id: integer().primaryKey({ autoIncrement: true }),
	// delete friends when user is deleted
	// this is the user that sent the friend request
	requesterId: text("requester_id").notNull().references(() => user.id, {
		onDelete: "cascade",
	}),
	// this is the user that received the friend request
	addresseeId: text("addressee_id").notNull().references(() => user.id, {
		onDelete: "cascade",
	}),
	status: text().notNull().default("pending"), // 'pending' | 'accepted' | 'declined'
	requestedAt: numeric("requested_at").default(sql`(CURRENT_TIMESTAMP)`),
	respondedAt: numeric("responded_at"),
}, (table) => [
	index("idx_friends_requester").on(table.requesterId),
	index("idx_friends_addressee").on(table.addresseeId, table.status),
	unique().on(table.requesterId, table.addresseeId),
]);

export const likes = sqliteTable("likes", {
	id: integer().primaryKey({ autoIncrement: true }),
	userId: text("user_id").notNull().references(() => user.id, {
		onDelete: "cascade",
	}),
	productId: text("product_id").notNull().references(() => products.id, {
		onDelete: "cascade",
	}),
	createdAt: numeric("created_at").default(sql`(CURRENT_TIMESTAMP)`),
}, (table) => [
	index("idx_likes_user").on(table.userId),
	index("idx_likes_product").on(table.productId),
	unique().on(table.userId, table.productId),
]);

export type Product = InferSelectModel<typeof products>
export type PriceHistory = InferSelectModel<typeof priceHistory>
export type AvailabilityHistory = InferSelectModel<typeof availabilityHistory>
export type SaleHistory = InferSelectModel<typeof saleHistory>
export type Wishlist = InferSelectModel<typeof wishlists>
export type WishlistItem = InferSelectModel<typeof wishlistItems>
export type Friend = InferSelectModel<typeof friends>
export type Like = InferSelectModel<typeof likes>

export * from './better-auth-schema';
