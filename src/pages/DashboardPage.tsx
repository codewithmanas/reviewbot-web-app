import DashboardLayout from "@/components/DashboardLayout";


function DashboardPage() {


  return (
    <DashboardLayout>

        <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">Overview of your PR review activity.</p>
            </div>

        </div>
    </DashboardLayout>
  )
}

export default DashboardPage;