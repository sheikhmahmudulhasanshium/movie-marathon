"use client"
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Footer from '../../components/Footer';
import SearchBar from '../../components/SearchBar';
import Header from '../../home/components/Header';
import SideNav from '../../home/components/SideNav';
import Container from './components/container';
import Loading from '../../components/loading';

const GenrePage: React.FC = () => {
    const searchParams = useSearchParams();
    const genre = searchParams.get('genre');
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
                {genre && <Container genre={genre} />}
                <Footer />
            </div>
        </div>
    );
};

export default GenrePage;
