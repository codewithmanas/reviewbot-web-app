import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";


export default function SettingsPage() {

    const [displayName, setDisplayName] = useState("");

    const user ={
        id: "",
        email:"",
        name:"",
        created_at:""
    }

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Update your personal information.</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              // onSubmit={(e) => {
              //   e.preventDefault();
              //   updateProfile.mutate();
              // }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={user?.email ?? ""} disabled />
              </div>
              <div className="space-y-2">
                <Label>Display Name</Label>
                <Input
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Your name"
                />
              </div>
              <Button type="submit" 
              // disabled={updateProfile.isPending}
              >
                {/* {updateProfile.isPending ? "Saving..." : "Save Changes"} */}
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Account information and security.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm">
              <span className="text-muted-foreground">User ID: </span>
              <code className="font-mono text-xs bg-accent px-2 py-0.5 rounded">{user?.id}</code>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Joined: </span>
              {user?.created_at && new Date(user.created_at).toLocaleDateString()}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
