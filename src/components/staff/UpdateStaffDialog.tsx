"use client"
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
import { AddStaffSchema, AddStaffSchemaType } from "@/lib/validators/users";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Define User interface
interface User {
  user_id: string;
  user_email: string;
  user_role: string;
  user_fullname: string;
}

interface UpdateStaffDialogProps {
  user: User | undefined; // Make user optional
}

const UpdateStaffSchema = AddStaffSchema.pick({
  icno: true,
  fullname: true,
  email: true,
  role: true,
});

export function UpdateStaffDialog({ user }: UpdateStaffDialogProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddStaffSchemaType>({
    resolver: zodResolver(UpdateStaffSchema),
  });

  useEffect(() => {
    if (user) {
      setValue("icno", user.user_id);
      setValue("fullname", user.user_fullname);
      setValue("email", user.user_email);
      setValue("role", user.user_role);
    }
  }, [user, setValue]);

  const mutation = useMutation({
    mutationFn: async (formData: AddStaffSchemaType) => {
      const endpoint = `/api/users/updatestaff/`;
      const { data } = await axios.patch(endpoint, formData);
      return data;
    },
    onError: (err: AxiosError) => {
      toast({
        title: "Something went wrong.",
        description: "Staff update failed. Please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      reset();
      toast({
        title: "Success!",
        description: "Staff updated successfully.",
        variant: "success",
      });
      router.refresh()
    },
  });

  const onSubmit = (data: AddStaffSchemaType) => {
    if (user) {
      mutation.mutate(data);
    }
  };

  if (!user) {
    return null; // Render nothing if user is not provided
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Edit Staff</DialogTitle>
          <DialogDescription>
            Update the staff details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="hidden pt-4">
            <Label htmlFor="icno">IC Number</Label>
            <Input id="icno" {...register("icno")} />
            {errors.icno && <p>{errors.icno.message}</p>}
          </div>
          <div className="pt-4">
            <Label htmlFor="fullname">Full Name</Label>
            <Input id="fullname" {...register("fullname")} />
            {errors.fullname && <p>{errors.fullname.message}</p>}
          </div>
          <div className="pt-4">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div className="pt-4">
            <Label>Role</Label>
            <RadioGroup className="flex gap-10"
              value={watch("role")}
              onValueChange={(value) => setValue("role", value)}
            >
              <div className="flex items-center">
                <RadioGroupItem
                  value="Marketer"
                  id="marketer"
                  {...register("role")}
                />
                <label htmlFor="marketer" className="pl-2">
                  Marketer
                </label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem value="Crew" id="crew" {...register("role")} />
                <label htmlFor="crew" className="pl-2">
                  Crew
                </label>
              </div>
            </RadioGroup>
            {errors.role && <p>{errors.role.message}</p>}
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
