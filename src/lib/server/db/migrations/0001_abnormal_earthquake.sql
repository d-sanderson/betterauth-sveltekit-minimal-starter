CREATE TABLE `availability_history` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`product_id` text NOT NULL,
	`available` numeric NOT NULL,
	`timestamp` numeric DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_availability_product` ON `availability_history` (`product_id`,`timestamp`);--> statement-breakpoint
CREATE TABLE `friends` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`requester_id` text NOT NULL,
	`addressee_id` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`requested_at` numeric DEFAULT (CURRENT_TIMESTAMP),
	`responded_at` numeric,
	FOREIGN KEY (`requester_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`addressee_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_friends_requester` ON `friends` (`requester_id`);--> statement-breakpoint
CREATE INDEX `idx_friends_addressee` ON `friends` (`addressee_id`,`status`);--> statement-breakpoint
CREATE UNIQUE INDEX `friends_requester_id_addressee_id_unique` ON `friends` (`requester_id`,`addressee_id`);--> statement-breakpoint
CREATE TABLE `db` (
	`id` integer PRIMARY KEY NOT NULL,
	`message` text,
	`country` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `price_history` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`product_id` text NOT NULL,
	`price` text NOT NULL,
	`regular_price` text,
	`sale_price` text,
	`on_sale` numeric NOT NULL,
	`timestamp` numeric DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_price_history_product` ON `price_history` (`product_id`,`timestamp`);--> statement-breakpoint
CREATE TABLE `products` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`category` text NOT NULL,
	`sub_category` text NOT NULL,
	`image_url` text,
	`first_seen` numeric DEFAULT (CURRENT_TIMESTAMP),
	`last_seen` numeric DEFAULT (CURRENT_TIMESTAMP),
	`product_url` text
);
--> statement-breakpoint
CREATE TABLE `sale_history` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`product_id` text NOT NULL,
	`on_sale` numeric NOT NULL,
	`timestamp` numeric DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_sale_product` ON `sale_history` (`product_id`,`timestamp`);--> statement-breakpoint
CREATE TABLE `wishlist_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`wishlist_id` integer NOT NULL,
	`product_id` text NOT NULL,
	`notes` text,
	`priority` integer DEFAULT 0,
	`added_at` numeric DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`wishlist_id`) REFERENCES `wishlists`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_wishlist_items_wishlist` ON `wishlist_items` (`wishlist_id`);--> statement-breakpoint
CREATE INDEX `idx_wishlist_items_product` ON `wishlist_items` (`product_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `wishlist_items_wishlist_id_product_id_unique` ON `wishlist_items` (`wishlist_id`,`product_id`);--> statement-breakpoint
CREATE TABLE `wishlists` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`user_id` text NOT NULL,
	`is_public` integer DEFAULT false NOT NULL,
	`created_at` numeric DEFAULT (CURRENT_TIMESTAMP),
	`updated_at` numeric DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_wishlists_user` ON `wishlists` (`user_id`);