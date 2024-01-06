'use client';

import React, { useState } from 'react';
import { useQuery } from 'react-query';

interface Query {
  name: string;
  query: string;
  queryOptimal: string;
  planningTime: number;
  executionTime: number;
  planningTimeOptimal: number;
  executionTimeOptimal: number;
}

const headerStyle = 'px-6 py-2 bg-gray-100 text-left text-sm font-medium text-gray-500 uppercase tracking-wider';
const dataStyle = 'px-6 py-4 whitespace-nowrap text-black overflow-x-auto max-w-xs border-r-2 border-gray-100';

export default function Queries() {
  const fetchQueries = async (): Promise<Query[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/query`);
    const data: Query[] = await response.json();
    return data;
  };

  const { data: queries, isLoading } = useQuery<Query[]>('queries', fetchQueries);

  return (
    <div className='container mx-auto py-5 h-screen px-1'>
      <h1 className='text-2xl font-bold mb-7'>Queries</h1>
      <table className='table-auto bg-white border border-gray-300'>
        <thead>
          <tr>
            <th className={headerStyle}>Name</th>
            <th className={headerStyle}>Query</th>
            <th className={headerStyle}>Planning Time (ms)</th>
            <th className={headerStyle}>Execution Time (ms)</th>
            <th className={headerStyle}>Query (Optimal)</th>
            <th className={headerStyle}>Planning Time Opt. (ms)</th>
            <th className={headerStyle}>Execution Time Opt. (ms)</th>
          </tr>
        </thead>
        <tbody>
          {queries &&
            queries.map((result: Query, index: number) => (
              <tr key={index} className='border-b-2 border-gray-200'>
                <td className={dataStyle}>{result.name}</td>
                <td className={dataStyle}>{result.query}</td>
                <td className={dataStyle}>{result.planningTime}</td>
                <td className={dataStyle}>{result.executionTime}</td>
                <td className={dataStyle}>{result.queryOptimal}</td>
                <td className={dataStyle}>{result.planningTimeOptimal}</td>
                <td className={dataStyle}>{result.executionTimeOptimal}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
