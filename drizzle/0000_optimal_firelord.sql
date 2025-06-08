CREATE TABLE "account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text
);
--> statement-breakpoint
CREATE TABLE "authenticator" (
	"credentialID" text NOT NULL,
	"userId" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"credentialPublicKey" text NOT NULL,
	"counter" integer NOT NULL,
	"credentialDeviceType" text NOT NULL,
	"credentialBackedUp" boolean NOT NULL,
	"transports" text,
	CONSTRAINT "authenticator_credentialID_unique" UNIQUE("credentialID")
);
--> statement-breakpoint
CREATE TABLE "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
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
--> statement-breakpoint
CREATE TABLE "play_log_player" (
	"id" varchar PRIMARY KEY NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"name" varchar NOT NULL,
	"score" integer,
	"is_winner" boolean,
	"user_id" varchar,
	"play_log_id" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "play_log" (
	"id" varchar PRIMARY KEY NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"played_date" date NOT NULL,
	"game_id" varchar NOT NULL,
	"user_game_id" varchar NOT NULL,
	"creator_id" varchar NOT NULL,
	CONSTRAINT "play_log_game_id_unique" UNIQUE("game_id"),
	CONSTRAINT "play_log_user_game_id_unique" UNIQUE("user_game_id"),
	CONSTRAINT "play_log_creator_id_unique" UNIQUE("creator_id")
);
--> statement-breakpoint
CREATE TABLE "user_games" (
	"id" varchar PRIMARY KEY NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"played" boolean DEFAULT false NOT NULL,
	"want_to_play" boolean DEFAULT false NOT NULL,
	"owned" boolean DEFAULT false NOT NULL,
	"wishlist" boolean DEFAULT false NOT NULL,
	"previously_owned" boolean DEFAULT false NOT NULL,
	"rating" smallint,
	"game_id" varchar NOT NULL,
	CONSTRAINT "user_games_game_id_unique" UNIQUE("game_id")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" varchar PRIMARY KEY NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"name" varchar,
	"email" varchar NOT NULL,
	"email_verified" timestamp,
	"password" varchar NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "authenticator" ADD CONSTRAINT "authenticator_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "play_log_player" ADD CONSTRAINT "play_log_player_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "play_log_player" ADD CONSTRAINT "play_log_player_play_log_id_play_log_id_fk" FOREIGN KEY ("play_log_id") REFERENCES "public"."play_log"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "play_log" ADD CONSTRAINT "play_log_game_id_game_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."game"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "play_log" ADD CONSTRAINT "play_log_user_game_id_user_games_id_fk" FOREIGN KEY ("user_game_id") REFERENCES "public"."user_games"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "play_log" ADD CONSTRAINT "play_log_creator_id_user_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_games" ADD CONSTRAINT "user_games_game_id_game_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."game"("id") ON DELETE no action ON UPDATE no action;