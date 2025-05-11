"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HomeIcon } from "lucide-react";
import { useFormik } from "formik";
import * as yup from "yup";

export default function SignIn() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("Invalid email").required("Email is required"),
      password: yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      if (response?.error) {
        setError("Invalid credentials");
        return;
      }
      router.refresh();
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={formik.handleSubmit}
        className="space-y-4 w-full max-w-md p-8"
      >
        <div className="flex items-center mb-4 gap-5">
          <button
            type="button"
            className="cursor-pointer flex"
            onClick={() => router.push("/")}
          >
            <HomeIcon />
          </button>
          <span className="text-2xl text-gray-600">/</span>
          <h1 className="text-2xl font-bold">Sign In</h1>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded">{error}</div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full p-2 border rounded"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            className="w-full p-2 border rounded"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-500 disabled:cursor-not-allowed"
          disabled={formik.isSubmitting || formik.isValidating}
        >
          {formik.isSubmitting || formik.isValidating
            ? "Signing in..."
            : "Sigin in"}
        </button>
        <div className="text-sm text-center">
          Need an account?{" "}
          <Link
            href="/auth/signup"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
