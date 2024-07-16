import React, { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { AddBookingForm } from "./AddBookingForm";
import { AddPaymentForm } from "@/components/Payment/AddPaymentForm";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export const AddBookingDialog: React.FC = () => {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          Add Booking
        </Button>
      </DialogTrigger>
    
        <DialogContent className="max-w-[1000px]" >
          <AddBookingForm/>
        </DialogContent>

    </Dialog>
  );
};