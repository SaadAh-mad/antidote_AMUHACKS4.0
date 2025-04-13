"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Profile {
  firstName: string;
  email: string;
  phone: string;
  category: string;
  about: string;
  services: string;
  image: string;
}

export default function ProviderProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("providerProfile");
    if (stored) {
      setProfile(JSON.parse(stored));
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (!profile) return;
    setProfile((prev) => ({
      ...prev!,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && profile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({
          ...prev!,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (profile) {
      localStorage.setItem("providerProfile", JSON.stringify(profile));
      setIsEditing(false);
    }
  };

  if (!profile) {
    return (
      <div className="text-center mt-20 text-gray-500">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-xl space-y-10">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          Service Provider Profile
        </h1>

        <div className="flex flex-col sm:flex-row items-center gap-10">
          <div>
            {isEditing ? (
              <>
                <label className="block text-md font-medium text-gray-700 mb-2">
                  Profile Image
                </label>
                <input type="file" accept="image/*" onChange={handleImageChange} />
              </>
            ) : (
              profile.image && (
                <img
                  src={profile.image}
                  alt="Profile"
                  className="w-48 h-48 rounded-full object-cover border-4 border-blue-500"
                />
              )
            )}
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {["firstName", "email", "phone", "category"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-semibold text-gray-700 mb-1 capitalize">
                  {field.replace(/([A-Z])/g, " $1")}
                </label>
                {isEditing ? (
                  field === "category" ? (
                    <select
                      name="category"
                      value={profile[field as keyof Profile]}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    >
                      <option value="">Select category</option>
                      <option value="plumbing">Plumbing</option>
                      <option value="electrical">Electrical</option>
                      <option value="gardening">Gardening</option>
                      <option value="carpentary">Carpentary</option>
                      <option value="moving">Moving</option>
                      <option value="other">Other</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      name={field}
                      value={profile[field as keyof Profile]}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    />
                  )
                ) : (
                  <p className="text-gray-800 font-medium">
                    {profile[field as keyof Profile]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-lg font-bold text-gray-800 mb-2">About</label>
            {isEditing ? (
              <textarea
                name="about"
                value={profile.about}
                onChange={handleInputChange}
                className="w-full h-28 p-3 border rounded"
              />
            ) : (
              <p className="text-gray-700 font-medium">
                {profile.about || "No about section provided."}
              </p>
            )}
          </div>

          <div>
            <label className="block text-lg font-bold text-gray-800 mb-2">Services Offered</label>
            {isEditing ? (
              <textarea
                name="services"
                value={profile.services}
                onChange={handleInputChange}
                className="w-full h-28 p-3 border rounded"
              />
            ) : (
              <p className="text-gray-700 font-medium">
                {profile.services || "No services listed."}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
            >
              Edit Profile
            </button>
          )}

          <button
            onClick={() => router.push("/")}
            className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
