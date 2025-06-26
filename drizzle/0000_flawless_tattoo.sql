CREATE TABLE "game" (
	"id" varchar PRIMARY KEY NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"bgg_id" varchar NOT NULL,
	"title" varchar NOT NULL,
	"min_players" smallint,
	"max_players" smallint,
	"best_player_count" smallint,
	"est_playtime" integer,
	"description" varchar,
	CONSTRAINT "game_bgg_id_unique" UNIQUE("bgg_id")
);
