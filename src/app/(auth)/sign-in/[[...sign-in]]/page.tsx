"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/lib/api";

export default function SignIn() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const { mutate } = useMutation({
    mutationFn: loginUser,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutate(form);
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        {/* Heading section */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter">Welcome Back</h1>
          <p className="text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>
        {/* Form Section */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* username */}
          <div className="space-y-2 ">
            <Label>Username</Label>
            <Input
              id="username"
              type="text"
              name="username"
              placeholder="arihantjain123"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>
          {/* Password */}
          <div className="space-y-2 ">
            <Label>Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          {/* Button */}
          <Button type="submit" className="w-full" size="lg">
            Sign In
          </Button>
        </form>
        <div className="flex items-center justify-center space-x-2">
          <Link href={"/sign-up"}>Don't have an acoount? Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
