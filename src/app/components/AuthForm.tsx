'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function AuthForm({ type }: { type: 'signup' | 'login' }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint = type === 'signup' ? '/auth/signup' : '/auth/login';
      const res = await axios.post(`http://localhost:5000${endpoint}`, formData);
      alert(res.data.message);
      if (res.status === 201 || res.status === 200) {
        router.push('/diary');
      }
    } catch (err) {
      alert("Error: Operation failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {type === 'signup' ? 'Create Account' : 'Login'}
        </h2>
        
        {type === 'signup' && (
          <input className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" 
            placeholder="Full Name" onChange={(e) => setFormData({...formData, name: e.target.value})} />
        )}
        
        <input className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" 
          placeholder="Email Address" onChange={(e) => setFormData({...formData, email: e.target.value})} />
        
        <input className="w-full p-3 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" 
          type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} />
        
        <button className="w-full bg-indigo-600 text-white p-3 rounded-md font-semibold hover:bg-indigo-700 transition">
          {type === 'signup' ? 'Sign Up' : 'Login'}
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          {type === 'signup' ? 'Already have an account? ' : 'Don\'t have an account? '}
          <button type="button" className="text-blue-600 font-bold" 
            onClick={() => router.push(type === 'signup' ? '/login' : '/signup')}>
            {type === 'signup' ? 'Login' : 'Sign Up'}
          </button>
        </p>
      </form>
    </div>
  );
}