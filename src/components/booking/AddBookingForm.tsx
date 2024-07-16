"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookingSchemaType, BookingSchema } from "@/lib/validators/booking";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function AddBookingForm() {
  const router = useRouter();
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const [pendingData, setPendingData] = useState<BookingSchemaType | null>(null);

  const {
    setValue,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingSchemaType>({
    resolver: zodResolver(BookingSchema),
  });

  const mutation = useMutation({
    mutationFn: async (formData: BookingSchemaType) => {
      console.log("Submitting data:", formData); // Added log
      try {
        const { data } = await axios.post("/api/booking/addbooking", formData);
        return data;
      } catch (error) {
        console.error("Axios error:", error);
        throw error;
      }
    },
    onError: (err: AxiosError, variables: BookingSchemaType) => {
      console.error("Mutation error:", err);
      const errorResponse = err.response?.data;
      if (
        typeof errorResponse === "string" &&
        err.response?.status === 400 &&
        errorResponse.includes("Booking limit exceeded")
      ) {
        setPendingData(variables);
        setConfirmationVisible(true);
      } else {
        toast({
          title: "Something went wrong.",
          description: "Booking wasn't added successfully. Please try again.",
          variant: "destructive",
        });
      }
    },
    onSuccess: (data) => {
      console.log("Booking successful:", data);
      reset();
      toast({
        title: "Success!",
        description: "New booking added successfully.",
        variant: "success",
      });
      router.refresh();
    },
  });

  const onSubmit = (data: BookingSchemaType) => {
    console.log("Form data submitted:", data); // Added log
    if (isConfirmationVisible) {
      setPendingData(data);
    } else {
      mutation.mutate(data);
    }
  };

  const handleConfirmation = () => {
    if (pendingData) {
      const dataWithConfirmation = { ...pendingData, confirmProceed: true };
      mutation.mutate(dataWithConfirmation);
      setPendingData(null);
      setConfirmationVisible(false);
    }
  };

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
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <Carousel>
          <CarouselContent>
            <CarouselItem>
              <div className="font-bold">Booking Details</div>
              <div className="pb-2 text-sm text-gray-500">Customer Booking Details</div>
              <div>
                <Label htmlFor="groomname">Groom Name</Label>
                <Input id="groomname" {...register("groomname")} />
                {errors.groomname && <p>{errors.groomname.message}</p>}
              </div>
              <div className="pt-4">
                <Label htmlFor="bridename">Bride Name</Label>
                <Input id="bridename" {...register("bridename")} />
                {errors.bridename && <p>{errors.bridename.message}</p>}
              </div>
              <div className="pt-4">
                <Label htmlFor="eventtime">Event Time</Label>
                <Input id="eventtime" type="time" {...register("eventtime")} />
                {errors.eventdate && <p>{errors.eventdate.message}</p>}
              </div>
              <div className="pt-4">
                <Label htmlFor="eventdate">Event Date</Label>
                <Input id="eventdate" type="date" {...register("eventdate")} />
                {errors.eventdate && <p>{errors.eventdate.message}</p>}
              </div>
              <div className="pt-4">
                <Label htmlFor="eventaddress">Event Address</Label>
                <Input id="eventaddress" {...register("eventaddress")} />
                {errors.eventaddress && <p>{errors.eventaddress.message}</p>}
              </div>
              <div className="pt-4">
                <Label htmlFor="packageid">Package</Label>
                {packagesLoading ? (
                  <p>Loading packages...</p>
                ) : packagesError ? (
                  <p>Failed to load packages</p>
                ) : (
                  <Select
                    {...register("packageid")}
                    defaultValue="1"
                    onValueChange={(value) => setValue("packageid", value)}
                  >
                    <SelectTrigger id="packageid" aria-label="Select package">
                      <SelectValue placeholder="Select package" />
                    </SelectTrigger>
                    <SelectContent>
                      {packages.map((pkg: any) => (
                        <SelectItem key={pkg.package_id} value={pkg.package_id}>
                          {pkg.package_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
              <div className="pt-4">
                <Label htmlFor="contactno">Contact Number</Label>
                <Input id="contactno" {...register("contactno")} />
                {errors.contactno && <p>{errors.contactno.message}</p>}
              </div>
              <div className="pt-4">
                <Label htmlFor="lock_by">Handle by</Label>
                <Input id="lock_by" {...register("lock_by")} />
                {errors.lock_by && <p>{errors.lock_by.message}</p>}
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="font-bold">Payment Details</div>
              <div className="pb-2 text-sm text-gray-500">Customer Payment Details</div>
              <div className="">
                <Label htmlFor="payment_total">Total Amount</Label>
                <Input type="number" id="payment_total" {...register("payment_total")} />
                {errors.payment_total && <p>{errors.payment_total.message}</p>}
              </div>
              <div className="pt-4">
                <Label htmlFor="paymentdetail_amount">Total Paid</Label>
                <Input type="number" id="paymentdetail_amount" {...register("paymentdetail_amount")} />
                {errors.paymentdetail_amount && <p>{errors.paymentdetail_amount.message}</p>}
              </div>
              <div className="pt-4">
                <Label htmlFor="paymentdetails_type">Payment Method</Label>
                <Select
                {...register("paymentdetails_type")} onValueChange={(value)=>setValue("paymentdetails_type",value)}>
                  <SelectTrigger id="paymentdetails_type" className="w-[180px]">
                    <SelectValue placeholder="Select a method" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="card">Card</SelectItem>
                      <SelectItem value="installment">Installment</SelectItem>
                  </SelectContent>
                </Select>
                {errors.paymentdetails_type && (
                  <p className="text-red-400 text-sm">{errors.paymentdetails_type.message}</p>
                )}
              </div>
              <div className="pt-4">
                <Label htmlFor="paymentdetails_desc">Payment Remarks</Label>
                <Input id="paymentdetails_desc" {...register("paymentdetails_desc")} />
                {errors.paymentdetails_desc && <p>{errors.paymentdetails_desc.message}</p>}
              </div>
              
              <div className="flex justify-end pt-4">
                <Button type="submit" onClick={() => console.log("Submit button clicked")}>
                  Submit
                </Button>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselNext />
          <CarouselPrevious />
        </Carousel>
      </form>
      {isConfirmationVisible && (
        <Dialog open={isConfirmationVisible} onOpenChange={setConfirmationVisible}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Booking Limit Exceeded</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              The booking limit for this date has been exceeded. Do you want
              to continue?
            </DialogDescription>
            <DialogFooter>
              <Button onClick={handleConfirmation}>Yes</Button>
              <Button onClick={() => setConfirmationVisible(false)}>Cancel</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
