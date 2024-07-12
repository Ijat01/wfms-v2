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
import { getAllTaskAssignment } from "@/lib/data";

export async function DashboardTable() {
  const data = await getAllTaskAssignment();

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
    <Tabs defaultValue="week">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="week">Task</TabsTrigger>
          
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          
        </div>
      </div>
      <TabsContent value="week">
        <Card className="" x-chunk="dashboard-05-chunk-3">
          <CardHeader className="px-7">
            <CardTitle>Task Weekly</CardTitle>
            <CardDescription>Task need to be completed this week</CardDescription>
          </CardHeader>
          <div className="md:max-h-[390px] overflow-y-hidden hover:overflow-y-auto">
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-96">Staff name</TableHead>
                    <TableHead className="hidden sm:table-cell">Event Type</TableHead>
                    <TableHead className="hidden sm:table-cell">Customer</TableHead>
                    <TableHead className="hidden sm:table-cell">Date</TableHead>
                    <TableHead className="hidden md:table-cell">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((task) => (
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
                          {task.eventdate_string}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {getStatusBadge(getPriorityStatus(task.eventdate))}
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
