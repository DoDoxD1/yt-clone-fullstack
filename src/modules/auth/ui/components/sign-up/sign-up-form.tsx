import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

interface formProps {
  form: {
    username: string;
    password: string;
    fullName: string;
    email: string;
    confirmPassword: string;
    avatar: File | undefined;
    coverImage: File | undefined;
  };
  handleSubmit: (e: React.FormEvent) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SignupForm({
  form,
  handleChange,
  handleSubmit,
}: formProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* fullname */}
      <div className="space-y-2 ">
        <Label>Fullname</Label>
        <Input
          id="fullName"
          name="fullName"
          type="text"
          placeholder="Enter you fullname"
          value={form.fullName}
          onChange={handleChange}
          required
        />
      </div>
      {/* email */}
      <div className="space-y-2 ">
        <Label>Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="example@test.com"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>
      {/* username */}
      <div className="space-y-2 ">
        <Label>Username</Label>
        <Input
          id="username"
          name="username"
          type="text"
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
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="password"
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
      {/* Confirm Password */}
      <div className="space-y-2 ">
        <Label>Confirm Password</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder="confirm password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      {/* Avatar */}
      <div className="space-y-2 ">
        <Label>Avatar</Label>
        <div className="relative">
          <Input
            id="avatar"
            name="avatar"
            type="file"
            required
            onChange={handleChange}
          />
        </div>
      </div>
      {/* Cover Image */}
      <div className="space-y-2 ">
        <Label>Cover Image</Label>
        <div className="relative">
          <Input
            id="coverImage"
            name="coverImage"
            type="file"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
      </div>
      {/* Button */}
      <Button type="submit" className="w-full" size="lg">
        Sign Up
      </Button>
    </form>
  );
}
