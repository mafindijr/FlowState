"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/actions/auth"; // For mock simplicity, we use the loginUser action to set the cookie

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type FormData = z.infer<typeof formSchema>;

export default function SignupPage() {
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
      // Mock signup flow calls the same login action to set the auth cookie
      const response = await loginUser(formData);
      if (response.error) {
        setError(response.error);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (e) {
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
        <p className="text-sm text-muted-foreground mt-1">Join the premium real estate network</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold">Full Name</label>
          <Input 
            {...register("name")} 
            type="text" 
            placeholder="John Doe" 
            className="h-11 rounded-xl"
          />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>

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
          <label className="text-sm font-semibold">Password</label>
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
          {isSubmitting ? "Creating account..." : "Sign Up"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-primary font-semibold hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
}
