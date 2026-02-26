import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Crown, Plus, Users } from "lucide-react";
import { useState } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

import { v4 as uuidv4 } from 'uuid';


export default function TeamPage() {
    const { user } = useAuth();
    const userId = uuidv4();
    const [teamName, setTeamName] = useState("");
    const [createOpen, setCreateOpen] = useState(false);

    console.log("user: ", user);
    console.log("userId: ", userId);

    const { data: memberships } = useQuery({
      queryKey: ["my-teams", user?.id],
      queryFn: async () => {
        const { data, error } = await supabase
          .from("team_members")
          .select("*, teams(id, name, created_at)")
          .eq("user_id", user!.id)

          if(error) throw error;
          return data;
      },
      enabled: !!user,
    });


    const createTeam = useMutation({
      mutationFn: async (name: string) => {

        // Create Team
        const { data: team, error: teamError } = await supabase
        .from("teams")
        .insert({ name, created_by: userId })
        .select()
        .single();
        // .insert({ name, created_by: user!.id })
        
        console.log("teams data added: ", team);

        if(teamError) throw teamError;
        
        // Add creator as admin
        const { error: memberError } = await supabase
        .from("team_members")
        .insert({ team_id: team.id, user_id: userId, role: "admin" });
        // .insert({ team_id: team.id, user_id: user!.id, role: "admin" });
        
        if(memberError) throw memberError;

        return team;

      }
    })


  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Team</h1>
            <p className="text-muted-foreground">Manage your team and members.</p>
          </div>
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1.5">
                <Plus className="w-4 h-4" /> New Team
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a new team</DialogTitle>
              </DialogHeader>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (teamName.trim()) createTeam.mutate(teamName.trim());
                }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label>Team Name</Label>
                  <Input
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="My Team"
                    required
                  />
                </div>
                <Button type="submit" className="w-full"
                 disabled={createTeam.isPending}
                 >
                  {createTeam.isPending ? "Creating..." : "Create Team"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {!memberships || memberships.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <Users className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">You're not part of any team yet.</p>
              <p className="text-xs text-muted-foreground mt-1">Create a team to start collaborating.</p>
            </CardContent>
          </Card>
        ) : (
          memberships.map((membership) => {
            const team = membership.teams as any;
            const members = teamMembers?.filter((m) => m.team_id === team.id) ?? [];

            return (
              <Card key={team.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{team.name}</CardTitle>
                    <Badge variant="outline" className="capitalize text-xs">{membership.role}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {members.map((member) => (
                      <div key={member.id} className="flex items-center gap-3 p-2 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                          <span className="text-xs font-medium">
                            {(member.profiles as any)?.display_name?.[0]?.toUpperCase() ?? "?"}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{(member.profiles as any)?.display_name ?? "Unknown"}</p>
                        </div>
                        {member.role === "admin" && (
                          <Crown className="w-4 h-4 text-warning" />
                        )}
                        <Badge variant="secondary" className="text-xs capitalize">{member.role}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </DashboardLayout>
  )
}
