'use client';

import React, { useState } from 'react';
import { useQuery } from 'react-query';

interface Listing {
  id: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  built: number;
  lotSize: number;
  mlsStatus: string;
  propertyType: string;
}

const headerStyle = 'px-6 py-2 bg-gray-100 text-left text-sm font-medium text-gray-500 uppercase tracking-wider';
const dataStyle = 'px-6 py-4 whitespace-nowrap text-black overflow-x-auto max-w-xs border-r-2 border-gray-100';

export default function Listings() {
  const fetchListings = async (): Promise<Listing[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listings`);
    const data: Listing[] = await response.json();
    return data;
  };

  const { data: listings, isLoading } = useQuery<Listing[]>('listings', fetchListings);

  return (
    <div className="container mx-auto py-6 h-screen px-1">
      <h1 className="text-2xl font-bold mb-4 ml-5">Listings</h1>
      <div>
        <table className="table-auto bg-white border border-gray-300">
          <thead>
            <tr>
              <th className={headerStyle}>Address</th>
              <th className={headerStyle}>Price</th>
              <th className={headerStyle}>Bedrooms</th>
              <th className={headerStyle}>Bathrooms</th>
              <th className={headerStyle}>Square Ft</th>
              <th className={headerStyle}>Year Built</th>
              <th className={headerStyle}>Lot Size</th>
              <th className={headerStyle}>MLS Status</th>
              <th className={headerStyle}>Property Type</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={9} className="text-center">Loading...</td></tr>
            ) : (
              listings && listings.map((listing: Listing) => (
                <tr key={listing.id} className="border-b-2 border-gray-200">
                  <td className={dataStyle}>{listing.address}</td>
                  <td className={dataStyle}>${listing.price.toFixed(2)}</td>
                  <td className={dataStyle}>{listing.bedrooms}</td>
                  <td className={dataStyle}>{listing.bathrooms}</td>
                  <td className={dataStyle}>{listing.sqft}</td>
                  <td className={dataStyle}>{listing.built}</td>
                  <td className={dataStyle}>{listing.lotSize}</td>
                  <td className={dataStyle}>{listing.mlsStatus}</td>
                  <td className={dataStyle}>{listing.propertyType}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
