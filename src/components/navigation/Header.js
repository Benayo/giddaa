'use client';

import React, { useState } from 'react';

import prev from '@/assets/svg/prev.svg';
import next from '@/assets/svg/next.svg';
import works from '@/assets/svg/works.svg';
import down from '@/assets/svg/down.svg';

import tour from '@/assets/svg/tour.svg';
import video from '@/assets/svg/video.svg';

import bell from '@/assets/svg/bell.svg';
import undo from '@/assets/svg/undo.svg';
import clock from '@/assets/svg/clock.svg';

import houses from '@/assets/svg/houses.svg';
import house from '@/assets/svg/house.svg';
import Image from 'next/image';

const Header = () => {
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const toggleMenuDropdown = () => setShowMenuDropdown(!showMenuDropdown);

  const handleProfileClick = () => {
    setShowDropdown(false);
  };

  const handleChangePasswordClick = () => {
    setShowDropdown(false);
  };

  return (
    <>
      <header className="className='relative px-4 xl:px-6 border-b border-[#979797] flex flex-col gap-6 xl:gap-3 py-5">
        <div className="flex justify-between items-center">
          <div className=" flex xl:gap-4">
            <div className=" flex gap-2">
              <button className=" hidden 2xl:block p-2 bg-[#F0F0F0] rounded-sm cursor-pointer hover:bg-[#979797]">
                <Image src={prev} alt="prev" />
              </button>

              <button className="hidden 2xl:block p-2 opacity-30 bg-[#D9D9D9] rounded-sm cursor-pointer hover:bg-[#979797]">
                <Image src={next} alt="next" />
              </button>
            </div>

            <h1 className="font-main text-lg  md:text-2xl font-bold ">
              My Properties
            </h1>
          </div>

          <form className="nosubmit">
            <input
              className="nosubmit text-[#4B4B4B] hidden lg:block md:w-[14rem]
                 xl:w-[24rem] "
              type="search"
              placeholder="Search for anything..."
            />
          </form>

          <div className=" flex justify-between items-center gap-8 ">
            <div className="w-full flex justify-center items-center my-3">
              <div
                onClick={toggleMenuDropdown}
                className=" hidden focus:outline-none cursor-pointer p-4 hover:bg-[#F0F0F0] bg-[#F0F0F0] rounded-full lg:flex justify-between items-center"
              >
                <Image src={works} alt="how it works" />

                <div className="text-sm px-4 text-primary font-bold">
                  How It Works
                </div>

                <button className="cursor-pointer" onClick={toggleDropdown}>
                  <Image src={down} alt="down" />
                </button>

                {showMenuDropdown && (
                  <div className="absolute top-[12%] right-[12%] bg-white shadow-lg rounded-lg w-48 ">
                    <ul>
                      <li
                        className="py-3 flex items-center gap-3 cursor-pointer text-sm text-[#4B4B4B] px-4"
                        onClick={handleProfileClick}
                      >
                        <Image src={tour} alt="tour" />
                        Product Tour & Guide
                      </li>
                      <li
                        className="py-3 flex items-center gap-3 cursor-pointer text-sm text-[#4B4B4B] px-4"
                        onClick={handleChangePasswordClick}
                      >
                        <Image src={video} alt="video" />
                        Video Tutorial
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className=" flex justify-center items-center gap-4">
              <div className="bg-[#F0F0F0] p-2 rounded-full w-8 h-8 xl:w-12 xl:h-12 flex justify-center items-center">
                <Image src={bell} alt="bell" />
              </div>

              <div className="bg-[#F0F0F0] p-2 rounded-full w-8 h-8 xl:w-12 xl:h-12 flex justify-center items-center">
                <Image src={clock} alt="clock" />
              </div>

              <div className="bg-[#F0F0F0] p-2 rounded-full w-8 h-8 xl:w-12 xl:h-12 flex justify-center items-center">
                <Image src={undo} alt="undo" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 md:gap-8 pb-1">
          <div className="flex justify-center items-center gap-1 md:gap-3">
            <div className="p-2 rounded-full border border-[#F0F0F0]">
              <Image src={houses} alt="houses" />
            </div>

            <span className=" font-semibold text-xs">5 ESTATES</span>
          </div>

          <div className="flex justify-center items-center gap-1 md:gap-3">
            <div className="p-2 rounded-full border border-[#F0F0F0]">
              <Image src={house} alt="houses" />
            </div>

            <span className=" font-semibold text-xs">15 HOUSES</span>
          </div>

          <div className="flex justify-center items-center gap-1 md:gap-3">
            <span className=" rounded-full  p-[3px]  bg-[#979797]"></span>

            <span className=" font-semibold text-xs">7 UNITS</span>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
