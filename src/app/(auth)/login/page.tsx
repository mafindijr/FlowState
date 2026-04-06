"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/actions/auth";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type FormData = z.infer<typeof formSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setError(null);
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    
    try {
      const response = await loginUser(formData);
      if (response.error) {
        setError(response.error);
      } else {
        router.push("/dashboard");
        router.refresh(); // Refresh layout to update Navbar auth state!
      }
    } catch (e) {
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground mt-1">Sign in to manage your premium listings</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold">Email</label>
          <Input 
            {...register("email")} 
            type="email" 
            placeholder="admin@flowstate.com" 
            className="h-11 rounded-xl"
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
             <label className="text-sm font-semibold">Password</label>
             <Link href="#" className="text-xs text-primary font-medium hover:underline">Forgot password?</Link>
          </div>
          <Input 
            {...register("password")} 
            type="password" 
            placeholder="••••••••" 
            className="h-11 rounded-xl"
          />
          {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
        </div>

        {error && (
          <div className="p-3 bg-destructive/10 text-destructive text-sm font-medium rounded-lg text-center">
            {error}
          </div>
        )}

        <Button 
          type="submit" 
          disabled={isSubmitting} 
          className="w-full h-11 rounded-xl font-bold text-base mt-2"
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link href="/signup" className="text-primary font-semibold hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
