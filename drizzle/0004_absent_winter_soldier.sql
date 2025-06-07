ALTER TABLE `purchase` MODIFY COLUMN `buy_price` decimal(10,2) NOT NULL;--> statement-breakpoint
ALTER TABLE `inventory` DROP COLUMN `sellingPrice`;