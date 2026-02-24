
-- Remove overly permissive policies - service role already bypasses RLS
DROP POLICY "Service role can manage PRs" ON public.pull_requests;
DROP POLICY "Service role can manage review comments" ON public.review_comments;
