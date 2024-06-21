"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from '@/components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface DeleteBookingDialogProps {
  booking: {
    booking_id: number;
    groomname: string | null;
    bridename: string | null;
    bookingdate: string | undefined;
    eventdate: string | undefined;
    eventaddress: string | null;
    contact: string | null;
    packagetype: string | null | undefined;
    packagename: string | null | undefined;
  };
}

export function DeleteBookingDialog({ booking }: DeleteBookingDialogProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const mutation = useMutation({
    mutationFn: async (booking_id: number) => {
      const endpoint = `/api/booking/deletebooking/`;
      const { data } = await axios.delete(endpoint, { data: { booking_id }});
      return data;
    },
    onError: (err) => {
      toast({
        title: "Something went wrong.",
        description: "Staff deletion failed. Please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Staff deleted successfully.",
        variant: "success",
      });
      router.refresh();
      closeDialog();
    },
  });

  const handleDelete = () => {
    if (booking) {
      mutation.mutate(booking.booking_id);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" onClick={openDialog}>
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            booking of <strong>{booking.groomname} & {booking.bridename}</strong> from your system.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={closeDialog}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}