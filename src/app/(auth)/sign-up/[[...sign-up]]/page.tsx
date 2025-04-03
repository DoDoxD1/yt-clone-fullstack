"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import AuthHeader from "@/modules/auth/ui/components/auth-header";
import AuthFooter from "@/modules/auth/ui/components/auth-footer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser } from "@/lib/api";
import { Toaster } from "@/components/ui/toaster";
import SignupForm from "@/modules/auth/ui/components/sign-up/sign-up-form";

export default function Page() {
  const [form, setForm] = useState<{
    username: string;
    password: string;
    fullName: string;
    email: string;
    confirmPassword: string;
    avatar: File | undefined;
    coverImage: File | undefined;
  }>({
    username: "",
    password: "",
    fullName: "",
    email: "",
    confirmPassword: "",
    avatar: undefined,
    coverImage: undefined,
  });

  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationFn: registerUser,
    onSuccess: (userData) => {
      queryClient.setQueryData(["register-user"], userData);
      router.push("/sign-in");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Sign Up failed",
        description: error.message || "Invalid credentials. Please try again.",
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "avatar" || e.target.name === "coverImage") {
      setForm({ ...form, [e.target.name]: e.target.files?.[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    const { confirmPassword, ...user } = form; // removing confirmpassword from form
    e.preventDefault();
    mutate(user);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <AuthHeader
          heading="Welcome to NewTube"
          text="Sign up to create a new account"
        />
        <SignupForm
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <AuthFooter link="/sign-in" text="Already have an acoount? Sign In" />
      </div>
      <Toaster />
    </div>
  );
}
