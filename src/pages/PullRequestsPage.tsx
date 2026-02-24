import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { Link } from "react-router";


export default function PullRequestsPage() {

  const prs = [];



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
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pull Requests</h1>
          <p className="text-muted-foreground">All reviewed pull requests across your repositories.</p>
        </div>

        <Card>
          <CardContent className="pt-6">
            {!prs || prs.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No pull requests yet.</p>
            ) : (
              <div className="space-y-2">
                {prs.map((pr: any) => (
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
                        <Badge variant="outline" className="text-xs">{pr.issues_found} issues</Badge>
                      )}
                      <Badge variant={pr.status === "reviewed" ? "default" : "secondary"} className="capitalize text-xs">
                        {pr.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground hidden sm:inline">
                        {formatDistanceToNow(new Date(pr.created_at), { addSuffix: true })}
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
