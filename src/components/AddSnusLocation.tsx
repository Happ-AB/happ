// src/components/AddSnusLocation.tsx
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

const AddSnusLocation: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [latitude, setLatitude] = useState<number | ''>('');
  const [longitude, setLongitude] = useState<number | ''>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof latitude === 'number' && typeof longitude === 'number') {
      try {
        await addDoc(collection(db, 'snus-locations'), { name, latitude, longitude });
        setName('');
        setLatitude('');
        setLongitude('');
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    } else {
      console.error("Latitude and Longitude must be numbers");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Enter location name" 
        required
      />
      <input 
        type="number" 
        value={latitude} 
        onChange={(e) => setLatitude(parseFloat(e.target.value))} 
        placeholder="Enter latitude" 
        required
      />
      <input 
        type="number" 
        value={longitude} 
        onChange={(e) => setLongitude(parseFloat(e.target.value))} 
        placeholder="Enter longitude" 
        required
      />
      <button type="submit">Add Location</button>
    </form>
  );
};

export default AddSnusLocation;
