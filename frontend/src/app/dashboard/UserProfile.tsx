"use client";
import { useState, useRef } from "react";
import { updateUserProfile } from "./userActions";

export default function UserProfile({
  email,
  name,
  role,
  image: initialImage,
}: { email: string; name: string; role: string; image?: string | null }) {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({ name, email });
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<string | null>(initialImage || null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setEditMode(true);

  const handleCancel = () => {
    setProfile({ name, email });
    setEditMode(false);
    setMessage("");
    setPreview(image);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("email", profile.email);
      formData.append("name", profile.name);
      if (fileInputRef.current?.files?.[0]) {
        formData.append("image", fileInputRef.current.files[0]);
      }
      const res = await fetch("/api/user/update-profile", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to update profile");
      setImage(result.image || image);
      setMessage("Profile updated!");
      setEditMode(false);
    } catch (err: any) {
      setMessage(err.message || "Failed to update profile");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    if (editMode && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-8 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-indigo-700">User Profile</h2>
      <form onSubmit={handleSave}>
        <div className="flex flex-col items-center mb-6">
          <div
            className={`w-24 h-24 rounded-full border-4 border-indigo-200 shadow cursor-pointer flex items-center justify-center overflow-hidden ${editMode ? "hover:opacity-80" : ""
              }`}
            onClick={handleImageClick}
            title={editMode ? "Click to change image" : "User image"}
            style={{ background: "#f3f4f6" }}
          >
            {preview || image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview || image || ""}
                alt="User"
                className="object-cover w-full h-full"
                loading="lazy"
              />
            ) : (
              <span className="text-4xl text-indigo-400">👤</span>
            )}
          </div>
          {editMode && (
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              placeholder="User Image"
              title="User Image"
            />
          )}
          <span className="text-xs text-gray-400 mt-2">
            {editMode ? "Click image to upload" : ""}
          </span>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            disabled={!editMode}
            className="w-full p-2 border rounded bg-gray-50 disabled:bg-gray-100"
            placeholder="Enter your name"
            title="User name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            disabled
            className="w-full p-2 border rounded bg-gray-100"
            placeholder="Enter your email"
            title="User email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Role</label>
          <input
            type="text"
            value={role}
            disabled
            className="w-full p-2 border rounded bg-gray-100"
            placeholder="User role"
            title="User role"
          />
        </div>
        {editMode ? (
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleEdit}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
          >
            Edit Profile
          </button>
        )}
        {message && <div className="mt-4 text-green-600">{message}</div>}
      </form>
    </div>
  );
}