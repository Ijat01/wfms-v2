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

export function AddPaymentForm() {
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
      const { data } = await axios.post("/api/booking/addbooking/", formData);
      return data;
    },
    onError: (err: AxiosError, variables: BookingSchemaType) => {
      console.error("Mutation error:", err);
      const errorResponse = err.response?.data;
      if (
        typeof errorResponse === "string" &&
        err.response?.status === 400 &&
        errorResponse.includes("Booking limit exceeded")
      ) {
        // Store pending data and show confirmation dialog
        setPendingData(variables);
        setConfirmationVisible(true);
      } else {
        // Handle other errors with a toast
        toast({
          title: "Something went wrong.",
          description:
            "Booking wasn't added successfully. Please try again.",
          variant: "destructive",
        });
      }
    },
    onSuccess: (data) => {
      console.log("Booking successful:", data);
      reset(); // Reset form fields
      toast({
        title: "Success!",
        description: "New booking added successfully.",
        variant: "success",
      });
      router.refresh(); // Refresh page or update as needed
    },
  });

  const onSubmit = (data: BookingSchemaType) => {
    if (isConfirmationVisible) {
      // If confirmation dialog is visible, store pending data
      setPendingData(data);
    } else {
      // Otherwise, proceed with mutation
      mutation.mutate(data);
    }
  };

  const handleConfirmation = () => {
    if (pendingData) {
      // Include confirmProceed flag in the data
      const dataWithConfirmation = { ...pendingData, confirmProceed: true };
      mutation.mutate(dataWithConfirmation);
      setPendingData(null); // Clear pending data after successful mutation
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid">
            <div className="pt-4">
            <Label htmlFor="groomname">Groom Name</Label>
            <Input id="groomname" {...register("groomname")} />
            {errors.groomname && <p>{errors.groomname.message}</p>}
            </div>
            <div className="pt-4">
            <Label htmlFor="bridename">Bride Name</Label>
            <Input id="bridename" {...register("bridename")} />
            {errors.bridename && <p>{errors.bridename.message}</p>}
            </div>
        </div>
        <div className="pt-4">
          <Label htmlFor="eventdate">Event Date</Label>
          <Input id="eventdate" type="date" {...register("eventdate")} />
          {errors.eventdate && <p>{errors.eventdate.message}</p>}
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
          <Button type="submit">Submit</Button>
        </div>
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
