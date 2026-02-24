
-- Role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'member');

-- Profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- User roles (separate table for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);

-- Teams
CREATE TABLE public.teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;

-- Team members
CREATE TABLE public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'member',
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (team_id, user_id)
);
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Team RLS: members can view their teams
CREATE POLICY "Team members can view team" ON public.teams FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.team_members WHERE team_members.team_id = teams.id AND team_members.user_id = auth.uid()));
CREATE POLICY "Admins can update team" ON public.teams FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.team_members WHERE team_members.team_id = teams.id AND team_members.user_id = auth.uid() AND team_members.role = 'admin'));
CREATE POLICY "Authenticated users can create teams" ON public.teams FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Members can view team members" ON public.team_members FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.team_members AS tm WHERE tm.team_id = team_members.team_id AND tm.user_id = auth.uid()));
CREATE POLICY "Admins can manage team members" ON public.team_members FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.team_members AS tm WHERE tm.team_id = team_members.team_id AND tm.user_id = auth.uid() AND tm.role = 'admin'));
CREATE POLICY "Admins can remove team members" ON public.team_members FOR DELETE
  USING (EXISTS (SELECT 1 FROM public.team_members AS tm WHERE tm.team_id = team_members.team_id AND tm.user_id = auth.uid() AND tm.role = 'admin'));

-- Repositories
CREATE TABLE public.repositories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE NOT NULL,
  github_repo_id BIGINT NOT NULL,
  full_name TEXT NOT NULL,
  owner TEXT NOT NULL,
  name TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  webhook_id BIGINT,
  default_branch TEXT DEFAULT 'main',
  ignore_patterns TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.repositories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team members can view repos" ON public.repositories FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.team_members WHERE team_members.team_id = repositories.team_id AND team_members.user_id = auth.uid()));
CREATE POLICY "Admins can manage repos" ON public.repositories FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.team_members WHERE team_members.team_id = repositories.team_id AND team_members.user_id = auth.uid() AND team_members.role = 'admin'));
CREATE POLICY "Admins can update repos" ON public.repositories FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.team_members WHERE team_members.team_id = repositories.team_id AND team_members.user_id = auth.uid() AND team_members.role = 'admin'));
CREATE POLICY "Admins can delete repos" ON public.repositories FOR DELETE
  USING (EXISTS (SELECT 1 FROM public.team_members WHERE team_members.team_id = repositories.team_id AND team_members.user_id = auth.uid() AND team_members.role = 'admin'));

-- Pull requests
CREATE TABLE public.pull_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  repository_id UUID REFERENCES public.repositories(id) ON DELETE CASCADE NOT NULL,
  github_pr_id BIGINT NOT NULL,
  pr_number INT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  author TEXT NOT NULL,
  source_branch TEXT NOT NULL,
  target_branch TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'reviewed', 'error')),
  review_status TEXT CHECK (review_status IN ('approved', 'changes_requested', 'commented')),
  issues_found INT DEFAULT 0,
  github_url TEXT,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.pull_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team members can view PRs" ON public.pull_requests FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.repositories r
    JOIN public.team_members tm ON tm.team_id = r.team_id
    WHERE r.id = pull_requests.repository_id AND tm.user_id = auth.uid()
  ));

-- Review comments
CREATE TABLE public.review_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pull_request_id UUID REFERENCES public.pull_requests(id) ON DELETE CASCADE NOT NULL,
  file_path TEXT NOT NULL,
  line_number INT,
  category TEXT NOT NULL CHECK (category IN ('security', 'performance', 'code_quality', 'best_practices', 'naming', 'error_handling')),
  severity TEXT NOT NULL CHECK (severity IN ('error', 'warning', 'suggestion')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  suggested_fix TEXT,
  posted_to_github BOOLEAN DEFAULT false,
  github_comment_id BIGINT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.review_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team members can view review comments" ON public.review_comments FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.pull_requests pr
    JOIN public.repositories r ON r.id = pr.repository_id
    JOIN public.team_members tm ON tm.team_id = r.team_id
    WHERE pr.id = review_comments.pull_request_id AND tm.user_id = auth.uid()
  ));

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_teams_updated_at BEFORE UPDATE ON public.teams FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_repositories_updated_at BEFORE UPDATE ON public.repositories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_pull_requests_updated_at BEFORE UPDATE ON public.pull_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
