ALTER TABLE users -- The customer's billing address, stored in JSON format.
ADD COLUMN billing_address JSONB,
  -- Stores your customer's payment instruments.
ADD COLUMN payment_method JSONB;

/**
 * CUSTOMERS
 */
CREATE TABLE IF NOT EXISTS customers (
  -- UUID from auth.users
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  -- The user's customer ID in Stripe. User must only be allowed to create and not update this.
  stripe_customer_id TEXT
);

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own customer data." ON customers FOR
SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert their own customer data." ON customers AS PERMISSIVE FOR
INSERT TO PUBLIC WITH CHECK (auth.uid() = id);

/** 
 * PRODUCTS
 * Note: products are created and managed in Stripe and synced to our DB via Stripe webhooks.
 */
CREATE TABLE IF NOT EXISTS products (
  -- Product ID from Stripe, e.g. prod_1234.
  id TEXT PRIMARY KEY,
  -- Whether the product is currently available for purchase.
  active BOOLEAN,
  -- The product's name, meant to be displayable to the customer. Whenever this product is sold via a subscription, name will show up on associated invoice line item descriptions.
  NAME TEXT,
  -- The product's description, meant to be displayable to the customer. Use this field to optionally store a long form explanation of the product being sold for your own rendering purposes.
  description TEXT,
  -- A URL of the product image in Stripe, meant to be displayable to the customer.
  image TEXT,
  -- Set of key-value pairs, used to store additional information about the object in a structured format.
  metadata JSONB
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read-only access." ON products FOR
SELECT USING (TRUE);

/**
 * PRICES
 * Note: prices are created and managed in Stripe and synced to our DB via Stripe webhooks.
 */
DROP TYPE IF EXISTS pricing_type;

CREATE TYPE pricing_type AS ENUM ('one_time', 'recurring');

DROP TYPE IF EXISTS pricing_plan_interval;

CREATE TYPE pricing_plan_interval AS ENUM ('day', 'week', 'month', 'year');

CREATE TABLE IF NOT EXISTS prices (
  -- Price ID from Stripe, e.g. price_1234.
  id TEXT PRIMARY KEY,
  -- The ID of the product that this price belongs to.
  product_id TEXT REFERENCES products(id),
  -- Whether the price can be used for new purchases.
  active BOOLEAN,
  -- A brief description of the price.
  description TEXT,
  -- The unit amount as a positive integer in the smallest currency unit (e.g., 100 cents for US$1.00 or 100 for ¥100, a zero-decimal currency).
  unit_amount BIGINT,
  -- Three-letter ISO currency code, in lowercase.
  currency TEXT CHECK (CHAR_LENGTH(currency) = 3),
  -- One of `one_time` or `recurring` depending on whether the price is for a one-time purchase or a recurring (subscription) purchase.
  TYPE pricing_type,
  -- The frequency at which a subscription is billed. One of `day`, `week`, `month` or `year`.
  INTERVAL pricing_plan_interval,
  -- The number of intervals (specified in the `interval` attribute) between subscription billings. For example, `interval=month` and `interval_count=3` bills every 3 months.
  interval_count INTEGER,
  -- Default number of trial days when subscribing a customer to this price using [`trial_from_plan=true`](https://stripe.com/docs/api#create_subscription-trial_from_plan).
  trial_period_days INTEGER,
  -- Set of key-value pairs, used to store additional information about the object in a structured format.
  metadata JSONB
);

ALTER TABLE prices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read-only access." ON prices FOR
SELECT USING (TRUE);

/**
 * SUBSCRIPTIONS
 * Note: subscriptions are created and managed in Stripe and synced to our DB via Stripe webhooks.
 */
DROP TYPE IF EXISTS subscription_status;

CREATE TYPE subscription_status AS ENUM (
  'trialing',
  'active',
  'canceled',
  'incomplete',
  'incomplete_expired',
  'past_due',
  'unpaid',
  'paused'
);

CREATE TABLE IF NOT EXISTS subscriptions (
  -- Subscription ID from Stripe, e.g. sub_1234.
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  -- The status of the subscription object, one of subscription_status type above.
  status subscription_status,
  -- Set of key-value pairs, used to store additional information about the object in a structured format.
  metadata JSONB,
  -- ID of the price that created this subscription.
  price_id TEXT REFERENCES prices(id),
  -- Quantity multiplied by the unit amount of the price creates the amount of the subscription. Can be used to charge multiple seats.
  quantity INTEGER,
  -- If true the subscription has been canceled by the user and will be deleted at the end of the billing period.
  cancel_at_period_end BOOLEAN,
  -- Time at which the subscription was created.
  created TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  -- Start of the current period that the subscription has been invoiced for.
  current_period_start TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  -- End of the current period that the subscription has been invoiced for. At the end of this period, a new invoice will be created.
  current_period_end TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  -- If the subscription has ended, the timestamp of the date the subscription ended.
  ended_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()),
  -- A date in the future at which the subscription will automatically get canceled.
  cancel_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()),
  -- If the subscription has been canceled, the date of that cancellation. If the subscription was canceled with `cancel_at_period_end`, `canceled_at` will still reflect the date of the initial cancellation request, not the end of the subscription period when the subscription is automatically moved to a canceled state.
  canceled_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()),
  -- If the subscription has a trial, the beginning of that trial.
  trial_start TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()),
  -- If the subscription has a trial, the end of that trial.
  trial_end TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW())
);

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Can only view own subs data." ON subscriptions FOR
SELECT USING (auth.uid() = user_id);