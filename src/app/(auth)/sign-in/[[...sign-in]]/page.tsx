"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import SigninForm from "@/modules/auth/ui/components/sign-in/sign-in-form";
import AuthFooter from "@/modules/auth/ui/components/auth-footer";
import AuthHeader from "@/modules/auth/ui/components/auth-header";

export default function SignIn() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: (userData) => {
      queryClient.setQueryData(["get-user"], userData);
      router.push("/");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Authentication failed",
        description: error.message || "Invalid credentials. Please try again.",
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutate(form);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <AuthHeader
          heading="Welcome Back"
          text="Sign in to your account to continues"
        />
        <SigninForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          form={form}
        />
        <AuthFooter link="/sign-up" text="Don't have an acoount? Sign Up" />
      </div>
      <Toaster />
    </div>
  );
}
