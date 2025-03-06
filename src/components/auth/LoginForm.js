'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import ENDPOINTS from '@/config/api';
import { useAuth } from '@/utils/context/AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { user, login } = useAuth();

  useEffect(() => {
    if (user) {
      router.push('/property');
    }
  }, [user, router]);

  const validateForm = () => {
    let valid = true;
    if (!email) {
      setEmailError('Email is required');
      valid = false;
    } else {
      setEmailError('');
    }
    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else {
      setPasswordError('');
    }
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setApiError('');

    try {
      const response = await fetch(ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          type: 'DEVELOPER',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setApiError(data.message || 'Something went wrong');
      } else {
        const token = data.value.value.token;

        const userData = data.value.value.user;

        console.log(data.value);
        
        login(userData, token);
      }
    } catch (error) {
      setApiError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
      {apiError && <div className="text-red-500 text-sm mb-4">{apiError}</div>}

      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Your email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className={`${
            emailError ? 'border-red-500' : 'border-gray-300'
          } bg-gray-50 border text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
          placeholder="name@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {emailError && (
          <p className="text-red-500 text-xs mt-1">{emailError}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className={`${
            passwordError ? 'border-red-500' : 'border-gray-300'
          } bg-gray-50 border text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {passwordError && (
          <p className="text-red-500 text-xs mt-1">{passwordError}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full text-white bg-primary hover:bg-primary-hover focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm px-5 py-3 text-center cursor-pointer"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Sign in'}
      </button>
    </form>
  );
};

export default LoginForm;
