// app/country/[country]/page.tsx
"use client"
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Footer from '../../components/Footer';
import SearchBar from '../../components/SearchBar';
import Header from '../../home/components/Header';
import SideNav from '../../home/components/SideNav';
import Container from './components/container';
import Loading from '../../components/loading';

const CountryPage: React.FC = () => {
    const searchParams = useSearchParams();
    const country = searchParams.get('country');

    const [isLoaded,setIsLoaded]=useState<boolean>(false)
    useEffect(()=>{
        setIsLoaded(true)
    },[])
    if(!isLoaded){
        return <Loading/>
    }
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
