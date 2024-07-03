"use client"
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Content from "./components/Content";
import SideNav from "./components/SideNav";
import Loading from "../components/loading";

const Home = () => {
    const [isLoaded,setIsLoaded]=useState<boolean>(false)
    useEffect(()=>{
        setIsLoaded(true)
    },[])
    if(!isLoaded){
        return <Loading/>
    }
    return (
        <div className="flex flex-col  justify-between  sm:w-max md:w-screen lg:w-full max-w-max w-max">
            <div className="flex start">
                <SideNav />
                <Header />
            </div>
            
            <div className=" flex flex-col justify-center items-center ">
                <SearchBar/>
                <Content />
                <Footer/>
            </div>
        </div>
    );
};

export default Home;
