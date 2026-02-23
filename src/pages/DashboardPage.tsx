import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";


function DashboardPage() {
    const { signOut } = useAuth();

  return (
    <div>
        <h1>DashboardPage</h1>

        <Button onClick={signOut}>
            Sign Out
        </Button>
    </div>
  )
}

export default DashboardPage;