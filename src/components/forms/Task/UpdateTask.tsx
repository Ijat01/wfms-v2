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
import { TaskSchemaType, TaskSchema } from "@/lib/validators/task";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
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

interface UpdateTaskProps {
  event_id: string | null;
  user_id: string | undefined;
  task_role: string | null;
  task_id: string | null;
  bookingid: string | null;
}

const UpdateTaskSchema = TaskSchema.pick({
  user_id: true,
  task_role: true,
  event_id: true,
  task_id: true,
  bookingid:true,
});

export function UpdateTask({ event_id, user_id, task_role, task_id, bookingid }: UpdateTaskProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<TaskSchemaType>({
    resolver: zodResolver(UpdateTaskSchema),
    defaultValues: {
        event_id: event_id || "",
        user_id: user_id || "",
        task_role: task_role || "",
        task_id: task_id || "",
        bookingid: bookingid || "",
      },
  });

  useEffect(() => {
    if (event_id) setValue("event_id", event_id);
    if (user_id) setValue("user_id", user_id);
    if (task_role) setValue("task_role", task_role);
    if (task_id) setValue("task_id", task_id);
    if (bookingid) setValue("bookingid", bookingid);
  }, [event_id, user_id, task_role, task_id,bookingid, setValue]);

  useEffect(() => {
    if (open) {
      reset({
        event_id: event_id || "",
        user_id: user_id || "",
        task_role: task_role || "",
        task_id: task_id || "",
        bookingid: bookingid || "",
      });
    }
  }, [open, event_id, user_id, task_role, task_id,bookingid, reset]);

  const mutation = useMutation({
    mutationFn: async (formData: TaskSchemaType) => {
      const { data } = await axios.patch("/api/task/UpdateTask/", formData);
      return data;
    },
    onError: (err: unknown) => {
      if (err instanceof AxiosError) {
        const errorMessage =
          err.response?.data || "Task wasn't added successfully. Please try again.";
        const errorTitle = err.response?.status === 400
          ? "Role Already Exist"
          : err.response?.status === 402
          ? "Staff Has Been Assigned"
          : err.response?.status === 401
          ? "Authentication Error"
          : err.response?.status === 404
          ? "Event Not Found"
          : "Something went wrong.";

        toast({
          title: errorTitle,
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Unknown Error",
          description: "An unexpected error occurred.",
          variant: "destructive",
        });
      }
    },
    onSuccess: (data) => {
      reset(); // Reset form fields
      toast({
        title: "Success!",
        description: "Task added successfully.",
        variant: "success",
      });
      setOpen(false);
      router.refresh();
    },
  });

  const onSubmit = (data: TaskSchemaType) => {
    mutation.mutate(data);
  };

  const {
    data: users,
    error: usersError,
    isLoading: usersLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get("/api/users/getuser/");
      return response.data;
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 size-xs">
        <FilePenLine />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Update Task</DialogTitle>
          <DialogDescription>Fill in the details below.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="hidden">
            <Label htmlFor="event_id">Event ID</Label>
            <Input id="event_id"  {...register("event_id")} />
            {errors.event_id && <p>{errors.event_id.message}</p>}
          </div>
          <div className="hidden">
            <Label htmlFor="task_id">Task ID</Label>
            <Input id="task_id" {...register("task_id")} />
            {errors.task_id && <p>{errors.task_id.message}</p>}
          </div>
          <div className="hidden">
            <Label htmlFor="bookingid">Booking ID</Label>
            <Input id="bookingid" {...register("bookingid")} />
            {errors.bookingid && <p>{errors.bookingid.message}</p>}
          </div>
          <div className="pt-4">
            <Label htmlFor="user_id">Assign staff</Label>
            {usersLoading ? (
              <p>Loading staff...</p>
            ) : usersError ? (
              <p>Failed to load staff</p>
            ) : (
              <Select
                value={watch("user_id")}
                onValueChange={(value) => setValue("user_id", value)}
              >
                <SelectTrigger id="user_id" aria-label="Select staff">
                  <SelectValue placeholder="Select Staff" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user: any) => (
                    <SelectItem key={user.user_id} value={user.user_id}>
                      {user.user_fullname}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {errors.user_id && <p>{errors.user_id.message}</p>}
          </div>
          <div className="hidden">
            <Label htmlFor="task_role">Task Role</Label>
            <Select
              value={watch("task_role")}
              onValueChange={(value) => setValue("task_role", value)}
            >
              <SelectTrigger id="task_role">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Main Photographer">Main Photographer</SelectItem>
                <SelectItem value="Main Videographer">Main Videographer</SelectItem>
                <SelectItem value="Extra Photographer">Extra Photographer</SelectItem>
                <SelectItem value="Extra Videographer">Extra Videographer</SelectItem>
                <SelectItem value="Video Editor">Video Editor</SelectItem>
                <SelectItem value="Photo Editor">Photo Editor</SelectItem>
              </SelectContent>
            </Select>
            {errors.task_role && <p className="text-red-400 text-sm">{errors.task_role.message}</p>}
          </div>
          <DialogFooter className="pt-4">
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

