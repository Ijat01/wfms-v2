"use client"
import React from "react";
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

export function AddStaffDialog() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm<AddStaffSchemaType>({
    resolver: zodResolver(AddStaffSchema),
  });

  const mutation = useMutation({
    mutationFn: async (formData: AddStaffSchemaType) => {
      const { data } = await axios.post("/api/users/addstaff/", formData);
      return data;
    },
    onError: (err: AxiosError) => {
      if (err.response?.status === 401) {
        // Handle 401 error
      } else {
        toast({
          title: "Something went wrong.",
          description:
            "Staff wasn't added successfully. Please try again.",
          variant: "destructive",
        });
      }
    },
    onSuccess: (data) => {
       // Use router.reload() or router.replace('/path') as per your requirement
      reset(); // Reset form fields
      toast({
        title: "Success!",
        description: "New staff added successfully.",
        variant: "success",
      });
      router.refresh()
    },
  });

  const onSubmit = (data: AddStaffSchemaType) => {
    mutation.mutate(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="h-7 gap-1" variant="default">
          Add New Staff
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Add New Staff</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new staff member.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="pt-4">
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
            <Input id="email" {...register("email")} />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div className="pt-4">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register("password")} />
            {errors.password && <p>{errors.password.message}</p>}
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
            <Button type="submit" >
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
