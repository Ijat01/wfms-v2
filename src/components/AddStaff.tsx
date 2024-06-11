"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const formSchema = z.object({
    
    fullname: z.string().min(10, {message: "Please insert your full name"}),
    username: z.string().min(5, {message: "Please insert 5 minimum character"}),
    email: z.string().email(),
    phoneno: z.string().min(10, {message: "Please insert your phone number"}),
    role: z.string().min(1, {message: "Please choose one role"} )
    
})
;


 export function DialogDemo() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            fullname: "",
            username: "",
            email: "",
            phoneno: "",
            role: ""
        }
    })

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {


        console.log(values)
    }

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" className="h-7 gap-1" variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[1000px]">
          <DialogHeader>
            <DialogTitle>Add New Staff</DialogTitle>
            <DialogDescription>
              
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit = {form.handleSubmit(handleSubmit)}>
            <FormField
                control={form.control}
                name="fullname"
                render={({field}) => {
                 
                    return <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Full Name" {...field}/>
                        </FormControl>
                       <FormMessage/> 
                    </FormItem>

                }  
                }
            />
            <FormField
                control={form.control}
                name="email"
                render={({field}) => {
                 
                    return <FormItem className="pt-2">
                        <FormLabel> Email </FormLabel>
                        <FormControl>
                            <Input placeholder="Email" {...field}/>
                        </FormControl>
                       <FormMessage/> 
                    </FormItem>

                }  
                }
            />
            <FormField
                control={form.control}
                name="phoneno"
                render={({field}) => {
                 
                    return <FormItem className="pt-2">
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                            <Input placeholder="Phone Number" {...field}/>
                        </FormControl>
                       <FormMessage/> 
                    </FormItem>

                }  
                }
            />
            <div>
            <FormField 
                control={form.control}
                name="username"
                render={({field}) => {
                 
                    return <FormItem className="pt-2">
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input placeholder="please set username for login" {...field}/>
                        </FormControl>
                       <FormMessage/> 
                    </FormItem>

                }  
                }
            />
            <FormField 
                control={form.control}
                name="role"
                render={({field}) => {
                 
                    return <FormItem className="pt-2">
                        <FormLabel>Role</FormLabel>
                        <FormControl>
                        <RadioGroup onValueChange={field.onChange}>
                            <div className="flex">
                                <div className="flex items-center ">
                                <RadioGroupItem value="Marketer" id="r1" />
                                <Label className="pl-4" htmlFor="r1">Marketer</Label>
                                </div>
                                <div className="pl-10 flex items-center">
                                <RadioGroupItem  value="Staff" id="r2" />
                                <Label className="pl-4" htmlFor="r2">Staff</Label>
                                </div>
                            </div>
                        </RadioGroup>
                        </FormControl>
                       <FormMessage/> 
                    </FormItem>

                }  
                }
            />
            </div>
            <DialogFooter className="pt-6">
            <DialogTrigger asChild>
            <Button type="submit">Add New Staff</Button>
            </DialogTrigger>
            </DialogFooter>
            </form>   
            </Form>
          
        </DialogContent>
      </Dialog>
    )
  }