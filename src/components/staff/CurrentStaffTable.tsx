

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { UpdateStaffDialog } from "@/components/staff/UpdateStaffDialog"
import { DeleteStaffDialog } from "./DeleteStaffDialog"
import { getAllUser } from "@/lib/data"


export async function CurrentStaffTable(){


  const data = await getAllUser();

  return (
    <>
    <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Staff</CardTitle>
                  <CardDescription>
                    Manage your staff
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>

                        <TableHead>Email</TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                    
                        
                    {data.map((user)=> (
                      <TableRow key= {user.user_id} >
                        <TableCell className=" flex items-center font-medium">
                          
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="pl-4 text-clip">{user.user_fullname}</div>
                          <div className="pl-4 text-xs text-gray-500"> {user.user_role} </div>
                        </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{user.user_email}</Badge>
                        </TableCell>
                        <TableCell >
                        <div className="flex gap-4 justify-end mr-5">
                        <UpdateStaffDialog user={user} />
                        <DeleteStaffDialog user={user} />
                        </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    products
                  </div>
                </CardFooter>
              </Card>
    </>
  )
}

export default CurrentStaffTable