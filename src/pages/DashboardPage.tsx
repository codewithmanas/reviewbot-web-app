import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle2, Clock, GitPullRequest, Shield, Zap } from "lucide-react";
import { Link } from "react-router";
import { formatDistanceToNow } from "date-fns";


function DashboardPage() {

  const teamIds = [];

  const hasTeam = teamIds.length > 0;

  const recentPRs = [];

  // const recentPRs = [{

  //   id: '',
  //   repository_id: '',
  //   repositories: {
  //       full_name: '',
  //   },
  //   github_pr_id: 0,
  //   pr_number: 0,
  //   title: '',
  //   description: '',
  //   author: '',
  //   source_branch: '',
  //   target_branch: '',
  //   status: 'pending',
  //   review_status: 'approved',
  //   issues_found: 0,
  //   github_url: '',
  //   reviewed_at: '',
  //   created_at: '',
  //   updated_at: ''
  // }];

  const stats = {
    totalPRs: 0,
    issuesFound: 0,
    reposCount: 0,
  };

    const statusIcon = (status: string) => {
    switch (status) {
      case "reviewed": return <CheckCircle2 className="w-4 h-4 text-primary" />;
      case "reviewing": return <Clock className="w-4 h-4 text-warning" />;
      case "error": return <AlertTriangle className="w-4 h-4 text-destructive" />;
      default: return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };


  return (
    <DashboardLayout>

        <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">Overview of your PR review activity.</p>
            </div>

        {!hasTeam && (
          <Card className="border-primary/30 glow-primary">
            <CardContent className="pt-6">
              <div className="text-center space-y-3">
                <h3 className="font-semibold text-lg">Welcome to ReviewBot!</h3>
                <p className="text-muted-foreground text-sm">Create a team and connect your GitHub repositories to get started.</p>
                <div className="flex gap-3 justify-center">
                  <Link to="/dashboard/team">
                    <Badge className="cursor-pointer px-4 py-2" variant="default">Create Team</Badge>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">PRs Reviewed</CardTitle>
              <GitPullRequest className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats?.totalPRs ?? 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Issues Found</CardTitle>
              <Shield className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats?.issuesFound ?? 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Repositories</CardTitle>
              <Zap className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats?.reposCount ?? 0}</div>
            </CardContent>
          </Card>
        </div>


        {/* Recent PRs */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Pull Requests</CardTitle>
          </CardHeader>
          <CardContent>
            {!recentPRs || recentPRs.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No pull requests yet. Connect a repository to get started.</p>
            ) : (
              <div className="space-y-3">
                {recentPRs.map((pr) => (
                  <Link
                    key={pr.id}
                    to={`/dashboard/pulls/${pr.id}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  >
                    {statusIcon(pr.status)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{pr.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {pr.repositories?.full_name} #{pr.pr_number} · {pr.author}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {pr.issues_found > 0 && (
                        <Badge variant="outline" className="text-xs">
                          {pr.issues_found} issues
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {pr.created_at ? formatDistanceToNow(new Date(pr.created_at), { addSuffix: true }) : ""}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>



        </div>
    </DashboardLayout>
  )
}

export default DashboardPage;