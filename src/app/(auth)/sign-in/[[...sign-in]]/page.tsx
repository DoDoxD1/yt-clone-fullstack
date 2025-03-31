"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      username: username,
      password: password,
    };
    try {
      const response = await fetch("http://localhost:3000/api/v1/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.status === 200) {
        const result = await response.json();
        alert(result.message);
        router.push("/");
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }
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
              placeholder="arihantjain123"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 ">
              <Checkbox id="remeber" />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            <Button
              variant="link"
              className="text-sm text-primary-500"
              onClick={(e) => e.preventDefault()}
            >
              Forgot Password?
            </Button>
          </div>
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
