"use client";

import React from "react";
import { useAppContext } from "@/context/AppContext";
import MainScreen from "@/component/mainScreen";
import Navbar from "@/component/navbar";
import EditHomePage from "@/component/editHomePage";
import EditAboutPage from "@/component/editAboutPage";

export default function DashboardPage() {
  const { isAdmin, isAuthLoading } = useAppContext();

  if (isAuthLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-spin"
          >
            <rect x="10" y="10" width="40" height="40" rx="8" fill="#0070f3" />
            <circle cx="20" cy="20" r="4" fill="#fff" />
            <circle cx="40" cy="20" r="4" fill="#fff" />
            <circle cx="20" cy="40" r="4" fill="#fff" />
            <circle cx="40" cy="40" r="4" fill="#fff" />
            <circle cx="30" cy="30" r="4" fill="#fff" />
          </svg>
          <div className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
            Authenticating...
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <div className="text-2xl font-bold text-red-600 mb-2">
          Access Denied
        </div>
        <div className="mb-4 text-gray-700 dark:text-gray-200">
          You need to validate yourself first.
        </div>
        <button
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold shadow"
          onClick={() => (window.location.href = "/admin")}
        >
          Go to Admin Login
        </button>
      </div>
    );
  }

  // Accordion and content editor components
  function AccordionSection({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) {
    const [open, setOpen] = React.useState(false);
    return (
      <div className="mb-4 border rounded shadow">
        <button
          className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 hover:bg-gray-200 focus:outline-none"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="font-semibold text-gray-800">{title}</span>
          <span>{open ? "▲" : "▼"}</span>
        </button>
        {open && <div className="p-4 bg-white">{children}</div>}
      </div>
    );
  }

  // Main dashboard UI
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <MainScreen>
        {/* Accordion for Home and About page content editing */}
        <div className="w-full mx-auto">
          <AccordionSection title="Edit Home Page Content">
            <EditHomePage />
          </AccordionSection>
          <AccordionSection title="Edit About Page Content">
            <EditAboutPage />
          </AccordionSection>
        </div>
      </MainScreen>
    </div>
  );
}
