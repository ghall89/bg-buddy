ALTER TABLE "user_games" RENAME TO "user_game";--> statement-breakpoint
ALTER TABLE "play_log" DROP CONSTRAINT "play_log_user_game_id_user_games_id_fk";
--> statement-breakpoint
ALTER TABLE "user_game" DROP CONSTRAINT "user_games_game_id_game_id_fk";
--> statement-breakpoint
ALTER TABLE "user_game" DROP CONSTRAINT "user_games_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "play_log" ADD CONSTRAINT "play_log_user_game_id_user_game_id_fk" FOREIGN KEY ("user_game_id") REFERENCES "public"."user_game"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_game" ADD CONSTRAINT "user_game_game_id_game_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."game"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_game" ADD CONSTRAINT "user_game_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;