// app/genre/[genre]/page.tsx
"use client"
import React from 'react';
import { useSearchParams } from 'next/navigation';
import Footer from '../../components/Footer';
import SearchBar from '../../components/SearchBar';
import Header from '../../home/components/Header';
import SideNav from '../../home/components/SideNav';
import Container from './components/container';

const GenrePage: React.FC = () => {
    const searchParams = useSearchParams();
    const genre = searchParams.get('genre');

    return (
        <div className="flex flex-col w-max sm:w-max md:w-screen lg:w-full">
            <div className="flex start">
                <SideNav />
                <Header />
            </div>

            <div className="flex flex-col justify-center items-center">
                <SearchBar />
                {genre && <Container genre={genre} />}
                <Footer />
            </div>
        </div>
    );
};

export default GenrePage;
