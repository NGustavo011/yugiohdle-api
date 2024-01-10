CREATE TABLE IF NOT EXISTS "card" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"frameType" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"atk" numeric,
	"def" numeric,
	"level" numeric,
	"race" varchar(255) NOT NULL,
	"attribute" varchar(255),
	"archetype" varchar(255),
	"imageUrl" varchar(255) NOT NULL,
	"imageUrlSmall" varchar(255) NOT NULL,
	"imageUrlCropped" varchar(255) NOT NULL
);
