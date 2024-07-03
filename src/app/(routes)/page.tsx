"use client"
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Body from './components/Body';
import Loading from './components/loading';

function Home() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false); // Track if initial load is complete

  useEffect(() => {
    setIsLoaded(true); // Set as loaded after initial mount
  }, []); // Empty dependency array ensures it runs only on mount

  if (!isLoaded) {
    // Show loading indicator while determining initial status
    return <Loading />;
  }

  // Render the Body component as the default, you can customize this logic if needed
  return (
    <main className="flex flex-col justify-between sm:w-max md:w-screen lg:w-full max-w-max w-max">
      <Header />
      <Body />
    </main>
  );
}

export default Home;
