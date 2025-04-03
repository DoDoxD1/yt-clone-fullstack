import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

interface formProps {
  form: {
    username: string;
    password: string;
  };
  handleSubmit: (e: React.FormEvent) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SigninForm({
  form,
  handleSubmit,
  handleChange,
}: formProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* username */}
      <div className="space-y-2 ">
        <Label>Username</Label>
        <Input
          id="username"
          type="text"
          name="username"
          placeholder="username"
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
  );
}
