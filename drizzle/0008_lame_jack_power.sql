ALTER TABLE `product` ADD `image_key` int;--> statement-breakpoint
ALTER TABLE `product` DROP COLUMN `image_medium`;--> statement-breakpoint
ALTER TABLE `product` DROP COLUMN `image_thumbnail`;--> statement-breakpoint
ALTER TABLE `product` DROP COLUMN `image_id`;