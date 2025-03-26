CREATE TYPE "public"."status" AS ENUM('pending', 'paid', 'shipped', 'delivered', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."product_category" AS ENUM('ring', 'necklace', 'pendant', 'bracelet');--> statement-breakpoint
CREATE TYPE "public"."payment_method" AS ENUM('creditCard', 'upi');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('pending', 'success', 'failed');--> statement-breakpoint
CREATE TYPE "public"."user_roles" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TYPE "public"."clarity" AS ENUM('SI2', 'SI1', 'VS2', 'VS1', 'VVS2', 'VVS1', 'IF');--> statement-breakpoint
CREATE TYPE "public"."color" AS ENUM('D', 'E', 'F', 'G', 'H');--> statement-breakpoint
CREATE TYPE "public"."cut" AS ENUM('regular', 'best', 'premium');--> statement-breakpoint
CREATE TYPE "public"."shape" AS ENUM('round', 'princess', 'emerald', 'asscher', 'oval', 'pear', 'marquise', 'radiant', 'cushion', 'heart');--> statement-breakpoint
CREATE TYPE "public"."size" AS ENUM('0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4');--> statement-breakpoint
CREATE TYPE "public"."head_style" AS ENUM('Four Prong', 'Six Prong', 'Classic Basket', 'Pave Basket', 'Surprise Diamond', 'Surprise Sapphire', 'Lotus Basket', 'Tulip Basket', 'Scalloped Six Prong', 'Vintage Basket', 'Pave Halo', 'Sapphire Halo', 'French Pave Halo', 'Falling Edge Halo');--> statement-breakpoint
CREATE TYPE "public"."metal" AS ENUM('14K White Gold', '14K Yellow Gold', '14K Rose Gold', '18K White Gold', '18K Yellow Gold', '18K Rose Gold', 'Platinum');--> statement-breakpoint
CREATE TYPE "public"."shank_style" AS ENUM('Solitaire', 'French Pave', 'U Shaped Pave', 'Knife Edge Pave', 'Knife Edge Solitaire', 'Marquise Diamond', 'Marquise Saphire', 'Cathedral Pave', 'Rope Solitaire', 'Rope Pave', 'Sleek Accent', 'Channel Set');--> statement-breakpoint
CREATE TABLE "cart" (
	"cart_id" serial PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	"product_id" integer DEFAULT null,
	"diamond_id" integer DEFAULT null,
	"ring_style_id" integer DEFAULT null,
	"quantity" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "coupons" (
	"coupon_id" serial PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"discount_percentage" integer NOT NULL,
	"expiry_date" date NOT NULL,
	"max_uses" integer DEFAULT 1,
	CONSTRAINT "coupons_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "favorites" (
	"favourite_id" serial PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	"product_id" integer DEFAULT null,
	"diamond_id" integer DEFAULT null,
	"ring_style_id" integer DEFAULT null,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "order_items" (
	"order_item_id" serial PRIMARY KEY NOT NULL,
	"order_id" serial NOT NULL,
	"product_id" serial NOT NULL,
	"diamond_id" serial NOT NULL,
	"ring_style_id" serial NOT NULL,
	"quantity" integer NOT NULL,
	"price" numeric NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"order_id" serial PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	"total_amount" integer NOT NULL,
	"status" "status" DEFAULT 'pending',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products" (
	"product_id" serial PRIMARY KEY NOT NULL,
	"SKU" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"segment" text,
	"name" text NOT NULL,
	"category" "product_category" DEFAULT 'ring',
	"description" text NOT NULL,
	"image_URL" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"gold_quantity" numeric,
	"gold_price" numeric,
	"gold_total" numeric,
	"round_quantity" numeric,
	"round_price" numeric,
	"round_total" numeric,
	"oval_quantity" numeric,
	"oval_price" numeric,
	"oval_total" numeric,
	"marquise_quantity" numeric,
	"marquise_price" numeric,
	"marquise_total" numeric,
	"emerald_quantity" numeric,
	"emerald_price" numeric,
	"emerald_total" numeric,
	"princess_quantity" numeric,
	"princess_price" numeric,
	"princess_total" numeric,
	"pear_quantity" numeric,
	"pear_price" numeric,
	"pear_total" numeric,
	"heart_quantity" numeric,
	"heart_price" numeric,
	"heart_total" numeric,
	"other_diamond_quantity" numeric,
	"other_diamond_price" numeric,
	"other_diamond_total" numeric,
	"gemstone_quantity" numeric,
	"gemstone_price" numeric,
	"gemstone_total" numeric,
	"misc_cost" numeric,
	"labour_cost" numeric,
	"other_cost" numeric,
	"total_cost" numeric
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"review_id" serial PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	"product_id" integer DEFAULT null,
	"diamond_id" integer DEFAULT null,
	"ring_style_id" integer DEFAULT null,
	"rating" integer NOT NULL,
	"image_URL" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"comment" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"transaction_id" serial PRIMARY KEY NOT NULL,
	"order_id" serial NOT NULL,
	"user_id" serial NOT NULL,
	"payment_method" "payment_method" NOT NULL,
	"payment_status" "payment_status" DEFAULT 'pending',
	"payment_date" timestamp with time zone DEFAULT now() NOT NULL,
	"transaction_amount" integer NOT NULL,
	"transaction_reference" text,
	"refunded_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"clerk_user_id" text,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"role" "user_roles" DEFAULT 'user',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_clerk_user_id_unique" UNIQUE("clerk_user_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "master" (
	"master_id" serial PRIMARY KEY NOT NULL,
	"GBP_rate" numeric,
	"INR_rate" numeric,
	"gold_rate" numeric,
	"diamond_rate" numeric,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "diamonds" (
	"diamond_id" serial PRIMARY KEY NOT NULL,
	"SKU" text,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"size" "size" DEFAULT '0.5',
	"image_URL" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"shape" "shape" DEFAULT 'round',
	"cut" "cut" DEFAULT 'regular',
	"color" "color" DEFAULT 'D',
	"clarity" "clarity" DEFAULT 'IF',
	"price" numeric NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ringStyles" (
	"ring_style_id" serial PRIMARY KEY NOT NULL,
	"SKU" text,
	"name" text NOT NULL,
	"image_URL" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"description" text NOT NULL,
	"head_style" "head_style" DEFAULT 'Four Prong',
	"head_style_price" numeric,
	"head_metal" "metal" DEFAULT '14K White Gold',
	"head_metal_price" numeric,
	"shank_style" "shank_style" DEFAULT 'Solitaire',
	"shank_style_price" numeric,
	"shank_metal" "metal" DEFAULT '14K White Gold',
	"shank_metal_price" numeric,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "cart" ADD CONSTRAINT "cart_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart" ADD CONSTRAINT "cart_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart" ADD CONSTRAINT "cart_diamond_id_diamonds_diamond_id_fk" FOREIGN KEY ("diamond_id") REFERENCES "public"."diamonds"("diamond_id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart" ADD CONSTRAINT "cart_ring_style_id_ringStyles_ring_style_id_fk" FOREIGN KEY ("ring_style_id") REFERENCES "public"."ringStyles"("ring_style_id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_diamond_id_diamonds_diamond_id_fk" FOREIGN KEY ("diamond_id") REFERENCES "public"."diamonds"("diamond_id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_ring_style_id_ringStyles_ring_style_id_fk" FOREIGN KEY ("ring_style_id") REFERENCES "public"."ringStyles"("ring_style_id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("order_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_diamond_id_diamonds_diamond_id_fk" FOREIGN KEY ("diamond_id") REFERENCES "public"."diamonds"("diamond_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_ring_style_id_ringStyles_ring_style_id_fk" FOREIGN KEY ("ring_style_id") REFERENCES "public"."ringStyles"("ring_style_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_diamond_id_diamonds_diamond_id_fk" FOREIGN KEY ("diamond_id") REFERENCES "public"."diamonds"("diamond_id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_ring_style_id_ringStyles_ring_style_id_fk" FOREIGN KEY ("ring_style_id") REFERENCES "public"."ringStyles"("ring_style_id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_order_id_orders_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("order_id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE restrict ON UPDATE no action;