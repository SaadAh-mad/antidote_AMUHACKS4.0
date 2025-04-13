'use client';

import { useEffect, useState } from 'react';
import { db, auth } from '../../lib/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

interface Provider {
  name: string;
  email: string;
  profession: string;
  lat: number;
  lng: number;
  imageUrl?: string;
  distance?: number;
}

export default function NearbyProvidersPage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [distanceFilter, setDistanceFilter] = useState(5); // default 5 km

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }

      setIsLoggedIn(true);

      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        setUserLocation({ lat: data.lat, lng: data.lng });
      } else {
        console.log('User location not found');
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchProviders = async () => {
      if (!userLocation) return;

      const querySnapshot = await getDocs(collection(db, 'service_providers'));
      const fetchedProviders: Provider[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data() as Provider;
        const dist = getDistanceFromLatLonInKm(
          userLocation.lat,
          userLocation.lng,
          data.lat,
          data.lng
        );

        fetchedProviders.push({ ...data, distance: dist });
      });

      fetchedProviders.sort((a, b) => a.distance! - b.distance!);
      setProviders(fetchedProviders);
    };

    fetchProviders();
  }, [userLocation]);

  useEffect(() => {
    const filtered = providers.filter((p) => (p.distance || 0) <= distanceFilter);
    setFilteredProviders(filtered);
  }, [providers, distanceFilter]);

  if (loading) return <p>Loading...</p>;
  if (!isLoggedIn)
    return <p className="text-red-600">Please login with Google to view nearby providers 🔒</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Nearby Service Providers 📍</h1>

      <div className="mb-6">
        <label className="mr-2 font-semibold">Max Distance:</label>
        <select
          value={distanceFilter}
          onChange={(e) => setDistanceFilter(Number(e.target.value))}
          className="border px-2 py-1 rounded"
        >
          <option value={2}>2 km</option>
          <option value={5}>5 km</option>
          <option value={10}>10 km</option>
          <option value={15}>15 km</option>
        </select>
      </div>

      {filteredProviders.length === 0 ? (
        <p>No providers found within {distanceFilter} km 😔</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProviders.map((provider, idx) => (
            <div
              key={idx}
              className="border p-4 rounded shadow-sm flex flex-col items-center text-center transition-transform hover:scale-105 hover:shadow-md"
            >
              <img
                src={provider.imageUrl || '/stickman.png'}
                alt={`${provider.name}'s profile`}
                className="w-24 h-24 object-cover rounded-full border mb-3"
              />
              <h2 className="font-semibold text-lg">{provider.name}</h2>
              <p className="text-sm text-gray-700">{provider.profession}</p>
              <p className="text-sm text-gray-500">{provider.email}</p>
              <p className="text-sm text-gray-500">📍 {provider.distance?.toFixed(2)} km away</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

// Distance calculation helper
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}
