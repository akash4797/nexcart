CREATE TABLE `inventory` (
	`id` int AUTO_INCREMENT NOT NULL,
	`product_id` int NOT NULL,
	`total_quantity` int NOT NULL DEFAULT 0,
	`updated_at` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `inventory_id` PRIMARY KEY(`id`),
	CONSTRAINT `inventory_product_id_unique` UNIQUE(`product_id`)
);
--> statement-breakpoint
ALTER TABLE `inventory` ADD CONSTRAINT `inventory_product_id_product_id_fk` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE no action ON UPDATE no action;