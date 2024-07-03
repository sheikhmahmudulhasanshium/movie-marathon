"use client"
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import Header from "../home/components/Header";
import SideNav from "../home/components/SideNav";
import Container from "./components/container";
import Loading from "../components/loading";

const Movies = () => {
    const [isLoaded,setIsLoaded]=useState<boolean>(false)
    useEffect(()=>{
        setIsLoaded(true)
    },[])
    if(!isLoaded){
        return <Loading/>
    }
    return (
        <html>
            <head>
            <link rel="icon" href="/images/favicon.ico" />
            <title>Movies</title>
            </head>
            <body>
                <div className="flex flex-col w-max sm:w-max md:w-screen lg:w-full ">
                    <div className="flex start">
                        <SideNav />
                        <Header />
                    </div>
                    
                    <div className="flex flex-col justify-center items-center">
                        <SearchBar/>
                        <Container />
                        <Footer/>
                    </div>
                </div>
            </body>
        
        </html>
    );
};

export default Movies;
