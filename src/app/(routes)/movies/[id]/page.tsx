"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import SocialHandle from "../../components/Social-Handle";
import Body from "./components/Body";
import Suggestions from "../../components/Suggestions";
import Details from '../../components/Details';
import Head from "next/head";
import useMovie from '../../../../../actions/get-movie';

const Movie: React.FC = () => {
    const searchParams = useSearchParams();
    const imdbID = searchParams.get("id");
    const { movie, loading, error } = useMovie(imdbID);
    const [metaTagsSet, setMetaTagsSet] = useState(false);

    useEffect(() => {
        if (movie && !metaTagsSet) {
            setMetaTagsSet(true);
        }
    }, [movie, metaTagsSet]);

    return (
        <>
            {metaTagsSet && (
                <Head>
                    <meta property="og:image" content={movie?.Poster} />
                    <meta property="og:title" content={movie?.Title} />
                    <meta property="og:description" content={movie?.Plot} />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={movie?.Title} />
                    <meta name="twitter:description" content={movie?.Plot} />
                    <meta name="twitter:image" content={movie?.Poster} />
                </Head>
            )}
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
        </>
    );
};

export default Movie;
