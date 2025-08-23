import React, { useState, useEffect } from "react";
import homepageData from "@/assets/homepage.json";

interface Button {
  text: string;
  link: string;
}

interface HomePageData {
  title: string;
  tagline: string;
  description: string;
  image: string;
  buttons: Button[];
}

const EditHomePage: React.FC = () => {
  const [data, setData] = useState<HomePageData | null>(homepageData);
  const [status, setStatus] = useState<string | null>(null);
  const [publicImages, setPublicImages] = useState<string[]>([]);
  const [newImage, setNewImage] = useState("");
  const [loading, setLoading] = useState(false);


  // Helper to get image name without leading slash
  const getImageName = (img: string) => img.replace(/^\//, "");
  const [selectedImage, setSelectedImage] = useState(
    getImageName(data?.image || "")
  );

  useEffect(() => {
    fetch("/api/list-public-images")
      .then((res) => res.json())
      .then((data) => setPublicImages(data.files));
  }, []);

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


  // -----------

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!data) return;
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleButtonChange = (
    idx: number,
    field: keyof Button,
    value: string
  ) => {
    if (!data) return;
    const buttons = [...data.buttons];
    buttons[idx] = { ...buttons[idx], [field]: value };
    setData({ ...data, buttons });
  };

  const handleAddButton = () => {
    if (!data) return;
    setData({ ...data, buttons: [...data.buttons, { text: "", link: "" }] });
  };

  const handleRemoveButton = (idx: number) => {
    if (!data) return;
    const buttons = data.buttons.filter((_, i) => i !== idx);
    setData({ ...data, buttons });
  };

  const handleSave = async () => {
    if (!data) return;
    setLoading(true);
    console.log("Simulated save:", data);
    try {
      const res = await fetch("/api/commit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data, path: "src/assets/homepage.json" }),
      });
      const result = await res.json();
      alert(result.message);
      setStatus("Saved!");

    } catch (err) {
      console.error(err);
      alert("Failed to save changes.");
    }

    setLoading(false);
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Edit Home Page Content</h2>
      <div className="mb-4">
        <label className="block font-medium mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={data.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-1">Tagline</label>
        <input
          type="text"
          name="tagline"
          value={data.tagline}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={data.description}
          onChange={handleChange}
          className="w-full p-2 border rounded min-h-[80px]"
        />
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

      <div className="mb-4">
        <label className="block font-medium mb-2">Buttons</label>
        {data.buttons.map((btn, idx) => (
          <div key={idx} className="flex items-center gap-2 mb-2">
            <input
              type="text"
              value={btn.text}
              onChange={(e) => handleButtonChange(idx, "text", e.target.value)}
              placeholder="Button Text"
              className="p-2 border rounded w-1/3"
            />
            <input
              type="text"
              value={btn.link}
              onChange={(e) => handleButtonChange(idx, "link", e.target.value)}
              placeholder="Button Link"
              className="p-2 border rounded w-1/2"
            />
            <button
              className="px-2 py-1 bg-red-500 text-white rounded"
              onClick={() => handleRemoveButton(idx)}
              type="button"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          className="px-3 py-1 bg-green-600 text-white rounded mt-2"
          onClick={handleAddButton}
          type="button"
        >
          Add Button
        </button>
      </div>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
        onClick={handleSave}
        type="button"
      >
         {loading ? "Saving..." : "Save Changes"}
      </button>
      {status && <span className="ml-4 text-green-600">{status}</span>}
    </div>
  );
};

export default EditHomePage;
