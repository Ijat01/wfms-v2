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
import { PackageSchemaType,PackageSchema } from "@/lib/validators/package";
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

export function AddPackage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<PackageSchemaType>({
    resolver: zodResolver(PackageSchema),
  });

  const mutation = useMutation({
    mutationFn: async (formData: PackageSchemaType) => {
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

  const onSubmit = (data: PackageSchemaType) => {
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
          <div className="pt-4">
            <Label htmlFor="package_id">Package ID</Label>
            <Input id="package_id" type="package_id" {...register("package_id")} />
            {errors.package_id && <p>{errors.package_id.message}</p>}
          </div>
          <div className="pt-4">
            <Label htmlFor="package_name">Package Name</Label>
            <Input id="package_name" {...register("package_name")} />
            {errors.package_name && <p className="text-red-400 text-sm">{errors.package_name.message}</p>}
          </div>
          <div className="pt-4">
            <Label htmlFor="package_type">Package Type</Label>
            <Select
             {...register("package_type")} onValueChange={(value)=>setValue("package_type",value)}>
              <SelectTrigger id="event_type" className="">
                <SelectValue placeholder="Select a package type" />
              </SelectTrigger>
              <SelectContent>
                  <SelectItem value="Photo">Photo</SelectItem>
                  <SelectItem value="Video">Video</SelectItem>
                  <SelectItem value="Photo & Video">Photo & Video</SelectItem>
              </SelectContent>
            </Select>
            {errors.package_type && (
              <p className="text-red-400 text-sm">{errors.package_type.message}</p>
            )}
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