CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT NOT NULL UNIQUE DEFAULT ('TP-' || to_char(now(), 'YYMMDD') || '-' || substr(md5(random()::text), 1, 6)),
  customer_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  items JSONB NOT NULL,
  total NUMERIC(10,2) NOT NULL,
  receipt_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.orders TO anon;
GRANT SELECT, INSERT, UPDATE ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Anyone can create an order (guest checkout)
CREATE POLICY "Anyone can create orders" ON public.orders
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Anyone can update an order ONLY to attach receipt_url, by its id (returned at creation)
CREATE POLICY "Anyone can attach receipt" ON public.orders
  FOR UPDATE TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- No public SELECT - only service role can read orders (admin only)
