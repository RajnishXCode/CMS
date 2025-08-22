"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import homepageData from "@/assets/homepage.json";
import { useAppContext } from "@/context/AppContext";

interface Button {
  text: string;
  link: string;
}

interface HomepageData {
  title: string;
  description: string;
  features: string[];
  image: string;
  buttons: Button[];
}

export default function DashboardPage() {

  const { isAdmin, } = useAppContext();

  const [data, setData] = useState<HomepageData | null>(homepageData);
  const [newFeature, setNewFeature] = useState("");
  const [newImage, setNewImage] = useState("");
  const [publicImages, setPublicImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Helper to get image name without leading slash
  const getImageName = (img: string) => img.replace(/^\//, "");
  const [selectedImage, setSelectedImage] = useState(
    getImageName(data?.image || "")
  );


  useEffect(() => {
    fetch("/api/list-public-images")
      .then(res => res.json())
      .then(data => setPublicImages(data.files));
  }, []);

  const addFeature = () => {
    if (!data || !newFeature.trim()) return;
    setData({ ...data, features: [...data.features, newFeature] });
    setNewFeature("");
  };

  const deleteFeature = (index: number) => {
    if (!data) return;
    const updatedFeatures = [...data.features];
    updatedFeatures.splice(index, 1);
    setData({ ...data, features: updatedFeatures });
  };

  /** Update image in JSON (dropdown or link) */
  const updateImage = () => {
    if (!data) return;
    let imageValue = "";
    if (selectedImage) {
      imageValue = selectedImage;
    } else if (newImage) {
      imageValue = newImage;
    }
    if (!imageValue) return;
    setData({ ...data, image: imageValue });
    setSelectedImage("");
    setNewImage("");
  };

  /** Save changes to GitHub (serverless commit) */
  const saveChanges = async () => {
    if (!data) return;
    setLoading(true);
    console.log("Simulated save:", data);
    try {
      const res = await fetch("/api/commit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data, path: "assets/homepage.json" }),
      });
      const result = await res.json();
      alert(result.message);
    } catch (err) {
      console.error(err);
      alert("Failed to save changes.");
    }
    setLoading(false);
  };

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <div className="text-2xl font-bold text-red-600 mb-2">Access Denied</div>
        <div className="mb-4 text-gray-700 dark:text-gray-200">You need to validate yourself first.</div>
        <button
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold shadow"
          onClick={() => window.location.href = '/admin'}
        >
          Go to Admin Login
        </button>
      </div>
    );
  }

  if (!data) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-12 p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">
        Dashboard CMS
      </h1>

      {/* Title */}
      <div className="mb-6">
        <label className="block text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Title
        </label>
        <input
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          placeholder="Edit title"
        />
      </div>

      {/* Description */}
      <div className="mb-6">
        <label className="block text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Description
        </label>
        <textarea
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />
      </div>

      {/* Features */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Features
        </h3>
        <ul className="space-y-2 mb-2">
          {data.features.map((f, i) => (
            <li key={i} className="flex gap-2 items-center">
              <input
                className="flex-1 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={f}
                onChange={(e) => {
                  const updatedFeatures = [...data.features];
                  updatedFeatures[i] = e.target.value;
                  setData({ ...data, features: updatedFeatures });
                }}
              />
              <button
                className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
                onClick={() => deleteFeature(i)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <div className="flex gap-2">
          <input
            className="flex-1 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            placeholder="Add new feature"
          />
          <button
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold shadow"
            onClick={addFeature}
          >
            Add Feature
          </button>
        </div>
      </div>

      {/* Image selection */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Image
        </h3>
        <div className="flex flex-col gap-4">
          {/* Dropdown for public images */}
          <div className="flex gap-2 items-center">
            <label className="font-semibold text-gray-700 dark:text-gray-200">
              Choose from public:
            </label>
            <select
              className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              value={getImageName(selectedImage)}
              onChange={(e) => {
                const val = e.target.value;
                setSelectedImage("/" + val);
                setNewImage("");
                if (data) setData({ ...data, image: "/" + val });
              }}
            >
              <option value="">-- Select Image --</option>
              {publicImages.map((img) => (
                <option key={img} value={getImageName(img)}>
                  {getImageName(img)}
                </option>
              ))}
            </select>
          </div>
          {/* Or external link */}
          <div className="flex gap-2 items-center">
            <label className="font-semibold text-gray-700 dark:text-gray-200">
              Or external link:
            </label>
            <input
              type="text"
              placeholder="Paste image URL"
              className="flex-1 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              value={newImage}
              onChange={(e) => {
                setNewImage(e.target.value);
                setSelectedImage("");
              }}
            />
          </div>
          <button
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold shadow"
            onClick={updateImage}
          >
            Update Image
          </button>
        </div>
        {/* Preview current image */}
        {data.image && (
          <div className="mt-4">
            <p className="text-gray-700 dark:text-gray-200 mb-2">
              Current Image Preview: {data.image}
            </p>
            <img
              src={data.image}
              alt="preview"
              className="w-40 h-40 object-cover rounded-md border"
            />
          </div>
        )}
        {/* Upload image UI removed as requested */}
      </div>

      {/* Save changes */}
      <div className="mt-8 text-center">
        <button
          className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-bold shadow"
          onClick={saveChanges}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
