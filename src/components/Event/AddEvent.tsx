"use client"
import React, {useEffect} from "react";
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
import { EventSchemaType,EventSchema } from "@/lib/validators/events";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { Plus } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


interface AddEventProps{
    bookingid: string
  }

const AddEventSchema = EventSchema.pick({
  bookingid:true,
  event_type:true,
  event_date:true,
  event_address:true,
  });

export function AddEvent( { bookingid }: AddEventProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<EventSchemaType>({
    resolver: zodResolver(AddEventSchema),
  });

  useEffect(() => {
      setValue("bookingid", bookingid);
  }, [bookingid,  setValue]);

  const mutation = useMutation({
    mutationFn: async (formData: EventSchemaType) => {
      const { data } = await axios.post("/api/event/AddEvent/", formData);
      return data;
    },
    onError: (err: AxiosError) => {
      if (err.response?.status === 401) {
        // Handle 401 error
      } else {
        toast({
          title: "Something went wrong.",
          description:
            "Payment details wasn't added successfully. Please try again.",
          variant: "destructive",
        });
      }
    },
    onSuccess: (data) => {
       // Use router.reload() or router.replace('/path') as per your requirement
      reset(); // Reset form fields
      toast({
        title: "Success!",
        description: "Payment details added successfully.",
        variant: "success",
      });
      router.refresh()
    },
  });

  const onSubmit = (data: EventSchemaType) => {
    mutation.mutate(data);
  };


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-500">
          <Plus></Plus>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Add Event</DialogTitle>
          <DialogDescription>
            Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="hidden">
            <Label htmlFor="bookingid">Booking ID</Label>
            <Input id="bookingid" {...register("bookingid")} />
            {errors.bookingid && <p>{errors.bookingid.message}</p>}
          </div>
          <div className="pt-4">
            <Label htmlFor="event_type">Event Type</Label>
            <Select
             {...register("event_type")} onValueChange={(value)=>setValue("event_type",value)}>
              <SelectTrigger id="event_type" className="w-[180px]">
                <SelectValue placeholder="Select a event" />
              </SelectTrigger>
              <SelectContent>
                  <SelectItem value="Nikah">Nikah</SelectItem>
                  <SelectItem value="Sanding">Sanding</SelectItem>
                  <SelectItem value="Tunang">Tunang</SelectItem>
                  <SelectItem value="Tandang">Tandang</SelectItem>
              </SelectContent>
            </Select>
            {errors.event_type && (
              <p className="text-red-400 text-sm">{errors.event_type.message}</p>
            )}
          </div>
          <div className="pt-4">
            <Label htmlFor="event_date">Event Date</Label>
            <Input id="event_date" type="date" {...register("event_date")} />
            {errors.event_date && <p className="text-red-400 text-sm">{errors.event_date.message}</p>}
          </div>
          <div className="pt-4">
            <Label htmlFor="event_address">Event Address</Label>
            <Input id="event_address" {...register("event_address")} />
            {errors.event_address && <p className="text-red-400 text-sm">{errors.event_address.message}</p>}
          </div>
          
          
          <DialogFooter className="pt-4">
            <Button type="submit" >
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}