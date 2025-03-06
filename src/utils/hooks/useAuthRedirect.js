'use client';

import { useEffect } from 'react';
import { useAuth } from '@/utils/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function useAuthRedirect() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);
}
