
-- Add unique constraint for PR upsert operations
ALTER TABLE public.pull_requests ADD CONSTRAINT pull_requests_repo_github_unique UNIQUE (repository_id, github_pr_id);

-- Allow service role to insert/update pull_requests and review_comments (for edge functions)
CREATE POLICY "Service role can manage PRs" ON public.pull_requests FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role can manage review comments" ON public.review_comments FOR ALL USING (true) WITH CHECK (true);
