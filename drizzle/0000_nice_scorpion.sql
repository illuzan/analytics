CREATE TABLE admin (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text NOT NULL,
	`password_hash` text NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`project_id` integer,
	FOREIGN KEY (`project_id`) REFERENCES project(`id`)
);

CREATE TABLE event (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`url` text NOT NULL,
	`name` text NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`project_id` integer,
	FOREIGN KEY (`project_id`) REFERENCES project(`id`)
);

CREATE TABLE pageview (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`url` text NOT NULL,
	`ref` text,
	`referrer` text,
	`utm_campaign` text,
	`utm_source` text,
	`utm_medium` text,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`project_id` integer,
	FOREIGN KEY (`project_id`) REFERENCES project(`id`)
);

CREATE TABLE path (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer,
	`path` text DEFAULT ('/') NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES user(`id`)
);

CREATE TABLE project (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`device` text NOT NULL,
	`country` text NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`is_public` integer DEFAULT 0 NOT NULL,
	`user_id` integer,
	`pageview_id` integer,
	`event_id` integer,
	`admin_id` integer,
	FOREIGN KEY (`user_id`) REFERENCES user(`id`),
	FOREIGN KEY (`pageview_id`) REFERENCES pageview(`id`),
	FOREIGN KEY (`event_id`) REFERENCES event(`id`),
	FOREIGN KEY (`admin_id`) REFERENCES admin(`id`)
);

CREATE TABLE user (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`device` text,
	`country` text,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`project_id` integer,
	`path_id` integer,
	FOREIGN KEY (`project_id`) REFERENCES project(`id`),
	FOREIGN KEY (`path_id`) REFERENCES path(`id`)
);
