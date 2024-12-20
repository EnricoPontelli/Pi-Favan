"use client";
import { FaUser , FaLock } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); 

    
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3333/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('Login bem-sucedido:', data);
      
      router.push('/excel'); 
    } catch (error) {
      setError(error.message || 'Erro inesperado');
    }
  }

  return (
    <div className="h-screen w-screen ">
      <img src={'/login.jpg'} alt={""} className="w-screen h-screen" />
      <div className="absolute top-0 w-full h-full flex items-center justify-center">
        <div className="bg-green-50 rounded-md bg-opacity-50 w-72 h-96 justify-center justify-items-center shadow-lg shadow-green-700/70 space-y-20">
          <div className="flex justify-center items-center flex-col content-center space-y-16 ">
            <h1 className="text-neutral-600 text-2xl font-mono font-semibold top-12 opacity-60">Spectrasync</h1>
            <div className="flex justify-center items-center flex-col content-center space-y-10">
              <div className="relative flex justify-end items-end">
                <input type="text" placeholder="Email" name="Email" className="max-w-xl h-8 rounded-md text-neutral-600 bg-transparent border-b outline-none border-neutral-600 shadow-md shadow-green-700/70" onChange={(e) => setEmail(e.target.value)} />
                <FaUser  className="absolute text-neutral-600 mb-2" />
              </div>
              <div className="relative flex justify-end items-end">
                <input type="password" placeholder="Password" name="Password" className="max-w-xl h-8 rounded-md text-neutral-600 bg-transparent border-b outline-none border-neutral-600 shadow-md shadow-green-700/70" onChange={(e) => setPassword(e.target.value)} />
                <FaLock className="absolute text-neutral-600 mb-2" />
              </div>
            </div>
            <div className="">
              <button onClick={handleLogin} type="submit" className="bg-transparent border-b text-green-600 font-semibold border-neutral-600 rounded-md w-36 h-12 shadow-xl shadow-green-700/80">Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
