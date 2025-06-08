ALTER TABLE "game_info" ADD COLUMN "game_id" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "game" ADD COLUMN "game_info_id" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "play_log" ADD COLUMN "game_id" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "play_log" ADD COLUMN "user_game_id" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "play_log" ADD COLUMN "creator_id" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "user_games" ADD COLUMN "game_id" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "game_info" ADD CONSTRAINT "game_info_game_id_unique" UNIQUE("game_id");--> statement-breakpoint
ALTER TABLE "game" ADD CONSTRAINT "game_game_info_id_unique" UNIQUE("game_info_id");--> statement-breakpoint
ALTER TABLE "play_log" ADD CONSTRAINT "play_log_game_id_unique" UNIQUE("game_id");--> statement-breakpoint
ALTER TABLE "play_log" ADD CONSTRAINT "play_log_user_game_id_unique" UNIQUE("user_game_id");--> statement-breakpoint
ALTER TABLE "play_log" ADD CONSTRAINT "play_log_creator_id_unique" UNIQUE("creator_id");--> statement-breakpoint
ALTER TABLE "user_games" ADD CONSTRAINT "user_games_game_id_unique" UNIQUE("game_id");