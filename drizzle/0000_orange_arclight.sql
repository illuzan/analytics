CREATE TABLE cities (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`country_id` integer,
	FOREIGN KEY (`country_id`) REFERENCES countries(`id`)
);

CREATE TABLE countries (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text
);

CREATE UNIQUE INDEX nameIdx ON countries (`name`);