"use client";
import { useSearchParams } from 'next/navigation';
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import SocialHandle from "../../components/Social-Handle";
import Body from "./components/Body";
import Suggestions from "./components/Suggestions";

const Movie: React.FC = () => {
    const searchParams = useSearchParams();
    const imdbID = searchParams.get("id");

    return (
        <>
            <div className="flex flex-col justify-center items-center w-full sm:w-screen md:w-full lg:w-full">
                <Header />
            </div>
            <div className="flex flex-col justify-center items-center w-full sm:w-screen md:w-full lg:w-full">
                <SearchBar />
                <Body imdbID={imdbID} />
                <SocialHandle />
                <Suggestions />
                <Footer />
            </div>
        </>
    );
};

export default Movie;
