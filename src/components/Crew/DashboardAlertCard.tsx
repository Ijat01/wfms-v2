import { Card,CardHeader,CardDescription,CardTitle,CardContent,CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { countNewTaskUser, countCompleteUser, countPendingUser } from "@/lib/data"


export async function DashboardAlertCard(){
    const data = await countNewTaskUser()
    const pending = await countPendingUser()
    const complete = await countCompleteUser()
return(
<>
    <Card x-chunk=" dashboard-05-chunk-1">
        <CardHeader className="pb-2">
        <CardDescription className="font-bold text-black">New Task Assigned</CardDescription>
    
        <CardTitle className="text-4xl">{data}</CardTitle>
        </CardHeader>
        <CardContent>
        <div className="text-xs text-muted-foreground">
            new task this month
        </div>
        </CardContent>
        <CardFooter>
        <Progress value={25} aria-label="25% increase" />
        </CardFooter>
    </Card>

    <Card x-chunk="dashboard-05-chunk-2">
    <CardHeader className="pb-2">
    <CardDescription className="font-bold text-black">In Progress Task</CardDescription>
    <CardTitle className="text-4xl">{pending}</CardTitle>
    </CardHeader>
    <CardContent>
    <div className="text-xs text-muted-foreground">
        Total task still in progress
    </div>
    </CardContent>
    <CardFooter>
    <Progress value={25} aria-label="25% increase" />
    </CardFooter>
    </Card>

    <Card x-chunk="dashboard-05-chunk-3">
    <CardHeader className="pb-2">
    <CardDescription className="font-bold text-black">Completed Task</CardDescription>
    <CardTitle className="text-4xl">{complete}</CardTitle>
    </CardHeader>
    <CardContent>
    <div className="text-xs text-muted-foreground">
       Total completed task this month
    </div>
    </CardContent>
    <CardFooter>
    <Progress value={25} aria-label="25% increase" />
    </CardFooter>
    </Card>
</>
)
}