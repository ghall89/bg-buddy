ALTER TABLE "play_log" DROP CONSTRAINT "play_log_game_id_unique";--> statement-breakpoint
ALTER TABLE "play_log" DROP CONSTRAINT "play_log_game_id_game_id_fk";
--> statement-breakpoint
ALTER TABLE "user_games" ADD COLUMN "user_id" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "user_games" ADD CONSTRAINT "user_games_user_id_game_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."game"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "play_log" DROP COLUMN "game_id";--> statement-breakpoint
ALTER TABLE "user_games" ADD CONSTRAINT "user_games_user_id_unique" UNIQUE("user_id");