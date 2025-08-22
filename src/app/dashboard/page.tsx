// app/dashboard/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import homepageData from '../../../assets/homepage.json'

interface Button {
  text: string;
  link: string;
}

interface HomepageData {
  title: string;
  description: string;
  features: string[];
  images: string[];
  buttons: Button[];
}

export default function DashboardPage() {
  const [data, setData] = useState<HomepageData | null>(homepageData);
  const [newFeature, setNewFeature] = useState('');
  const [newImage, setNewImage] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch JSON data
  useEffect(() => {
    fetch('/assets/homepage.json')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(console.error);
  }, []);

  // Add new feature
  const addFeature = () => {
    if (!data) return;
    const updated = { ...data, features: [...data.features, newFeature] };
    setData(updated);
    setNewFeature('');
  };

  // Add new image
  const addImage = () => {
    if (!data) return;
    const updated = { ...data, images: [...data.images, newImage] };
    setData(updated);
    setNewImage('');
  };

  // Save changes
  const saveChanges = async () => {
    if (!data) return;
    setLoading(true);
    try {
      const res = await fetch('/api/commit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      });
      const result = await res.json();
      alert(result.message);
    } catch (err) {
      console.error(err);
      alert('Failed to save changes.');
    }
    setLoading(false);
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-12 p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">Dashboard CMS</h1>
      <div className="mb-6">
        <label className="block text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Title</label>
        <input
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={data.title}
          onChange={e => setData({ ...data, title: e.target.value })}
          placeholder="Edit title"
        />
      </div>
      <div className="mb-6">
        <label className="block text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Description</label>
        <textarea
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={data.description}
          onChange={e => setData({ ...data, description: e.target.value })}
        />
      </div>
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Features</h3>
        <ul className="space-y-2 mb-2">
          {data.features.map((f, i) => (
            <li key={i} className="flex gap-2 items-center">
              <input
                className="flex-1 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={f}
                onChange={e => {
                  const updatedFeatures = [...data.features];
                  updatedFeatures[i] = e.target.value;
                  setData({ ...data, features: updatedFeatures });
                }}
              />
            </li>
          ))}
        </ul>
        <div className="flex gap-2">
          <input
            className="flex-1 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newFeature}
            onChange={e => setNewFeature(e.target.value)}
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
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Images</h3>
        <ul className="space-y-2 mb-2">
          {data.images.map((img, i) => (
            <li key={i} className="flex gap-2 items-center">
              <input
                className="flex-1 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={img}
                onChange={e => {
                  const updatedImages = [...data.images];
                  updatedImages[i] = e.target.value;
                  setData({ ...data, images: updatedImages });
                }}
              />
            </li>
          ))}
        </ul>
        <div className="flex gap-2">
          <input
            className="flex-1 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newImage}
            onChange={e => setNewImage(e.target.value)}
            placeholder="Add new image"
          />
          <button
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold shadow"
            onClick={addImage}
          >
            Add Image
          </button>
        </div>
      </div>
      <div className="mt-8 text-center">
        <button
          className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-bold shadow"
          onClick={saveChanges}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
