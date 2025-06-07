ALTER TABLE `inventory` RENAME COLUMN `total_quantity` TO `quantity`;--> statement-breakpoint
ALTER TABLE `inventory` ADD `avgBuyPrice` decimal(10,2) NOT NULL;--> statement-breakpoint
ALTER TABLE `inventory` ADD `sellingPrice` decimal(10,2);--> statement-breakpoint
ALTER TABLE `purchase` DROP COLUMN `sell_price`;