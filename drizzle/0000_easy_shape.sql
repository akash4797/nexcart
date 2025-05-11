CREATE TABLE `supplier` (
	`id` int AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	`address` varchar(255) NOT NULL,
	`remark` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP
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
	CONSTRAINT `User_id_unique` UNIQUE(`id`),
	CONSTRAINT `User_email_unique` UNIQUE(`email`)
);
