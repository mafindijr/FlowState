"use server";

import { cookies } from "next/headers";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function loginUser(formData: FormData) {
  // Simulate network
  await new Promise((resolve) => setTimeout(resolve, 800));

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const result = loginSchema.safeParse({ email, password });

  if (!result.success) {
    return { error: "Invalid email or password." };
  }

  // 1. Authenticate user (mocking successful auth regardless of credentials for demo)
  const cookieStore = await cookies();

  // 2. Set an HTTP-Only cookie to represent auth state
  cookieStore.set("auth_token", "mock_secure_token_12345", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  });

  return { success: true };
}

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
}

export async function checkAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token");
  return !!token;
}
