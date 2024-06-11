import { Card,CardHeader,CardDescription,CardTitle,CardContent,CardFooter } from "./ui/card"
import { Progress } from "./ui/progress"


export function DashboardAlertCard(){
return(
<>
    <Card x-chunk=" dashboard-05-chunk-1">
        <CardHeader className="pb-2">
        <CardDescription>Ongoing Task</CardDescription>
        <CardTitle className="text-4xl">10</CardTitle>
        </CardHeader>
        <CardContent>
        <div className="text-xs text-muted-foreground">
            +25% from last month
        </div>
        </CardContent>
        <CardFooter>
        <Progress value={25} aria-label="25% increase" />
        </CardFooter>
    </Card>

    <Card x-chunk="dashboard-05-chunk-2">
    <CardHeader className="pb-2">
    <CardDescription>Ongoing Task</CardDescription>
    <CardTitle className="text-4xl">5</CardTitle>
    </CardHeader>
    <CardContent>
    <div className="text-xs text-muted-foreground">
        -25% from last week
    </div>
    </CardContent>
    <CardFooter>
    <Progress value={25} aria-label="25% increase" />
    </CardFooter>
    </Card>

    <Card x-chunk="dashboard-05-chunk-3">
    <CardHeader className="pb-2">
    <CardDescription>Completed Task</CardDescription>
    <CardTitle className="text-4xl">8</CardTitle>
    </CardHeader>
    <CardContent>
    <div className="text-xs text-muted-foreground">
        +25% from last week
    </div>
    </CardContent>
    <CardFooter>
    <Progress value={25} aria-label="25% increase" />
    </CardFooter>
    </Card>
</>
)
}