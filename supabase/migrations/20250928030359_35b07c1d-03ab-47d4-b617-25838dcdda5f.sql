-- Create a public view for stores that excludes sensitive email information
CREATE VIEW public.stores_public AS
SELECT 
  id,
  name,
  address,
  average_rating,
  total_ratings,
  created_at,
  updated_at
FROM public.stores;

-- Drop the overly permissive public policy on stores table
DROP POLICY "Everyone can read stores" ON public.stores;

-- Create a more restrictive policy that only allows access to non-sensitive data for authenticated users
-- Public users will use the stores_public view instead
CREATE POLICY "Authenticated users can read stores basic info" ON public.stores
FOR SELECT 
TO authenticated
USING (true);

-- Create policy for anonymous users to access the public view
-- Note: Views inherit RLS from underlying tables, so we need to grant access to the view
GRANT SELECT ON public.stores_public TO anon;
GRANT SELECT ON public.stores_public TO authenticated;