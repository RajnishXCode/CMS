"use client"
import { useRouter } from "next/navigation";
import React from "react";
import { usePathname } from "next/navigation";

function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const TABS = [
        { key: "overview", label: "Overview", link: '/admin/dashboard' },
        { key: "blogs", label: "Manage Blogs", link: '/admin/edit-blogs' },
        { key: "images", label: "Manage Images", link: '/admin/edit-images' },
        { key: "settings", label: "Settings", link: '/admin/settings' },
      ];

      const [activeTab, setActiveTab] = React.useState(TABS[0].key);

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow">
      <div className="text-xl font-bold text-gray-800">Admin Dashboard</div>
      <div className="flex space-x-4">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`px-4 py-2 rounded font-medium transition-colors duration-150 focus:outline-none ${
              pathname === tab.link
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-blue-100"
            }`}
            onClick={() => router.push(tab.link)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
