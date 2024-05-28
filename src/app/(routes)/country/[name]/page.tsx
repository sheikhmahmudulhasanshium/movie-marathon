// app/country/[country]/page.tsx
"use client"
import React from 'react';
import { useSearchParams } from 'next/navigation';
import Footer from '../../components/Footer';
import SearchBar from '../../components/SearchBar';
import Header from '../../home/components/Header';
import SideNav from '../../home/components/SideNav';
import Container from './components/container';

const CountryPage: React.FC = () => {
    const searchParams = useSearchParams();
    const country = searchParams.get('country');

    return (
        <div className="flex flex-col w-max sm:w-max md:w-screen lg:w-full">
            <div className="flex start">
                <SideNav />
                <Header />
            </div>

            <div className="flex flex-col justify-center items-center">
                <SearchBar />
                {country && <Container country={country} />}
                <Footer />
            </div>
        </div>
    );
};

export default CountryPage;
