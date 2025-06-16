"use client";
import { useState } from "react";

export default function UserProfile({ email, name, role }: { email: string; name: string; role: string }) {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({ name, email });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setEditMode(true);

  const handleCancel = () => {
    setProfile({ name, email });
    setEditMode(false);
    setMessage("");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with real API call to update user profile
    setMessage("Profile updated!");
    setEditMode(false);
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-8 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-indigo-700">User Profile</h2>
      <form onSubmit={handleSave}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            disabled={!editMode}
            className="w-full p-2 border rounded bg-gray-50 disabled:bg-gray-100"
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
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Role</label>
          <input
            type="text"
            value={role}
            disabled
            className="w-full p-2 border rounded bg-gray-100"
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