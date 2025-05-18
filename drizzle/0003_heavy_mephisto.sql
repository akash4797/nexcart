CREATE TABLE `product` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`image` varchar(255),
	`remark` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `product_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `purchase` (
	`id` int AUTO_INCREMENT NOT NULL,
	`product_id` int NOT NULL,
	`supplier_id` int NOT NULL,
	`quantity` int NOT NULL,
	`buy_price` int NOT NULL,
	`sell_price` int NOT NULL,
	`remark` varchar(255),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `purchase_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `purchase` ADD CONSTRAINT `purchase_product_id_product_id_fk` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `purchase` ADD CONSTRAINT `purchase_supplier_id_supplier_id_fk` FOREIGN KEY (`supplier_id`) REFERENCES `supplier`(`id`) ON DELETE no action ON UPDATE no action;