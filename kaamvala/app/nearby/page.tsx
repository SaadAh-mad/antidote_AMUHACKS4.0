import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import Image from 'next/image';

type Provider = {
  id: string;
  name: string;
  phoneNumber: string;
  imageUrl: string;
  profession: string;
  lat: number;
  lng: number;
  distance?: number; // Added distance field
};

const getDistanceFromLatLonInKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const ServiceProviderFinder: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [filtered, setFiltered] = useState<Provider[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedDistance, setSelectedDistance] = useState<number>(5);
  const [selectedProfession, setSelectedProfession] = useState<string>("All");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => console.error("Location access denied", err)
    );
  }, []);

  useEffect(() => {
    const fetchProviders = async () => {
      const snapshot = await getDocs(collection(db, "service_providers"));
      const data: Provider[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Provider[];
      setProviders(data);
    };
    fetchProviders();
  }, []);

  useEffect(() => {
    if (!userLocation) return;

    const filteredWithDistance = providers
      .map((provider) => {
        const distance = getDistanceFromLatLonInKm(
          userLocation.lat,
          userLocation.lng,
          provider.lat,
          provider.lng
        );
        return { ...provider, distance };
      })
      .filter((provider) => {
        const withinDistance = provider.distance! <= selectedDistance;
        const matchesProfession =
          selectedProfession === "All" || provider.profession === selectedProfession;
        return withinDistance && matchesProfession;
      });

    setFiltered(filteredWithDistance);
  }, [userLocation, providers, selectedDistance, selectedProfession]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Nearby Service Providers</h1>

      <div className="flex gap-4 mb-6">
        <select
          className="border p-2 rounded"
          value={selectedDistance}
          onChange={(e) => setSelectedDistance(Number(e.target.value))}
        >
          <option value={5}>Within 5 km</option>
          <option value={10}>Within 10 km</option>
          <option value={15}>Within 15 km</option>
        </select>

        <select
          className="border p-2 rounded"
          value={selectedProfession}
          onChange={(e) => setSelectedProfession(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Mechanic">Mechanic</option>
          <option value="AC Technician">AC Technician</option>
          <option value="House Cleaner">House Cleaner</option>
          <option value="Plumber">Plumber</option>
          <option value="Electrician">Electrician</option>
          <option value="Carpenter">Carpenter</option>
          <option value="Painter">Painter</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p>No service providers found in this area.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((provider) => (
            <div key={provider.id} className="border rounded-xl p-4 shadow-md">
              <Image
                src={provider.imageUrl}
                alt={provider.name}
                className="w-full h-40 object-cover rounded-lg mb-2"
                width={400} // specify a width for optimization
                height={200} // specify a height for optimization
              />
              <h2 className="text-xl font-semibold">{provider.name}</h2>
              <p className="text-gray-700">{provider.profession}</p>
              {provider.distance !== undefined && (
                <p className="text-sm text-gray-500 mb-2">
                  📍 {provider.distance.toFixed(2)} km away
                </p>
              )}
              <a
                href={`tel:${provider.phoneNumber}`}
                className="text-blue-500 mt-2 inline-block"
              >
                📞 {provider.phoneNumber}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceProviderFinder;
