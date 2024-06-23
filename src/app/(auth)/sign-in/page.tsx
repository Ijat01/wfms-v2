"use client"
// Import React and necessary hooks/components
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

// Import UI components (assuming these are correctly implemented in "@/components/ui")
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

// SignInPage component definition
const Page = () => {
  // State for email and password inputs
  const [user_id, setUserId ] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Attempt sign-in using NextAuth's signIn function
      const result = await signIn("credentials", {
        user_id: user_id,
        password: password, // Do not redirect, handle result locally
      })
    } catch(error){

      toast({
        title: "Error",
        description: "Something went wrong. Please try again later",
        variant: "destructive"
      });

    } 
  };

  // Render the sign-in form using UI components
  return (
    <main className="">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your Ic number and password below to login to your account.</CardDescription>
        </CardHeader>
        <CardContent className="grid  gap-4">
          <form onSubmit={handleSignIn}>
            <div className="grid gap-2">
              <Label htmlFor="email">Ic Number</Label>
              <Input id="user_id" type="" placeholder="" value={user_id} onChange={(e) => setUserId(e.target.value)} required />
            </div>
            <div className="grid pt-5 gap-4">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <CardFooter className="pt-5">
              <Button className="w-full" type="submit">Sign in</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

// Export SignInPage as default component
export default Page;
