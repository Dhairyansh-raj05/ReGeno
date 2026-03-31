-- Orders table
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  order_id text not null unique,
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  delivery_address text not null,
  items jsonb not null,
  total_amount numeric not null,
  status text not null default 'confirmed',
  created_at timestamptz not null default now()
);
alter table orders enable row level security;
drop policy if exists "Anyone can place orders" on orders;
create policy "Anyone can place orders" on orders for insert with check (true);
drop policy if exists "Authenticated can view orders" on orders;
create policy "Authenticated can view orders" on orders for select using (auth.role() = 'authenticated');

-- Newsletter subscribers
create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

-- Products table
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  price text not null,
  category text not null default 'Consoles',
  condition text not null default 'Like New',
  image_url text,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- Sell requests table
create table if not exists sell_requests (
  id uuid primary key default gen_random_uuid(),
  user_name text not null,
  user_email text not null,
  model_id text not null,
  model_name text not null,
  brand text not null,
  condition text not null,
  quoted_price numeric not null,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

-- Enable RLS
alter table newsletter_subscribers enable row level security;
alter table products enable row level security;
alter table sell_requests enable row level security;

-- Drop existing policies before recreating (safe re-run)
drop policy if exists "Anyone can subscribe" on newsletter_subscribers;
drop policy if exists "Public can read published products" on products;
drop policy if exists "Authenticated users can manage products" on products;
drop policy if exists "Anyone can submit sell requests" on sell_requests;
drop policy if exists "Authenticated users can manage sell requests" on sell_requests;
drop policy if exists "Authenticated users can update sell requests" on sell_requests;

-- Newsletter
create policy "Anyone can subscribe"
  on newsletter_subscribers for insert with check (true);

-- Products
create policy "Public can read published products"
  on products for select using (is_published = true);

create policy "Authenticated users can manage products"
  on products for all using (auth.role() = 'authenticated');

-- Sell requests
create policy "Anyone can submit sell requests"
  on sell_requests for insert with check (true);

create policy "Authenticated users can manage sell requests"
  on sell_requests for select using (auth.role() = 'authenticated');

create policy "Authenticated users can update sell requests"
  on sell_requests for update using (auth.role() = 'authenticated');
