"use client"
import { useSearchParams } from 'next/navigation';
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import SocialHandle from "../../components/Social-Handle";
import Body from "./components/Body";
import Suggestions from "./components/Suggestions";
import SamplePoster from "../../../../../public/images/sample-poster.jpg"
const Movie: React.FC = () => {
    const searchParams = useSearchParams();
    const title = searchParams.get('title') || 'Movie Title';
    const poster = searchParams.get('poster') || '';
    const year = searchParams.get('year') || '';
    const type = searchParams.get('type') || '';
    const imdbRating = searchParams.get('imdbRating') || '';
    const country = searchParams.get('country') || 'Country name';
    const genre = searchParams.get('genre') || 'Genre list';
    const production = searchParams.get('production') || 'Company list';
    const plot = searchParams.get('plot') || 'All the plot details will be written here. It might get long. Enventually it will be summerized if required.';
    const casts = searchParams.get('casts') || 'Cast list';

    return (
        <>
            <div className="flex flex-col justify-center items-center w-max sm:w-screen md:w-full lg:w-full">
                <Header />
            </div>
            <div className="flex flex-col justify-center items-center w-max sm:w-screen md:w-full lg:w-full">
                <SearchBar />
                <Body
                    title={title}
                    poster={poster}
                    year={year}
                    type={type}
                    imdbRating={imdbRating}
                    country={country}
                    genre={genre}
                    production={production}
                    plot={plot}
                    casts={casts}
                />
                <SocialHandle />
                <Suggestions />
                <Footer />
            </div>
        </>
    );
}

export default Movie;
