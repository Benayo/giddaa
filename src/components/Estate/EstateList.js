'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/utils/context/AuthContext';

import Add from '@/assets/svg/Add.svg';

import back from '@/assets/svg/back.svg';
import front from '@/assets/svg/front.svg';

import ENDPOINTS from '@/config/api';

import React from 'react';

const EstateList = () => {
  const [showMore, setShowMore] = useState(false);
  const [estates, setEstates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEstates = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken') || (user && user.token);

      if (!token) {
        throw new Error('User is not authenticated');
      }

      const response = await fetch(
        `${ENDPOINTS.GET_ALL_ESTATES}?pageNumber=1&pageSize=10&search=`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Error fetching estates');
      }

      const data = await response.json();
      setEstates(data.value.value.data);
    } catch (error) {
      setError('Error fetching estates.');
      console.error('Error fetching estates:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEstates();
  }, []);

  return (
    <>
      {' '}
      <div className="p-4 md:p-6 flex flex-col">
        <div className=" mb-4 flex justify-between items-center">
          <h1 className="xl:text-lg font-semibold text-base"> Estates</h1>

          <button className=" cursor-pointer p-3 md:p-4 rounded-full text-sm text-white bg-primary flex justify-center items-center gap-2">
            <Image src={Add} alt="add-estate" /> Create Estate
          </button>
        </div>

        <div className=" flex justify-center items-center">
          {loading && <p>Loading estates...</p>}
          {error && <p className="text-red-500">{error}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-2 md:my-4 ">
          {estates.length > 0 ? (
            estates
              .slice(0, showMore ? estates.length : 4)
              .map((estate, index) => (
                <div key={index} className="rounded-lg shadow relative">
                  <Image
                    priority
                    src={estate.organization.coverImage}
                    width={1000}
                    height={500}
                    alt="Estate"
                    className="rounded-t-md w-full p-0"
                  />

                  <span className="absolute text-xs top-2 left-3 bg-[#EAFFEA] text-[#335F32] border border-[#335F32] px-2 py-1 rounded-full">
                    {estate.houseStats.totalHouses} Houses
                  </span>
                  <div className="p-3 flex justify-center items-center flex-col gap-3">
                    <h3 className="text-lg text-center font-semibold">
                      {estate.name}
                    </h3>
                    <p className="text-gray-600 text-center leading-8 text-xs">
                      {estate.address}
                    </p>
                  </div>
                </div>
              ))
          ) : (
            <div className=" col-span-6 w-full flex justify-center items-center">
              No estates found.
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-4">
        <div className="flex gap-2.5">
          <div
            className=" cursor-pointer"
            onClick={() => setShowMore(!showMore)}
          >
            <Image src={back} alt="back" />
          </div>

          <div
            className=" cursor-pointer"
            onClick={() => setShowMore(!showMore)}
          >
            <Image src={front} alt="front" />
          </div>
        </div>

        <div className="text-sm mt-2">View More</div>
      </div>
    </>
  );
};

export default EstateList;
