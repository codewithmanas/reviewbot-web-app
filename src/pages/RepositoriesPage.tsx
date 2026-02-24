import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { FolderGit2 } from "lucide-react";


export default function RepositoriesPage() {


  const repos = [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Repositories</h1>
          <p className="text-muted-foreground">Manage your connected GitHub repositories.</p>
        </div>

        {!repos || repos.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <FolderGit2 className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No repositories connected yet.</p>
              <p className="text-xs text-muted-foreground mt-1">Connect your GitHub account to add repositories.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {repos.map((repo) => (
              <Card key={repo.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FolderGit2 className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-sm">{repo.full_name}</p>
                        <p className="text-xs text-muted-foreground">
                          Branch: {repo.default_branch}
                          {repo.ignore_patterns && repo.ignore_patterns.length > 0 && (
                            <> · {repo.ignore_patterns.length} ignore patterns</>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={repo.is_active ? "default" : "secondary"} className="text-xs">
                        {repo.is_active ? "Active" : "Paused"}
                      </Badge>
                      <Switch
                        checked={repo.is_active}
                        // onCheckedChange={(checked) => toggleRepo.mutate({ id: repo.id, is_active: checked })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
