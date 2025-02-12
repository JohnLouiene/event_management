"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SignIn = () => {
  const [hostName, setHostName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { hostName, email, password });
  };

  return (
    <div className="flex h-screen w-screen">

      {/* Left side - Sign In Form */}
      <div className="w-full md:w-3/5 flex items-center justify-center bg-white px-16 py-8">
        <div className="w-full max-w-2xl space-y-10">
          <div className="space-y-2 text-center">
            <h1 className="text-4xl font-bold text-violet-600">ILOVATION</h1>
            <h2 className="text-3xl font-semibold text-gray-900">Sign In</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">EMAIL</label>
              <Input
                placeholder="Enter your e-mail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border-gray-200 h-12"
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">PASSWORD</label>
                <Link 
                  href="/forgot-password" 
                  className="text-sm text-violet-600 hover:text-violet-700"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border-gray-200 h-12"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-violet-600 hover:bg-violet-700 text-white py-6 rounded-lg text-lg font-medium"
            >
              Sign In
            </Button>
            
            <p className="text-center text-sm text-gray-600">
              Don't have an account yet?{" "}
              <Link href="/sign-up" className="text-violet-600 hover:text-violet-700 font-medium">
                Sign Up
              </Link>
            </p>
          </form>         
        </div>
      </div>
      {/* Right side - Image */}
      <div className="hidden md:block w-2/5 relative">
        <div className="absolute inset-0 bg-black/60">
          <div className="h-full flex items-center justify-center">
            <h1 className="text-6xl font-bold text-white tracking-wider">ILOVATION</h1>
          </div>
        </div>
        <img
          src="/images/login.png"
          alt="Sign In background"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default SignIn;