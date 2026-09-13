CREATE TABLE "email_suppressions" (
	"email" text PRIMARY KEY NOT NULL,
	"reason" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "email_suppressions" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "review_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"token" text NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"project_type" text,
	"completed_at" date,
	"start_at" date NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"stopped_reason" text,
	"stopped_at" timestamp with time zone,
	"responded_at" timestamp with time zone,
	"rating" integer,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "review_requests" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "review_touches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"request_id" uuid NOT NULL,
	"n" integer NOT NULL,
	"sent_at" timestamp with time zone DEFAULT now() NOT NULL,
	"provider_id" text
);
--> statement-breakpoint
ALTER TABLE "review_touches" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "review_touches" ADD CONSTRAINT "review_touches_request_id_review_requests_id_fk" FOREIGN KEY ("request_id") REFERENCES "public"."review_requests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "review_requests_token_idx" ON "review_requests" USING btree ("token");--> statement-breakpoint
CREATE INDEX "review_requests_due_idx" ON "review_requests" USING btree ("status","start_at");--> statement-breakpoint
CREATE INDEX "review_requests_email_idx" ON "review_requests" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "review_touches_request_n_idx" ON "review_touches" USING btree ("request_id","n");