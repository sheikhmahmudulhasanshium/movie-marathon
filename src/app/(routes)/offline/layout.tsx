"use client";

import { useEffect } from 'react';
import Head from 'next/head';

interface LayoutProps {
  children: React.ReactNode;
}

const SnakeLayout = ({ children }: LayoutProps) => {
  useEffect(() => {
    return () => {
      // Any necessary cleanup can be done here
    };
  }, []);

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap"
          rel="stylesheet"
          integrity="sha384-ApYb6sHI1uZ8cuXZWONpGyQyrPeQmORaGlBeF7VToLvYJfBfsQzUxm+WSLwDTbb"
          crossOrigin="anonymous"
        />
      </Head>
      <div className="font-orbitron">
        {children}
      </div>
    </>
  );
};

export default SnakeLayout;
