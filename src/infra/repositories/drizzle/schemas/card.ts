import { pgTable, uuid, varchar, numeric, boolean } from "drizzle-orm/pg-core";

export type Modes = "availableClassicDailyCard" | "availableArtDailyCard";

export const card = pgTable("card", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: varchar("name", { length: 255 }).notNull(),
	type: varchar("type", { length: 255 }).notNull(),
	frameType: varchar("frameType", { length: 255 }).notNull(),
	description: varchar("description", { length: 1080 }).notNull(),
	atk: numeric("atk"),
	def: numeric("def"),
	level: numeric("level"),
	race: varchar("race", { length: 255 }).notNull(),
	attribute: varchar("attribute", { length: 255 }),
	archetype: varchar("archetype", { length: 255 }),
	imageUrl: varchar("imageUrl", { length: 255 }).notNull(),
	imageUrlSmall: varchar("imageUrlSmall", { length: 255 }).notNull(),
	imageUrlCropped: varchar("imageUrlCropped", { length: 255 }).notNull(),
	availableClassicDailyCard: boolean("availableClassicDailyCard"),
	availableArtDailyCard: boolean("availableArtDailyCard"),
});
