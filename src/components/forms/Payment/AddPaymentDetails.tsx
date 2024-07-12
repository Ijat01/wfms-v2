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
import { PaymentDetailsType,PaymentDetailsSchema } from "@/lib/validators/paymentdetails";
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
import { Value } from "@radix-ui/react-select";

interface AddPaymentDetailsProps {
    paymentid: string;
    paymentbalance: string;
  }

export function AddPaymentDetails( { paymentid, paymentbalance }: AddPaymentDetailsProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<PaymentDetailsType>({
    resolver: zodResolver(PaymentDetailsSchema),
  });

  useEffect(() => {
      setValue("payment_id", paymentid);
      setValue("payment_balance", paymentbalance);
  }, [paymentid, paymentbalance , setValue]);

  const mutation = useMutation({
    mutationFn: async (formData: PaymentDetailsType) => {
      const { data } = await axios.post("/api/paymentdetails/AddPaymentDetails/", formData);
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

  const onSubmit = (data: PaymentDetailsType) => {
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
          <DialogTitle>Payment Details</DialogTitle>
          <DialogDescription>
            Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <Label htmlFor="payment_id">Payment Id</Label>
            <Input id="payment_id" {...register("payment_id")} />
            {errors.payment_id && <p>{errors.payment_id.message}</p>}
          </div>
          <div className="pt-4">
            <Label htmlFor="paymentdetails_amount">Amount Paid</Label>
            <Input id="paymentdetails_amount" {...register("paymentdetails_amount")} />
            {errors.paymentdetails_amount && <p className="text-red-400 text-sm">{errors.paymentdetails_amount.message}</p>}
          </div>
          <div className="pt-4">
            <Label htmlFor="paymentdetails_des">Payment Remarks</Label>
            <Input id="paymentdetails_desc" {...register("paymentdetails_desc")} />
            {errors.paymentdetails_desc && <p className="text-red-400 text-sm">{errors.paymentdetails_desc.message}</p>}
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