"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HomeIcon } from "lucide-react";
import { useFormik } from "formik";
import * as yup from "yup";

export default function SignUp() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      email: yup.string().email("Invalid email").required("Email is required"),
      password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        if (res.ok) {
          router.push("/auth/signin");
        } else {
          const data = await res.json();
          throw new Error(data.error || "Registration failed");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      }
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
          <h1 className="text-2xl font-bold">Sign Up</h1>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded">{error}</div>
        )}

        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            required
            className="w-full p-2 border rounded"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.name}
            </div>
          )}
        </div>

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
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.email}
            </div>
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
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.password}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-500 disabled:cursor-not-allowed"
          disabled={formik.isSubmitting || formik.isValidating}
        >
          {formik.isSubmitting ? "Creating account..." : "Sign Up"}
        </button>

        <div className="text-sm text-center">
          Already have an account?{" "}
          <Link
            href="/auth/signin"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}
