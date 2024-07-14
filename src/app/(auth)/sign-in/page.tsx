"use client"
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

// Import UI components (assuming these are correctly implemented in "@/components/ui")
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import Image from "next/image";

// SignInPage component definition
const Page = () => {
  const [user_email, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const result = await signIn("credentials", {
        user_email,
        password,
        redirect: false, // Do not redirect, handle result locally
      });

      if (result?.error) {
        toast({
          title: "Invalid email or password",
          description: "Please enter correct email & password",
          variant: "destructive",
        });
      } else if (result?.ok) {
        toast({
          title: "Success",
          description: "Successfully signed in",
          variant: "success",
        });
        router.push('/admin/dashboard');
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occurred.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <main className="">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <Image className="mx-auto" width="70" height="70" src="/PWMS.png" alt=""/>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your Email and password below to login to your account.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={handleSignIn}>
            <div className="grid gap-2">
              <Label htmlFor="user_email">Email</Label>
              <Input
                id="user_email"
                type="email"
                placeholder="Enter your Email Address"
                value={user_email}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </div>
            <div className="grid pt-5 gap-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <CardFooter className="pt-5">
              <Button className="w-full" type="submit">
                Sign in
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

// Export SignInPage as default component
export default Page;
