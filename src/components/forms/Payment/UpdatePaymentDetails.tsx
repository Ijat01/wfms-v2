"use client"
import React, { useEffect } from "react";
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
import { PaymentSchema, PaymentSchemaType } from "@/lib/validators/payment";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Define User interface
interface UpdatePaymentProps {
    payment_id: string,
    payment_balance: string,
    payment_total: string,  
  }

export function UpdatePaymentDialog({ payment_balance,payment_id,payment_total }: UpdatePaymentProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PaymentSchemaType>({
    resolver: zodResolver(PaymentSchema),
  });

  useEffect(() => {
      setValue("payment_balance", payment_balance);
      setValue("payment_id", payment_id);
      setValue("payment_total", payment_total);
  }, [payment_balance, payment_id, payment_total, setValue]);

  const mutation = useMutation({
    mutationFn: async (formData: PaymentSchemaType) => {
      const endpoint = `/api/payment/UpdatePayment/`;
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

  const onSubmit = (data: PaymentSchemaType) => {
    mutation.mutate(data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button><FilePenLine></FilePenLine></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Update Payment</DialogTitle>
          <DialogDescription>
            Fill to update new payment total
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="hidden pt-4">
            <Label htmlFor="payment_id">Payment ID</Label>
            <Input id="payment_id" {...register("payment_id")} />
            {errors.payment_id && <p>{errors.payment_id.message}</p>}
          </div>
          <div className="pt-4">
            <Label htmlFor="payment_total">Payment Amount</Label>
            <Input id="payment_total" {...register("payment_total")} />
            {errors.payment_total && <p>{errors.payment_total.message}</p>}
          </div>
          <div className="hidden pt-4">
            <Label htmlFor="payment_balance">Payment Balance</Label>
            <Input id="payment_balance" type="payment_balance" {...register("payment_balance")} />
            {errors.payment_balance && <p>{errors.payment_balance.message}</p>}
          </div>
          <DialogFooter className="pt-4">
            <Button type="submit">
              Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
