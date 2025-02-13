// app/sign-up/page.tsx
"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    givenName: "",
    middleName: "",
    lastName: "", 
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          givenName: formData.givenName,
          middleName: formData.middleName,
          lastName: formData.lastName,
          phoneNumber: formData.phoneNumber,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      // Redirect to login page on success
      router.push('/sign-in');
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen">
      {/* Left side - Image */}
      <div className="hidden md:block w-2/5 relative">
        <div className="absolute inset-0 bg-black/60">
          <div className="h-full flex items-center justify-center">
            <h1 className="text-6xl font-bold text-white tracking-wider">ILOVATION</h1>
          </div>
        </div>
        <img
          src="/images/login.png"
          alt="Sign Up background"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right side - Sign Up Form */}
      <div className="w-full md:w-3/5 flex items-center justify-center bg-white px-16 py-8">
        <div className="w-full max-w-2xl space-y-10">
          <div className="space-y-2 text-center">
            <h1 className="text-4xl font-bold text-violet-600">ILOVATION</h1>
            <h2 className="text-3xl font-semibold text-gray-900">Sign Up</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <p className="text-red-500 text-sm bg-red-50 p-3 rounded">{error}</p>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">NAME</label>
              <div className="flex gap-6">
                <Input
                  placeholder="Given Name"
                  type="text"
                  name="givenName"
                  value={formData.givenName}
                  onChange={handleChange}
                  className="flex-1 rounded-lg border-gray-200 h-12"
                  required
                />
                <Input
                  placeholder="Middle Name (Optional)"
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                  className="flex-1 rounded-lg border-gray-200 h-12"
                />
                <Input
                  placeholder="Last Name"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="flex-1 rounded-lg border-gray-200 h-12"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">EMAIL</label>
              <Input
                placeholder="Enter your e-mail"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-200 h-12"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">PHONE NUMBER (Optional)</label>
              <Input
                placeholder="Enter your phone number"
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-200 h-12"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">PASSWORD</label>
              <Input
                placeholder="Enter your password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-200 h-12"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">CONFIRM PASSWORD</label>
              <Input
                placeholder="Confirm your password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-200 h-12"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-violet-600 hover:bg-violet-700 text-white py-6 rounded-lg text-lg font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Sign Up"}
            </Button>
            
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-violet-600 hover:text-violet-700 font-medium">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;