CREATE TABLE `likes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`product_id` text NOT NULL,
	`created_at` numeric DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_likes_user` ON `likes` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_likes_product` ON `likes` (`product_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `likes_user_id_product_id_unique` ON `likes` (`user_id`,`product_id`);