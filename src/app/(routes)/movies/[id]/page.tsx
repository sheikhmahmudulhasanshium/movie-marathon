"use client";

import { useSearchParams } from 'next/navigation';
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import SocialHandle from "../../components/Social-Handle";
import Body from "./components/Body";
import Suggestions from "../../components/Suggestions";
import Details from '../../components/Details';
import useMovie from '../../../../../actions/get-movie';
import SamplePoster from '../../../../../public/images/sample-poster.jpg';
import { useEffect, useState } from 'react';
import Loading from '../../components/loading';

const Movie: React.FC = () => {
    const searchParams = useSearchParams();
    const imdbID = searchParams.get("id");
    const { movie } = useMovie(imdbID);

    const title = movie?.Title || "Loading...";
    const description = movie?.Plot || "Description...";
    const imageUrl = movie?.Poster || SamplePoster.src;
    
    const [currentUrl, setCurrentUrl] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrentUrl(window.location.href);
        }
    }, []);
    const [isLoaded,setIsLoaded]=useState<boolean>(false)
    useEffect(()=>{
        setIsLoaded(true)
    },[])
    if(!isLoaded){
        return <Loading/>
    }
    return (
        <html suppressHydrationWarning>
            <head>
                <link rel="icon" href="/images/favicon.ico" />
                <title>{title}</title>
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={imageUrl} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={currentUrl} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={imageUrl} />
            </head>
            <body>
                <div className='flex flex-col pt-8 w-max sm:w-screen md:w-full lg:w-full justify-center items-center max-w-max'>
                    <div className="flex flex-col justify-center items-center ">
                        <Header />
                    </div>
                    <div className="flex flex-col justify-center items-center ">
                        <SearchBar />
                        <Body imdbID={imdbID} />
                        <Details imdbID={imdbID} movieType={"movie"} />
                        <SocialHandle />
                        <Suggestions imdbID={imdbID} />
                        <Footer />
                    </div>
                </div>
            </body>
        </html>
    );
};

export default Movie;
