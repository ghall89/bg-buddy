ALTER TABLE "user_games" DROP CONSTRAINT "user_games_game_id_unique";--> statement-breakpoint
ALTER TABLE "user_games" DROP CONSTRAINT "user_games_user_id_unique";--> statement-breakpoint
ALTER TABLE "user_games" DROP CONSTRAINT "user_games_user_id_game_id_fk";
--> statement-breakpoint
ALTER TABLE "user_games" ADD CONSTRAINT "user_games_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;