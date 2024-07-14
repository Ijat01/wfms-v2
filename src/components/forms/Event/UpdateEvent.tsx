"use client";
import React, { useEffect, useState } from "react";
import { FilePenLine } from "lucide-react";
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
import { EventSchemaType, EventSchema } from "@/lib/validators/events";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UpdateEventProps {
  bookingid: string;
  event_id: string;
  eventtype: string;
  eventdate: string;
  eventaddress: string;
}

export function UpdateEventDialog({
  bookingid,
  event_id,
  eventtype,
  eventdate,
  eventaddress,
}: UpdateEventProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EventSchemaType>({
    resolver: zodResolver(EventSchema),
  });
  

  

  useEffect(() => {
    if (isOpen) {
      setValue("bookingid", bookingid);
      setValue("eventid", event_id);
      setValue("event_type", eventtype);
      setValue("event_date", formatDate(eventdate)); // Format date here
      setValue("event_address", eventaddress);
    }
  }, [isOpen, bookingid, event_id, eventtype, eventdate, eventaddress, setValue]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const mutation = useMutation({
    mutationFn: async (formData: EventSchemaType) => {
      const endpoint = `/api/event/UpdateEvent/`;
      const { data } = await axios.patch(endpoint, formData);
      return data;
    },
    onError: (err: AxiosError) => {
      toast({
        title: "Something went wrong.",
        description: "Event update failed. Please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      reset();
      toast({
        title: "Success!",
        description: "Event updated successfully.",
        variant: "success",
      });
      setIsOpen(false);
      router.refresh();
    },
  });

  const onSubmit = (data: EventSchemaType) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>
          <FilePenLine />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Update Event</DialogTitle>
          <DialogDescription>
            Fill to update the event details
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="hidden">
            <Label htmlFor="bookingid">Booking ID</Label>
            <Input id="bookingid" {...register("bookingid")} />
            {errors.bookingid && <p>{errors.bookingid.message}</p>}
          </div>
          <div className="hidden">
            <Label htmlFor="eventid">Event ID</Label>
            <Input id="eventid" {...register("eventid")} />
            {errors.eventid && <p>{errors.eventid.message}</p>}
          </div>
          <div className="">
            <Label htmlFor="event_type">Event Type</Label>
            <Select
              {...register("event_type")}
              defaultValue={watch("event_type")} 
              onValueChange={(value) => setValue("event_type", value)}
            >
              <SelectTrigger  className="w-[180px]">
                <SelectValue defaultValue="event_type" />
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
            {errors.event_date && (
              <p className="text-red-400 text-sm">{errors.event_date.message}</p>
            )}
          </div>
          <div className="pt-4">
            <Label htmlFor="event_address">Event Address</Label>
            <Input id="event_address" {...register("event_address")} />
            {errors.event_address && (
              <p className="text-red-400 text-sm">{errors.event_address.message}</p>
            )}
          </div>
          <DialogFooter className="pt-4">
            <Button type="submit">Update</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
