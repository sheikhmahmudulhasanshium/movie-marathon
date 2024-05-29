"use client";
import { useSearchParams } from 'next/navigation';
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import SocialHandle from "../../components/Social-Handle";
import Body from "./components/Body";
import Suggestions from "../../components/Suggestions";

const Show: React.FC = () => {
    const searchParams = useSearchParams();
    const imdbID = searchParams.get("id");

    return (
        <div className='flex flex-col pt-8  w-max sm:w-screen md:w-full lg:w-full justify-center items-center max-w-max'>
            <div className="flex flex-col justify-center items-center ">
                <Header />
            </div>
            <div className="flex flex-col justify-center items-center ">
                <SearchBar />
                <Body imdbID={imdbID} />
                <SocialHandle />
                <Suggestions imdbID={imdbID}/>
                <Footer />
            </div>
        </div>
    );
};

export default Show;
