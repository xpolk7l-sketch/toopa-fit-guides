-- Tighten update policy: only allow attaching a receipt once, while pending
DROP POLICY IF EXISTS "Anyone can attach receipt" ON public.orders;
CREATE POLICY "Attach receipt once while pending" ON public.orders
  FOR UPDATE TO anon, authenticated
  USING (receipt_url IS NULL AND status = 'pending')
  WITH CHECK (status = 'pending');

-- Storage: allow anyone to upload to the receipts bucket (private bucket, no reads)
CREATE POLICY "Anyone can upload receipts" ON storage.objects
  FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'receipts');
