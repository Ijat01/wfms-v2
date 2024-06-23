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
import { getBookingList } from "@/lib/data"
import { DeleteBookingDialog } from "./DeleteBooking"
import { UpdateBookingDialog } from "./UpdateBooking"


export async function BookingList(){

    const data = await getBookingList();


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
                  <Table className="text-center">
                    <TableHeader >
                      <TableRow >
                        <TableHead className="text-center">ID </TableHead>
                        <TableHead className="text-center">Customer </TableHead>
                        <TableHead className="text-center">Contact</TableHead>
                        <TableHead className="text-center">Location</TableHead>
                        <TableHead className="text-center">Event Date</TableHead>
                        <TableHead className="text-center">Package</TableHead>
                        <TableHead className="text-center">Booking Date </TableHead>
                        
                        
                        
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                    
                        
                    {data.map((booking)=> (
                      <TableRow key= {booking.booking_id} >
                        <TableCell>
                          <div className="pl-4 text-clip">{booking.booking_id}</div>
                       
                        </TableCell>
                        <TableCell>
                          <Badge  variant="outline">{booking.groomname} & {booking.bridename}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{booking.contact}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{booking.eventaddress}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{booking.eventdate}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{booking.packagename}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{booking.bookingdate}</Badge>
                        </TableCell>
                        <TableCell >
                        <div className="flex gap-4 justify-end mr-5">
                        <UpdateBookingDialog booking ={booking}/>
                        <DeleteBookingDialog booking={booking} />
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

export default BookingList