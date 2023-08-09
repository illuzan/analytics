import { sql } from "drizzle-orm";
import { sqliteTable, text, integer, uniqueIndex } from "drizzle-orm/sqlite-core";

export const admin = sqliteTable(
  "admin",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    username: text("username").notNull(),
    password: text("password").notNull(),
    createdAt: integer("createdAt", { mode: "timestamp" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: integer("updatedAt", { mode: "timestamp" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    projectId: integer("projectId").references(() => project.id),
  },
  (admin) => ({
    usernameIdx: uniqueIndex("usernameIdx").on(admin.username),
  })
);

export const project = sqliteTable("project", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  url: text("url").notNull(),
  slug: text("slug").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  isPublic: integer("is_public", { mode: "number" }).default(0).notNull(),
//   userId: integer("user_id").references(() => user.id),
//   pageviewId: integer("pageview_id").references(() => pageview.id),
//   eventId: integer("event_id").references(() => event.id),
//   adminId: integer("admin_id").references(() => admin.id),
});

// export const user = sqliteTable("user", {
//   id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
//   device: text("device"),
//   country: text("country"),
//   createdAt: integer("created_at", { mode: "timestamp" })
//     .default(sql`CURRENT_TIMESTAMP`)
//     .notNull(),
//   updatedAt: integer("updated_at", { mode: "timestamp" })
//     .default(sql`CURRENT_TIMESTAMP`)
//     .notNull(),
//   projectId: integer("project_id").references(() => project.id),
//   pathId: integer("path_id").references(() => path.id),
// });

// export const path = sqliteTable("path", {
//   id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
//   userId: integer("user_id").references(() => user.id),
//   path: text("path").default("/").notNull(),
//   createdAt: integer("created_at", { mode: "timestamp" })
//     .default(sql`CURRENT_TIMESTAMP`)
//     .notNull(),
// });

// export const pageview = sqliteTable("pageview", {
//   id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
//   url: text("url").notNull(),
//   ref: text("ref"),
//   referrer: text("referrer"),
//   utmCampaign: text("utm_campaign"),
//   utmSource: text("utm_source"),
//   utmMedium: text("utm_medium"),
//   createdAt: integer("created_at", { mode: "timestamp" })
//     .default(sql`CURRENT_TIMESTAMP`)
//     .notNull(),
//   projectId: integer("project_id").references(() => project.id),
// });

// export const event = sqliteTable("event", {
//   id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
//   url: text("url").notNull(),
//   name: text("name").notNull(),
//   createdAt: integer("created_at", { mode: "timestamp" })
//     .default(sql`CURRENT_TIMESTAMP`)
//     .notNull(),
//   projectId: integer("project_id").references(() => project.id),
// });
