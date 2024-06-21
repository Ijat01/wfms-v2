"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

// Define the schema for updating a booking
const UpdateBookingSchema = z.object({
  booking_id: z.number(),
  groomname: z.string().nullable(),
  bridename: z.string().nullable(),
  bookingdate: z.string().optional(),
  eventdate: z.string().optional(),
  eventaddress: z.string().nullable(),
  contact: z.string().nullable(),
  package_id: z.string().nullable(),
  package_name: z.string().nullable(),
});

// Define the TypeScript type from the schema
type UpdateBookingSchemaType = z.infer<typeof UpdateBookingSchema>;

interface Package {
    package_id: string;
    package_name: string;
  }
// Define Booking interface
interface Booking {
    booking_id: number;
    groomname: string | null;
    bridename: string | null;
    bookingdate: string | undefined;
    eventdate: string | undefined;
    eventaddress: string | null;
    contact: string | null;
    packagetype: string | null | undefined;
    packagename: string | null | undefined;
}

interface UpdateBookingDialogProps {
  booking: Booking | undefined; // Make booking optional
}

export function UpdateBookingDialog({ booking }: UpdateBookingDialogProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UpdateBookingSchemaType>({
    resolver: zodResolver(UpdateBookingSchema),
  });

  useEffect(() => {
    if (booking) {
      setValue("booking_id", booking.booking_id);
      setValue("groomname", booking.groomname);
      setValue("bridename", booking.bridename);
      setValue("bookingdate", booking.bookingdate);
      setValue("eventdate", booking.eventdate);
      setValue("eventaddress", booking.eventaddress);
      setValue("contact", booking.contact);
      setValue("package_id", booking.package_id);
      setValue("package_name", booking.package_name);
    }
  }, [booking, setValue]);

  const mutation = useMutation({
    mutationFn: async (formData: UpdateBookingSchemaType) => {
      const endpoint = `/api/booking/updatebooking/`;
      const { data } = await axios.patch(endpoint, formData);
      return data;
    },
    onError: (err: AxiosError) => {
      toast({
        title: "Something went wrong.",
        description: "Booking update failed. Please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      reset();
      toast({
        title: "Success!",
        description: "Booking updated successfully.",
        variant: "success",
      });
      router.refresh();
    },
  });

  const onSubmit = (data: UpdateBookingSchemaType) => {
    if (booking) {
      mutation.mutate(data);
    }
  };

  if (!booking) {
    return null; // Render nothing if booking is not provided
  }

  const {
    data: packages,
    error: packagesError,
    isLoading: packagesLoading,
  } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const response = await axios.get("/api/package");
      return response.data;
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Edit Booking</DialogTitle>
          <DialogDescription>
            Update the booking details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="pt-4">
            <Label htmlFor="booking_id">Booking ID</Label>
            <Input id="booking_id" {...register("booking_id")} readOnly />
            {errors.booking_id && <p>{errors.booking_id.message as string}</p>}
          </div>
          <div className="pt-4">
            <Label htmlFor="groomname">Groom Name</Label>
            <Input id="groomname" {...register("groomname")} />
            {errors.groomname && <p>{errors.groomname.message as string}</p>}
          </div>
          <div className="pt-4">
            <Label htmlFor="bridename">Bride Name</Label>
            <Input id="bridename" {...register("bridename")} />
            {errors.bridename && <p>{errors.bridename.message as string}</p>}
          </div>
          <div className="pt-4">
            <Label htmlFor="bookingdate">Booking Date</Label>
            <Input id="bookingdate" type="date" {...register("bookingdate")} />
            {errors.bookingdate && <p>{errors.bookingdate.message as string}</p>}
          </div>
          <div className="pt-4">
            <Label htmlFor="eventdate">Event Date</Label>
            <Input id="eventdate" type="date" {...register("eventdate")} />
            {errors.eventdate && <p>{errors.eventdate.message as string}</p>}
          </div>
          <div className="pt-4">
            <Label htmlFor="eventaddress">Event Address</Label>
            <Input id="eventaddress" {...register("eventaddress")} />
            {errors.eventaddress && <p>{errors.eventaddress.message as string}</p>}
          </div>
          <div className="pt-4">
            <Label htmlFor="contact">Contact</Label>
            <Input id="contact" {...register("contact")} />
            {errors.contact && <p>{errors.contact.message as string}</p>}
          </div>
          <div className="pt-4">
            <Label htmlFor="packageid">Package</Label>
            {packagesLoading ? (
              <p>Loading packages...</p>
            ) : packagesError ? (
              <p>Failed to load packages</p>
            ) : (
              <Select
                id="packageid"
                {...register("package_id")}
                defaultValue="1"
                onValueChange={(value) => setValue("package_id", value)}
              >
                <SelectTrigger id="packageid" aria-label="Select package">
                  <SelectValue placeholder="Select package" />
                </SelectTrigger>
                <SelectContent>
                  {packages.map((pkg: Package) => (
                    <SelectItem key={pkg.package_id} value={pkg.package_id}>
                      {pkg.package_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          <DialogFooter className="pt-4">
            <Button type="submit">
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}