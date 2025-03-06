'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/utils/context/AuthContext';

import logo from '@/assets/svg/Logo.svg';
import whiteLogo from '@/assets/svg/White-Logo.svg';
import property from '@/assets/svg/property.svg';
import dashboard from '@/assets/svg/Dashboard.svg';
import more from '@/assets/svg/more.svg';
import profile from '@/assets/svg/profile.svg';
import logoutIcon from '@/assets/svg/logout.svg';
import pass from '@/assets/svg/passcode.svg';
import Image from 'next/image';

const SideBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleProfileClick = () => {
    setShowDropdown(false);
  };

  const handleChangePasswordClick = () => {
    setShowDropdown(false);
  };

  const handleLogoutClick = () => {
    logout();
    setShowDropdown(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <aside className="relative p-4 md:p-6 xl:p-0   xl:w-64  bg-primary text-white xl:min-h-screen w-full flex flex-row xl:flex-col justify-between items-center md:items-start">
        <div className="w-full">
          <div className=" px-2 xl:px-6 xl:py-11 flex flex-col gap-4 w-full xl:border-b xl:border-[#979797]">
            <Image priority src={whiteLogo} alt="white-logo" />

            <p className="uppercase text-xs hidden xl:block mt-2">
              Residencia Moderno Smart...
            </p>
          </div>
          <nav className=" hidden mt-2 p-2 xl:p-6 xl:flex flex-col items-center gap-6 xl:items-start w-full">
            <Link
              href="#"
              className="flex items-center gap-4 py-4 w-full justify-center xl:justify-start"
            >
              <Image src={dashboard} alt="dashboard" />
              <span className="hidden xl:block font-semibold">Dashboard</span>
            </Link>

            <Link
              href="/property"
              className="flex items-center gap-4 p-1.5 xl:p-4 w-full justify-center xl:justify-start bg-white text-primary rounded-full"
            >
              <Image src={property} alt="property" />
              <span className="hidden xl:block font-semibold">Properties</span>
            </Link>
          </nav>
        </div>

        <div className="w-full hidden xl:flex justify-center items-center my-3">
          <div
            className="p-1.5 xl:p-3 bg-white rounded-full flex justify-between items-center"
            onClick={toggleDropdown}
          >
            <div className=" w-6 h-6 xl:w-10 xl:h-10 text-white bg-primary rounded-full text-xs text-center flex justify-center items-center">
              <span>
                {user && user.Name && user.Name.length > 0 ? user.Name[0] : 'N'}
              </span>
            </div>

            <div className=" hidden xl:block text-primary px-4">
              <div className="text-sm font-medium mb-2 text-black">
                {user ? user.Name : 'Your name'}
              </div>
              <div className="text-[0.7rem]">
                {user ? user.Email : 'jamesmensah@gmail.com'}
              </div>
            </div>

            <div className=" hidden xl:block cursor-pointer">
              <Image src={more} alt="more" />
            </div>

            {showDropdown && (
              <div className="absolute bottom-[12%] right-6 bg-white shadow-lg rounded-lg w-48 ">
                <ul>
                  <li
                    className="py-3 flex items-center gap-3 cursor-pointer text-[#4B4B4B] px-4"
                    onClick={handleProfileClick}
                  >
                    <Image alt="" src={profile} />
                    Profile
                  </li>
                  <li
                    className="py-3 flex items-center gap-3 cursor-pointer text-[#4B4B4B] px-4"
                    onClick={handleChangePasswordClick}
                  >
                    <Image src={pass} />
                    Change Password
                  </li>
                  <li
                    className="py-3 flex items-center gap-3 cursor-pointer text-[#E40000] px-4 border-t border-[#F0F0F0] font-semibold "
                    onClick={handleLogoutClick}
                  >
                    <Image src={logoutIcon} alt="logout" />
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="text-white flex xl:hidden" onClick={toggleMobileMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 9h16.5m-16.5 6.75h16.5"
            />
          </svg>
        </div>
      </aside>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-gray-50 backdrop-blur-lg z-50 xl:hidden">
          <div className="w-full  bg-white">
            <div className="p-4 md:p-6 border-b border-[#F0F0F0] flex justify-between items-center">
              <Image src={logo} alt="logo" />

              <button onClick={toggleMobileMenu}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-4 md:p-6 flex flex-col gap-6">
              <Link href="">Dashboard</Link>

              <Link href="">Properties</Link>

              <Link href="">Profile</Link>

              <Link href="">Change Password</Link>

              <Link href="">Logout</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
