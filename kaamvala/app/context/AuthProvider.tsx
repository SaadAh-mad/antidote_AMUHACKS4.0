'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { auth, provider, db } from '@/app/lib/firebase';
import { onAuthStateChanged, signInWithPopup, signOut, User as FirebaseUser } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

interface FirestoreUser {
  name: string;
  email: string;
  lat: number;
  lng: number;
}

interface AuthContextType {
  user: FirebaseUser | null;  // Define the user as FirebaseUser | null
  location: { lat: number | null; lng: number | null };
  locationSaved: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);  // user type updated
  const [location, setLocation] = useState<{ lat: number | null; lng: number | null }>({
    lat: null,
    lng: null,
  });
  const [locationSaved, setLocationSaved] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data() as FirestoreUser;
          if (data.lat && data.lng) {
            setLocation({ lat: data.lat, lng: data.lng });
            setLocationSaved(true);
          }
        }
      } else {
        setUser(null);
        setLocation({ lat: null, lng: null });
        setLocationSaved(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    const result = await signInWithPopup(auth, provider);
    const userData = result.user;
    setUser(userData);

    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      setLocation({ lat, lng });

      await setDoc(doc(db, 'users', userData.uid), {
        name: userData.displayName,
        email: userData.email,
        lat,
        lng,
      });

      setLocationSaved(true);
    });
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setLocation({ lat: null, lng: null });
    setLocationSaved(false);
  };

  return (
    <AuthContext.Provider value={{ user, location, locationSaved, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
