CREATE TABLE `inventory` (
	`id` int AUTO_INCREMENT NOT NULL,
	`product_id` int NOT NULL,
	`total_quantity` int NOT NULL DEFAULT 0,
	`updated_at` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `inventory_id` PRIMARY KEY(`id`),
	CONSTRAINT `inventory_product_id_unique` UNIQUE(`product_id`)
);
--> statement-breakpoint
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
	`supplier_id` int,
	`quantity` int NOT NULL,
	`buy_price` int NOT NULL,
	`sell_price` int NOT NULL,
	`other_expense` int NOT NULL DEFAULT 0,
	`remark` varchar(255),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `purchase_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `supplier` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`address` varchar(255),
	`contact` varchar(255),
	`remark` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `supplier_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `User` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255),
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`role` varchar(50) NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `User_id` PRIMARY KEY(`id`),
	CONSTRAINT `User_id_unique` UNIQUE(`id`),
	CONSTRAINT `User_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `inventory` ADD CONSTRAINT `inventory_product_id_product_id_fk` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `purchase` ADD CONSTRAINT `purchase_product_id_product_id_fk` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `purchase` ADD CONSTRAINT `purchase_supplier_id_supplier_id_fk` FOREIGN KEY (`supplier_id`) REFERENCES `supplier`(`id`) ON DELETE set null ON UPDATE cascade;