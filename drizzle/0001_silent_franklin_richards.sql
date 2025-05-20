RENAME TABLE `User` TO `user`;--> statement-breakpoint
ALTER TABLE `user` DROP INDEX `User_id_unique`;--> statement-breakpoint
ALTER TABLE `user` DROP INDEX `User_email_unique`;--> statement-breakpoint
ALTER TABLE `user` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `user` ADD PRIMARY KEY(`id`);--> statement-breakpoint
ALTER TABLE `user` ADD CONSTRAINT `user_id_unique` UNIQUE(`id`);--> statement-breakpoint
ALTER TABLE `user` ADD CONSTRAINT `user_email_unique` UNIQUE(`email`);