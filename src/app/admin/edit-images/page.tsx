"use client"
import MainScreen from '@/component/mainScreen'
import Navbar from '@/component/navbar'
import { useAppContext } from '@/context/AppContext';
import React from 'react'

function ImagesPage() {
  const { isAdmin, isAuthLoading } = useAppContext();
    
      if (isAuthLoading) {
        return (
          <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-spin">
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
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <div>
        {/* <TabContent tab={activeTab} /> */}
        <MainScreen>
          edit images
        </MainScreen>
      </div>
    </div>
  )
}

export default ImagesPage