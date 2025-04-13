'use client';

import { useState } from 'react';
import { db, auth } from '@/app/lib/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { supabase } from '@/app/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Provider() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    profession: '',
    phoneNumber: '',   // Added phone number
    gmail: '',         // Added gmail
  });
  const [image, setImage] = useState<File | null>(null);
  const [status, setStatus] = useState('');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation not supported');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setStatus('Location captured ✅');
      },
      () => setStatus('Failed to get location')
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Submitting...');

    const user = auth.currentUser;

    if (!user) {
      setStatus('You must be logged in');
      return;
    }

    if (!location) {
      setStatus('Please capture your location first');
      return;
    }

    let imageUrl = '';
    if (image) {
      const fileName = `${user.uid}-${Date.now()}`;
      const { error } = await supabase.storage
        .from('provider-imgs')
        .upload(fileName, image);

      if (error) {
        setStatus('Image upload failed');
        console.error(error);
        return;
      }

      const { data: publicUrlData } = supabase
        .storage
        .from('provider-imgs')
        .getPublicUrl(fileName);

      imageUrl = publicUrlData?.publicUrl || '';
    }

    const dataToStore = {
      ...form,
      email: user.email,
      lat: location.lat,
      lng: location.lng,
      imageUrl,
    };

    await setDoc(doc(collection(db, 'service_providers'), user.uid), dataToStore);
    setStatus('Registration successful ✅');

    // Save profile in localStorage before redirecting
    localStorage.setItem(
      'providerProfile',
      JSON.stringify({
        firstName: form.name.split(' ')[0],
        lastName: form.name.split(' ').slice(1).join(' ') || '',
        email: user.email || '',
        phone: form.phoneNumber,
        category: form.profession,
        about: '',
        services: '',
        image: imageUrl,
      })
    );

    router.push('/providerprofile');
  };

  return (
    <>
      <div className="text-center p-4">
        <h2 className="text-4xl font-bold text-gray-800">Apply as a Service Provider</h2>
        <p className="text-gray-500">Join our platform and connect with customers in your area</p>
      </div>

      <div className="max-w-2xl mx-auto p-12 bg-white rounded-2xl shadow-lg space-y-10">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-800">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800">Profession</label>
              <select
                name="profession"
                value={form.profession}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 bg-white"
              >
                <option value="">Select your profession</option>
                <option value="Electrician">Electrician</option>
                <option value="Plumber">Plumber</option>
                <option value="Carpenter">Carpenter</option>
                <option value="Mechanic">Mechanic</option>
                <option value="Painter">Painter</option>
                <option value="AC Technician">AC Technician</option>
                <option value="House Cleaner">House Cleaner</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              placeholder="Your phone number"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800">Gmail</label>
            <input
              type="email"
              name="gmail"
              value={form.gmail}
              onChange={handleChange}
              placeholder="Your Gmail"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-md font-medium text-gray-800 mb-1 p-1">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />
          </div>

          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={getCurrentLocation}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              📍 Capture Location
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              ✅ Submit
            </button>
          </div>

          <p className="text-sm text-gray-600">{status}</p>
        </form>
      </div>
    </>
  );
}
