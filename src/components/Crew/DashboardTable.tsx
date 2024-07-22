import * as React from "react";
import {
  File,
  ListFilter,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getAllTaskUsersDueThisWeek, getAllTaskUsersInprogress, getAllTaskUsersComplete } from "@/lib/data";

export async function DashboardTable() {
  const inprogress = await getAllTaskUsersInprogress();
  const complete = await getAllTaskUsersComplete();
  const thisweek = await getAllTaskUsersDueThisWeek();

  const getPriorityStatus = (eventdate: Date | null | undefined) => {
    const currentDate = new Date();
    if (!eventdate) {
      return "Low";
    }

    const diffTime = eventdate.getTime() - currentDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 5) return "High";
    if (diffDays <= 10) return "Medium";
    return "Low";
  };

  const getStatusBadge = (priorityStatus: string) => {
    switch (priorityStatus) {
      case "High":
        return <Badge className="text-xs" variant="destructive">High</Badge>;
      case "Medium":
        return <Badge className="text-xs" variant="warning">Medium</Badge>;
      case "Low":
        return <Badge className="text-xs" variant="success">Low</Badge>;
      default:
        return null;
    }
  };

  return (
    <Tabs defaultValue="ThisWeek">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="ThisWeek">Monthly</TabsTrigger>
          <TabsTrigger value="Inprogress">In Progress</TabsTrigger>
          <TabsTrigger value="Completed">Completed</TabsTrigger>
 
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          
        </div>
      </div>
      <TabsContent value="Inprogress">
        <Card className="" x-chunk="dashboard-05-chunk-3">
          <CardHeader className="px-7">
            <CardTitle>In progress</CardTitle>
            <CardDescription>List of in progress task</CardDescription>
          </CardHeader>
          <div className="md:max-h-[390px] overflow-y-hidden hover:overflow-y-auto">
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-96">Staff name</TableHead>
                    <TableHead className="hidden sm:table-cell">Event Type</TableHead>
                    <TableHead className="hidden sm:table-cell">Customer</TableHead>
                    <TableHead className="hidden sm:table-cell">Due Date</TableHead>
                    <TableHead className="hidden md:table-cell">Status</TableHead>
                    <TableHead className="hidden md:table-cell">Priority</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inprogress.map((task) => (
                    <TableRow key={task.task_id}>
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <Avatar className="bg-green-200 h-9 w-9 sm:flex">
                            <AvatarImage className="bg-green-200" src="/avatars/01.png" alt="Avatar" />
                            <AvatarFallback className="bg-green-200">OM</AvatarFallback>
                          </Avatar>
                          <div className="grid gap-1">
                            <p className="text-sm font-medium leading-none">
                              {task.user_name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {task.task_role}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="text-xs" variant="secondary">
                          {task.event_type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="text-xs" variant="secondary">
                          {task.groom_name} & {task.bride_name}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge className="text-xs" variant="secondary">
                          {task.duedate}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge className="text-xs" variant="default">
                          {task.task_status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {getStatusBadge(getPriorityStatus(task.duedatecompare))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </div>
        </Card>
      </TabsContent>
      <TabsContent value="Completed">
        <Card className="" x-chunk="dashboard-05-chunk-3">
          <CardHeader className="px-7">
            <CardTitle>Completed</CardTitle>
            <CardDescription>List of completed task</CardDescription>
          </CardHeader>
          <div className="md:max-h-[390px] overflow-y-hidden hover:overflow-y-auto">
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-96">Staff name</TableHead>
                    <TableHead className="hidden sm:table-cell">Event Type</TableHead>
                    <TableHead className="hidden sm:table-cell">Customer</TableHead>
                    <TableHead className="hidden sm:table-cell">Due Date</TableHead>
                    <TableHead className="hidden md:table-cell">Status</TableHead>
                    <TableHead className="hidden md:table-cell">Priority</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {complete.map((task) => (
                    <TableRow key={task.task_id}>
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <Avatar className="bg-green-200 h-9 w-9 sm:flex">
                            <AvatarImage className="bg-green-200" src="/avatars/01.png" alt="Avatar" />
                            <AvatarFallback className="bg-green-200">OM</AvatarFallback>
                          </Avatar>
                          <div className="grid gap-1">
                            <p className="text-sm font-medium leading-none">
                              {task.user_name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {task.task_role}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="text-xs" variant="secondary">
                          {task.event_type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="text-xs" variant="secondary">
                          {task.groom_name} & {task.bride_name}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge className="text-xs" variant="secondary">
                          {task.duedate}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge className="text-xs" variant="success">
                          {task.task_status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {getStatusBadge(getPriorityStatus(task.duedatecompare))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </div>
        </Card>
      </TabsContent>
      <TabsContent value="ThisWeek">
        <Card className="" x-chunk="dashboard-05-chunk-3">
          <CardHeader className="px-7">
            <CardTitle>Task Monthly</CardTitle>
            <CardDescription>List of task need to be completed this month</CardDescription>
          </CardHeader>
          <div className="md:max-h-[390px] overflow-y-hidden hover:overflow-y-auto">
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-96">Staff name</TableHead>
                    <TableHead className="hidden sm:table-cell">Event Type</TableHead>
                    <TableHead className="hidden sm:table-cell">Customer</TableHead>
                    <TableHead className="hidden sm:table-cell">Due Date</TableHead>
                    <TableHead className="hidden md:table-cell">Status</TableHead>
                    <TableHead className="hidden md:table-cell">Priority</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {thisweek.map((task) => (
                    <TableRow key={task.task_id}>
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <Avatar className="bg-green-200 h-9 w-9 sm:flex">
                            <AvatarImage className="bg-green-200" src="/avatars/01.png" alt="Avatar" />
                            <AvatarFallback className="bg-green-200">OM</AvatarFallback>
                          </Avatar>
                          <div className="grid gap-1">
                            <p className="text-sm font-medium leading-none">
                              {task.user_name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {task.task_role}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="text-xs" variant="secondary">
                          {task.event_type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="text-xs" variant="secondary">
                          {task.groom_name} & {task.bride_name}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge className="text-xs" variant="secondary">
                          {task.duedate}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge className="text-xs" variant={task.task_status === 'Pending' ? 'destructive' : task.task_status === 'Complete' ? 'success' : 'default'}>
                          {task.task_status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {getStatusBadge(getPriorityStatus(task.duedatecompare))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
