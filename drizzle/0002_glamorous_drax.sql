ALTER TABLE `purchase` DROP FOREIGN KEY `purchase_product_id_product_id_fk`;
--> statement-breakpoint
ALTER TABLE `purchase` MODIFY COLUMN `product_id` int;--> statement-breakpoint
ALTER TABLE `purchase` ADD CONSTRAINT `purchase_product_id_product_id_fk` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE set null ON UPDATE cascade;