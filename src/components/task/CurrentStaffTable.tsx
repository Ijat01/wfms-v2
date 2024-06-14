import Image from "next/image"
import {
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Progress } from "../ui/progress"


export function CurrentStaffTable(){
  return (
    <>
    <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Task</CardTitle>
                  <CardDescription>
                    Manage your task here
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-1 md:grid-cols-2     lg:grid-cols-3 gap-4">

                <Card x-chunk=" dashboard-05-chunk-1">
                    <CardHeader className="pb-2">
                    <CardDescription className="font-bold text-black">Wedding of Akmal & Farah</CardDescription>
                    
                    </CardHeader>
                    <CardContent>
                    <div className="text-xs text-muted-foreground">
                        Location: Putrajaya
                    </div>
                    <div className="text-xs text-muted-foreground pt-2">
                        Date: 20/4/24
                    </div>
                    <div className="text-xs text-muted-foreground pt-2">
                        Package: Nikah & Sanding
                    </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-5">
                      
                      <Badge variant="default" className="flex justify-start">Assigned</Badge>
                      <Pencil type="button" className=""></Pencil>
                      <Trash2 className=""></Trash2>
                      
                    
                    </CardFooter>
                </Card>

                <Card x-chunk=" dashboard-05-chunk-1">
                    <CardHeader className="pb-2">
                    <CardDescription className="font-bold text-black">Wedding of Akmal & Farah</CardDescription>
                    
                    </CardHeader>
                    <CardContent>
                    <div className="text-xs text-muted-foreground">
                        Location: Putrajaya
                    </div>
                    <div className="text-xs text-muted-foreground pt-2">
                        Date: 20/4/24
                    </div>
                    <div className="text-xs text-muted-foreground pt-2">
                        Package: Nikah & Sanding
                    </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-5">
                      
                      <Badge variant="destructive" className="flex justify-start">Pending</Badge>
                      <Pencil type="button" className=""></Pencil>
                      <Trash2 className=""></Trash2>
                      
                    
                    </CardFooter>
                </Card>

                <Card x-chunk=" dashboard-05-chunk-1">
                    <CardHeader className="pb-2">
                    <CardDescription className="font-bold text-black">Wedding of Akmal & Farah</CardDescription>
                    
                    </CardHeader>
                    <CardContent>
                    <div className="text-xs text-muted-foreground">
                        Location: Putrajaya
                    </div>
                    <div className="text-xs text-muted-foreground pt-2">
                        Date: 20/4/24
                    </div>
                    <div className="text-xs text-muted-foreground pt-2">
                        Package: Nikah & Sanding
                    </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-5">
                      
                      <Badge variant="destructive" className="flex justify-start">Pending</Badge>
                      <Pencil type="button" className=""></Pencil>
                      <Trash2 className=""></Trash2>
                      
                    
                    </CardFooter>
                </Card>

                <Card x-chunk=" dashboard-05-chunk-1">
                    <CardHeader className="pb-2">
                    <CardDescription className="font-bold text-black">Wedding of Akmal & Farah</CardDescription>
                    
                    </CardHeader>
                    <CardContent>
                    <div className="text-xs text-muted-foreground">
                        Location: Putrajaya
                    </div>
                    <div className="text-xs text-muted-foreground pt-2">
                        Date: 20/4/24
                    </div>
                    <div className="text-xs text-muted-foreground pt-2">
                        Package: Nikah & Sanding
                    </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-5">
                      
                      <Badge variant="destructive" className="flex justify-start">Pending</Badge>
                      <Pencil type="button" className=""></Pencil>
                      <Trash2 className=""></Trash2>
                      
                    
                    </CardFooter>
                </Card>

                <Card x-chunk=" dashboard-05-chunk-1">
                    <CardHeader className="pb-2">
                    <CardDescription className="font-bold text-black">Wedding of Akmal & Farah</CardDescription>
                    
                    </CardHeader>
                    <CardContent>
                    <div className="text-xs text-muted-foreground">
                        Location: Putrajaya
                    </div>
                    <div className="text-xs text-muted-foreground pt-2">
                        Date: 20/4/24
                    </div>
                    <div className="text-xs text-muted-foreground pt-2">
                        Package: Nikah & Sanding
                    </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-5">
                      
                      <Badge variant="default" className="flex justify-start">Assigned</Badge>
                      <Pencil type="button" className=""></Pencil>
                      <Trash2 className=""></Trash2>
                      
                    
                    </CardFooter>
                </Card>

                <Card x-chunk=" dashboard-05-chunk-1">
                    <CardHeader className="pb-2">
                    <CardDescription className="font-bold text-black">Wedding of Akmal & Farah</CardDescription>
                    
                    </CardHeader>
                    <CardContent>
                    <div className="text-xs text-muted-foreground">
                        Location: Putrajaya
                    </div>
                    <div className="text-xs text-muted-foreground pt-2">
                        Date: 20/4/24
                    </div>
                    <div className="text-xs text-muted-foreground pt-2">
                        Package: Nikah & Sanding
                    </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-5">
                      
                      <Badge variant="default" className="flex justify-start">Assigned</Badge>
                      <Pencil type="button" className=""></Pencil>
                      <Trash2 className=""></Trash2>
                      
                    
                    </CardFooter>
                </Card>

                <Card x-chunk=" dashboard-05-chunk-1">
                    <CardHeader className="pb-2">
                    <CardDescription className="font-bold text-black">Wedding of Akmal & Farah</CardDescription>
                    
                    </CardHeader>
                    <CardContent>
                    <div className="text-xs text-muted-foreground">
                        Location: Putrajaya
                    </div>
                    <div className="text-xs text-muted-foreground pt-2">
                        Date: 20/4/24
                    </div>
                    <div className="text-xs text-muted-foreground pt-2">
                        Package: Nikah & Sanding
                    </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-5">
                      
                      <Badge variant="destructive" className="flex justify-start">Pending</Badge>
                      <Pencil type="button" className=""></Pencil>
                      <Trash2 className=""></Trash2>
                      
                    
                    </CardFooter>
                </Card>

                </CardContent>
                <CardFooter>
                  
                </CardFooter>
              </Card>
    </>
  )
}

export default CurrentStaffTable