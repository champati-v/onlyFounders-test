'use client';

import React from 'react';
// @ts-ignore
import { useOCAuth } from '@opencampus/ocid-connect-js';
import { useAccount } from 'wagmi';

export default function LoginButton() {
  const auth = useOCAuth();
  const {address, isConnected} = useAccount();

  if (!auth) return null;

  const { ocAuth } = auth;

  const handleLogin = async () => {
    try {
      await ocAuth.signInWithRedirect({ state: 'opencampus' });
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <button
      onClick={handleLogin}
      className={`flex items-center gap-2 ${isConnected? 'px-1 py-1' : ''} px-3 py-1 rounded-full bg-white text-black font-semibold hover:opacity-90 transition`}
    >
      <img
        src="/ocid.png" 
        alt="OCID Logo"
        className="w-5 h-5"
      />
      {isConnected ? '' : 'OCID'}
    </button>
  );
}
