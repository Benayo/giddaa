'use client';

import EstateList from '@/components/Estate/EstateList';
import Header from '@/components/navigation/Header';
import SideBar from '@/components/navigation/SideBar';
import useAuthRedirect from '@/utils/hooks/useAuthRedirect';

export default function Properties() {
  useAuthRedirect();

  return (
    <div className="flex flex-col xl:flex-row">
      <SideBar />

      <main className="flex-1 ">
        <Header />
        <EstateList />
      </main>
    </div>
  );
}
