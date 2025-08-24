"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BackgroundGradient } from "@/components/ui/background-gradient";

function LoginPage() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("User LoggedIn successful", response.data);
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password));
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <BackgroundGradient className="w-[400px] rounded-[20px]">
        <div className="flex flex-col gap-3 p-6">
          <h2 className="text-center mb-5 font-semibold text-3xl text-white">
            {loading ? "Processing..." : "Sign In"}
          </h2>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-white font-semibold mb-1">Email :</label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Enter Email"
              className="w-full px-3 py-2 rounded-lg border border-gray-400 bg-transparent text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-white font-semibold mb-1">Password :</label>
            <input
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter password"
              className="w-full px-3 py-2 rounded-lg border border-gray-400 bg-transparent text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Button */}
          <button
            onClick={onLogin}
            disabled={buttonDisabled}
            className="p-2 text-center border border-gray-300 rounded-lg text-white hover:bg-gray-700 disabled:opacity-50"
          >
            {buttonDisabled ? "Fill details first" : "Login"}
          </button>

          <Link href="/profile" className="text-blue-400 underline text-center">
            Visit Profile page
          </Link>
        </div>
      </BackgroundGradient>
    </div>
  );
}

export default LoginPage;
