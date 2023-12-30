'use client';

import React, { useState } from 'react';

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

const headerStyle = 'px-6 py-2 bg-gray-100 text-left text-sm font-medium text-gray-500 uppercase tracking-wider';
const dataStyle = 'px-6 py-4 whitespace-nowrap text-black overflow-x-auto max-w-xs border-r-2 border-gray-100';

export default function QueryResults() {
  const [results, setResults] = useState<QueryResult[]>([]);
  const [price, setPrice] = useState<number>(400000);

  const postPriceQuery = async (price: number) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listings/query/explain/price/all?price=${price}`);
      const data: PriceQueryResult = await response.json();
      const queryResults: QueryResult[] = Object.values(data);
      setResults(queryResults);
    } catch (error) {
      console.log(error)
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postPriceQuery(price);
  };

  return (
    <div className='container mx-auto py-5 h-screen px-1'>
      <h1 className='text-2xl font-bold mb-7'>Query Results</h1>
      <div>
        <form className='mb-6' onSubmit={handleSubmit}>
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

        <table className='table-auto bg-white border border-gray-300'>
          <thead>
            <tr>
              <th className={headerStyle}>Name</th>
              <th className={headerStyle}>Planning Time (ms)</th>
              <th className={headerStyle}>Execution Time (ms)</th>
              <th className={headerStyle}>Query</th>
              <th className={headerStyle}>Index Scan</th>
              <th className={headerStyle}>Sort</th>
              <th className={headerStyle}>Sequential Scan</th>
              <th className={headerStyle}>Filter</th>
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
                  <td className={dataStyle}>{result.sort}</td>
                  <td className={dataStyle}>{result.seqScan}</td>
                  <td className={dataStyle}>{result.filter}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
