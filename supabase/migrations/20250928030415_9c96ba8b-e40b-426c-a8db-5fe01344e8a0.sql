-- Fix the security definer view issue by recreating the view with SECURITY INVOKER
DROP VIEW public.stores_public;

CREATE VIEW public.stores_public 
WITH (security_invoker = true) AS
SELECT 
  id,
  name,
  address,
  average_rating,
  total_ratings,
  created_at,
  updated_at
FROM public.stores;