"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from "lucide-react";
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

interface DeleteTaskProps {
    task_id:string
}

export function DeleteTaskDialog({ task_id }:  DeleteTaskProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const mutation = useMutation({
    mutationFn: async (task_id: string) => {
      const endpoint = `/api/task/DeleteTask/`;
      const { data } = await axios.delete(endpoint, { data: { task_id }});
      return data;
    },
    onError: (err) => {
      toast({
        title: "Something went wrong.",
        description: "Payment Details Deletion failed. Please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Payment Details deleted successfully.",
        variant: "success",
      });
      router.refresh();
      closeDialog();
    },
  });

  const handleDelete = () => {
      mutation.mutate(task_id);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" onClick={openDialog}>
          <Trash2></Trash2>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            payment details from your system.
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