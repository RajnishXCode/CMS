import React, { useState, useEffect } from "react";
import aboutpageData from "@/assets/aboutpage.json";

interface TeamMember {
  name: string;
  role: string;
}

interface Contact {
  email: string;
}

interface AboutPageData {
  title: string;
  description: string;
  features: string[];
  team: TeamMember[];
  contact: Contact;
}

const EditAboutPage: React.FC = () => {
  const [data, setData] = useState<AboutPageData | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    setData(aboutpageData);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!data) return;
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleFeatureChange = (idx: number, value: string) => {
    if (!data) return;
    const features = [...data.features];
    features[idx] = value;
    setData({ ...data, features });
  };

  const handleAddFeature = () => {
    if (!data) return;
    setData({ ...data, features: [...data.features, ""] });
  };

  const handleRemoveFeature = (idx: number) => {
    if (!data) return;
    const features = data.features.filter((_, i) => i !== idx);
    setData({ ...data, features });
  };

  const handleTeamChange = (idx: number, field: keyof TeamMember, value: string) => {
    if (!data) return;
    const team = [...data.team];
    team[idx] = { ...team[idx], [field]: value };
    setData({ ...data, team });
  };

  const handleAddTeam = () => {
    if (!data) return;
    setData({ ...data, team: [...data.team, { name: "", role: "" }] });
  };

  const handleRemoveTeam = (idx: number) => {
    if (!data) return;
    const team = data.team.filter((_, i) => i !== idx);
    setData({ ...data, team });
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!data) return;
    setData({ ...data, contact: { ...data.contact, email: e.target.value } });
  };

  const handleSave = async () => {
    if (!data) return;
    setLoading(true);
    console.log("Simulated save:", data);
    try {
      const res = await fetch("/api/commit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data, path: "src/assets/aboutpage.json" }),
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
      <h2 className="text-xl font-bold mb-4">Edit About Page Content</h2>
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
        <label className="block font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={data.description}
          onChange={handleChange}
          className="w-full p-2 border rounded min-h-[80px]"
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-2">Features</label>
        {data.features.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-2 mb-2">
            <input
              type="text"
              value={feature}
              onChange={e => handleFeatureChange(idx, e.target.value)}
              placeholder={`Feature ${idx + 1}`}
              className="p-2 border rounded w-2/3"
            />
            <button
              className="px-2 py-1 bg-red-500 text-white rounded"
              onClick={() => handleRemoveFeature(idx)}
              type="button"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          className="px-3 py-1 bg-green-600 text-white rounded mt-2"
          onClick={handleAddFeature}
          type="button"
        >
          Add Feature
        </button>
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-2">Team</label>
        {data.team.map((member, idx) => (
          <div key={idx} className="flex items-center gap-2 mb-2">
            <input
              type="text"
              value={member.name}
              onChange={e => handleTeamChange(idx, "name", e.target.value)}
              placeholder="Name"
              className="p-2 border rounded w-1/3"
            />
            <input
              type="text"
              value={member.role}
              onChange={e => handleTeamChange(idx, "role", e.target.value)}
              placeholder="Role"
              className="p-2 border rounded w-1/2"
            />
            <button
              className="px-2 py-1 bg-red-500 text-white rounded"
              onClick={() => handleRemoveTeam(idx)}
              type="button"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          className="px-3 py-1 bg-green-600 text-white rounded mt-2"
          onClick={handleAddTeam}
          type="button"
        >
          Add Team Member
        </button>
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-1">Contact Email</label>
        <input
          type="email"
          value={data.contact.email}
          onChange={handleContactChange}
          className="w-full p-2 border rounded"
        />
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

export default EditAboutPage;