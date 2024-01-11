'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface QueryResult {
  name: string;
  query: string;
  indexScan: string;
  sort: string;
  seqScan: string;
  filter: string;
  planningTime: string;
  executionTime: string;
}

interface PriceQueryResult {
  'Explain Price Query': QueryResult;
  'Explain PriceNoIdx Query': QueryResult;
}

interface PropertyTypeQueryResult {
  'Explain PropertyType Query': QueryResult;
  'Explain PropertyTypeNoIdx Query': QueryResult;
}

const headerStyle = 'px-6 py-2 bg-gray-100 text-left text-sm font-medium text-gray-500 uppercase tracking-wider';
const dataStyle = 'px-6 py-4 whitespace-nowrap text-black overflow-x-auto max-w-xs border-r-2 border-gray-100';

export default function QueryResults() {
  const [results, setResults] = useState<QueryResult[]>([]);
  const [price, setPrice] = useState<number>(400000);
  const [propertyType, setPropertyType] = useState<string>('');

  const postPriceQuery = async (price: number) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listings/query/explain/price/all?price=${price}`);
      const data: PriceQueryResult = await response.json();
      const queryResults: QueryResult[] = Object.values(data);
      setResults(queryResults);
      console.log('price-query: ', queryResults)
    } catch (error) {
      console.log(error)
    }
  };

  const postPropertyTypeQuery = async (propertyType: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listings/query/explain/subtype/all?subtype=${propertyType}`);
      const data: PropertyTypeQueryResult = await response.json();
      const queryResults: QueryResult[] = Object.values(data);
      setResults(queryResults);
      console.log('subtype-query: ', queryResults)
    } catch (error) {
      console.log(error)
    }
  }

  const handlePriceSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postPriceQuery(price);
  };

  const handlePropertyTypeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postPropertyTypeQuery(propertyType);
  }

  return (
    <div className='container mx-auto py-5 h-screen px-1'>
      <h1 className='text-2xl font-bold mb-4'>Query Results</h1>
      <Link href='/queries'>
        <button
          className='px-4 py-2 font-medium text-white bg-gray-800 rounded-md hover:bg-gray-600'
        >
          Queries
        </button>
      </Link>
      <div>
        <form className='my-6' onSubmit={handlePriceSubmit}>
          <label htmlFor='price' className='mr-2 font-medium text-gray-400'>
            Price:
          </label>
          <input
            id='price'
            type='number'
            value={price}
            min={1}
            max={500000}
            onChange={e => setPrice(parseInt(e.target.value))}
            className='px-3 py-2 border rounded-md text-black'
          />
          <button
            type='submit'
            className='px-4 py-2 ml-2 font-medium text-white bg-blue-800 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
          >
            Submit
          </button>
        </form>

        <form className='mb-6' onSubmit={handlePropertyTypeSubmit}>
          <label htmlFor='propertyType' className='mr-2 font-medium text-gray-400'>
            Property Type:
          </label>
          <select
            id='propertyType'
            value={propertyType}
            onChange={e => setPropertyType(e.target.value)}
            className='px-3 py-2 border rounded-md text-black'
          >
            <option value='House'>House</option>
            <option value='Condo'>Condo</option>
            <option value='Townhouse'>Townhouse</option>
            <option value='Apartment'>Apartment</option>
          </select>
          <button
            type='submit'
            className='px-4 py-2 ml-2 font-medium text-white bg-blue-800 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
          >
            Submit
          </button>
        </form>

        <table className='table-auto bg-white border border-gray-300'>
          <thead>
            <tr>
              <th className={headerStyle}>Name</th>
              <th className={headerStyle}>Planning Time (ms)</th>
              <th className={headerStyle}>Execution Time (ms)</th>
              <th className={headerStyle}>Query</th>
              <th className={headerStyle}>Index Scan</th>
              <th className={headerStyle}>Sequential Scan</th>
            </tr>
          </thead>
          <tbody>
            {results &&
              results.map((result: QueryResult, index: number) => (
                <tr key={index} className='border-b-2 border-gray-200'>
                  <td className={dataStyle}>{result.name}</td>
                  <td className={dataStyle}>{result.planningTime}</td>
                  <td className={dataStyle}>{result.executionTime}</td>
                  <td className={dataStyle}>{result.query}</td>
                  <td className={dataStyle}>{result.indexScan}</td>
                  <td className={dataStyle}>{result.seqScan}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
