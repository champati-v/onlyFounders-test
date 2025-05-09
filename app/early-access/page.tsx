"use client";
import { API_URL } from '@/lib/config';
import type React from "react";

import {
  Hexagon,
  CheckSquare,
  Users,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useState } from "react";
import Image from "next/image";
import { sendConfirmationEmail, sendFormData } from "./actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";

// Load Inter font
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    xHandle: "",
    telegram: "",
    founderType: "",
    walletAddress: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({});

    try {
      console.log("FormDATA here 0000 ", formData.name, formData.email);

      const saveData = await fetch(
        `${API_URL}/api/auth/store-early-access-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.name,
            email: formData.email,
            role: formData.founderType,
            twitter: formData.xHandle,
            telegram: formData.telegram,
            walletAddress: formData.walletAddress,
          }),
        }
      );

      if (saveData.ok) {
        console.log("Data saved successfully");

        const result = await sendFormData(formData);
        setSubmitStatus({
          success: true,
          message: "Cheers! You made it! Expect updates soon.",
        });

        const response = await sendConfirmationEmail(formData);
        if (!response.success) {
          console.error("Error sending confirmation email");
          setSubmitStatus({
            success: false,
            message:
              "Confirmation email could not be sent. Please try again later.",
          });
        }
      }

      if (saveData.status === 400) {
        setSubmitStatus({
          success: false,
          message: "You've already applied with this email",
        });
      }

      // Reset form on success
      setFormData({
        name: "",
        email: "",
        xHandle: "",
        telegram: "",
        founderType: "",
        walletAddress: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus({
        success: false,
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Only Founders - Where Founders Come First</title>
        <meta
          name="description"
          content="The platform where founders come first. And second. And third."
        />
      </Head>

      <main
        className={`${inter.className} min-h-screen flex flex-col items-center justify-center p-4 text-white relative bg-gradient-to-br from-[#000510] via-[#0a0a20] to-[#1a1a40] bg-fixed`}
      >
        <Link href="/" className="hidden md:block">
          <Button className="absolute top-10 top- left-5 flex gap-2 items-center justify-between">
            <ArrowLeft /> Back to Home{" "}
          </Button>
        </Link>

        <Link href="/" className="block md:hidden z-50">
          <Button className="absolute top-10 left-5 flex gap-2 items-center justify-between">
            <ArrowLeft />
          </Button>
        </Link>
        {/* Content container */}
        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
          {/* Logo */}
          <div className="flex items-center mb-10 md:mb-16">
            <Image
              src="/onlyFounder_logo.svg"
              height={250}
              width={250}
              alt="Only Founders Logo"
            />
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-4 leading-tight">
            <div>
              We aren&apos;t{" "}
              <span className="bg-gradient-to-r from-[#6e56cf] to-[#9f7aea] text-transparent bg-clip-text">
                Anti-VCs
              </span>
              .
            </div>
            <div>
              We are{" "}
              <span className="bg-gradient-to-r from-[#6e56cf] to-[#9f7aea] text-transparent bg-clip-text">
                <br className="md:hidden" /> Pro-Founders
              </span>
              .
            </div>
          </h1>

          {/* Subheading */}
          <p className="text-lg text-gray-300 text-center mb-16">
            The platform where founders come first. And second. And third.
          </p>

          {/* Form container */}
          <div className="w-full max-w-md bg-[#0a0a32]/80 backdrop-blur-sm rounded-lg p-8 border border-[#1a1a3a] shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-2">
              Subscribe to Success
            </h2>
            <p className="text-gray-400 text-center mb-6">
              No term sheets, just sweet, sweet funding.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name (The One VCs Keep Mispronouncing)"
                className="w-full h-10 px-3 py-2 bg-[#0d0d2d] border border-[#272874] rounded-md text-sm text-white placeholder:text-gray-500 focus:border-[#6e56cf] focus:ring-2 focus:ring-[#6e56cf]/25 outline-none transition-all"
                required
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email (We Promise Not To Spam... Unlike VCs)"
                className="w-full h-10 px-3 py-2 bg-[#0d0d2d] border border-[#272874] rounded-md text-sm text-white placeholder:text-gray-500 focus:border-[#6e56cf] focus:ring-2 focus:ring-[#6e56cf]/25 outline-none transition-all"
                required
              />

              <input
                type="text"
                name="xHandle"
                value={formData.xHandle}
                onChange={handleChange}
                placeholder="X Handle (For The Spicy Takes)"
                className="w-full h-10 px-3 py-2 bg-[#0d0d2d] border border-[#272874] rounded-md text-sm text-white placeholder:text-gray-500 focus:border-[#6e56cf] focus:ring-2 focus:ring-[#6e56cf]/25 outline-none transition-all"
              />

              <input
                type="text"
                name="telegram"
                value={formData.telegram}
                onChange={handleChange}
                placeholder="Telegram Handle (Join Us)"
                className="w-full h-10 px-3 py-2 bg-[#0d0d2d] border border-[#272874] rounded-md text-sm text-white placeholder:text-gray-500 focus:border-[#6e56cf] focus:ring-2 focus:ring-[#6e56cf]/25 outline-none transition-all"
              />

              <div className="relative">
                <select
                  name="founderType"
                  value={formData.founderType}
                  onChange={handleChange}
                  className="w-full h-10 px-3 py-2 bg-[#0d0d2d] border border-[#272874] rounded-md text-sm text-white appearance-none focus:border-[#6e56cf] focus:ring-2 focus:ring-[#6e56cf]/25 outline-none transition-all"
                  required
                >
                  <option value="" disabled>
                    Founder Type
                  </option>
                  <option value="Founder">Founder (Tired of VC BS)</option>
                  <option value="Investor">Investor (The Cool Kind)</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <input
                type="text"
                name="walletAddress"
                value={formData.walletAddress}
                onChange={handleChange}
                placeholder="Wallet Address (Where The Magic Happens)"
                className="w-full h-10 px-3 py-2 bg-[#0d0d2d] border border-[#272874] rounded-md text-sm text-white placeholder:text-gray-500 focus:border-[#6e56cf] focus:ring-2 focus:ring-[#6e56cf]/25 outline-none transition-all"
              />

              {submitStatus.message && (
                <div
                  className={`p-3 rounded-md ${
                    submitStatus.success
                      ? "bg-green-900/50 text-green-200 border border-green-700"
                      : "bg-red-900/50 text-red-200 border border-red-700"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-[#4338ca] to-[#6366f1] hover:from-[#4338ca]/90 hover:to-[#6366f1]/90 text-white font-medium py-2.5 px-4 rounded-md transition-all duration-200 mt-2 ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Submitting..." : "Get Exclusive Access"}
              </button>
            </form>
          </div>

          {/* Feature Cards */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-10 md:mt-16">
            {/* Card 1 */}
            <div className="w-[400px] max-w-[550px] h-[250px] bg-[#0a0a32]/80 backdrop-blur-sm rounded-2xl p-8 border border-[#1a1a3a] flex flex-col gap-4 shadow-lg hover:translate-y-[-5px] hover:shadow-xl transition-all duration-200">
              <div className="text-[#4361ee] text-2xl">
                <CheckSquare className="h-6 w-6 stroke-[#4361ee]" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                No VC, No Problem
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Skip the awkward coffee meetings. Our AI matches you with
                investors who won't demand your first-born child.
              </p>
            </div>

            {/* Card 2 */}
            <div className="w-[400px] max-w-[550px] h-[250px] bg-[#0a0a32]/80 backdrop-blur-sm rounded-2xl p-8 border border-[#1a1a3a] flex flex-col gap-4 shadow-lg hover:translate-y-[-5px] hover:shadow-xl transition-all duration-200">
              <div className="text-[#4361ee] text-2xl">
                <Users className="h-6 w-6 stroke-[#4361ee]" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                Blockchain & Chill
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Secure, transparent funding that doesn't require a Stanford
                degree or a cousin named Chad.
              </p>
            </div>

            {/* Card 3 */}
            <div className="w-[400px] max-w-[550px] h-[250px] bg-[#0a0a32]/80 backdrop-blur-sm rounded-2xl p-8 border border-[#1a1a3a] flex flex-col gap-4 shadow-lg hover:translate-y-[-5px] hover:shadow-xl transition-all duration-200">
              <div className="text-[#4361ee] text-2xl">
                <TrendingUp className="h-6 w-6 stroke-[#4361ee]" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                Founder's Only
              </h3>
              <p className="text-gray-400 leading-relaxed">
                A platform that treats you like the main character, not just
                another slide in someone's portfolio.
              </p>
            </div>
          </div>

          {/* icons */}
          <div>
            <a href=""></a>
            <a href=""></a>
            <a href=""></a>
            <a href=""></a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mt-7 pt-10">
          <Link
            href="https://x.com/onlyfoundersxyz"
            target="_blank"
            className="flex items-center"
          >
            <Image src="/x.svg" width={30} height={30} alt="X logo" />
            <p className="text-white/80">@onlyfoundersxyz</p>
          </Link>
          <p className="hover:text-blue-600 transition-all duration-300 cursor-pointer text-center pt-5 pb-10">
            © 2025 OnlyFounders. All rights reserved.
          </p>
        </div>
      </main>

      {/* Global styles */}
      <style jsx global>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html,
        body {
          height: 100%;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          font-family: ${inter.style.fontFamily}, -apple-system,
            BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
            "Open Sans", "Helvetica Neue", sans-serif;
        }
      `}</style>
    </>
  );
}
