"use client"
import { useState } from "react";
import { VscLoading } from "react-icons/vsc";
import useMovies from "../../../../../actions/get-movies";
import useSeries from "../../../../../actions/get-tv-series";
import Link from "next/link";
import Card from "../../components/Card";

const Content = () => {
    const movies = useMovies();
    const series = useSeries();
    const [visibleMovies, setVisibleMovies] = useState(20);
    const [visibleSeries, setVisibleSeries] = useState(20);

    const isLoading = movies.length === 0 && series.length === 0;

    const handleLoadMoreMovies = () => {
        setVisibleMovies(prev => prev + 20);
    };

    const handleLoadMoreSeries = () => {
        setVisibleSeries(prev => prev + 20);
    };

    if (isLoading) {
        return (
            <div className="text-center py-12 flex text-slate-400 justify-center items-center">
                Please wait... <VscLoading className="text-2xl animate-spin"/>
            </div>
        );
    }

    return (
        <div className="pb-12 ">
            <p className="text-4xl font-thin font-serif text-cyan-950 dark:text-white py-12 ">Movies</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-cols-2 w-full max-w-screen-lg">
                {movies.slice(0, visibleMovies).map((movie, index) => (
                    <Card key={index} movie={movie} />
                ))}
            </div>
            {visibleMovies < movies.length ? (
                <button
                    className="flex justify-center items-center m-auto text-blue-400"
                    onClick={handleLoadMoreMovies}
                >
                    See More...
                </button>
            ) : (
                <Link className="flex justify-center items-center m-auto text-blue-400" href="/movies">
                    See All...
                </Link>
            )}

            <p className="text-4xl font-thin font-serif text-cyan-950 py-12 dark:text-white">Tv Shows</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-cols-2 w-full max-w-screen-lg">
                {series.slice(0, visibleSeries).map((show, index) => (
                    <Card key={index} movie={show} />
                ))}
            </div>
            {visibleSeries < series.length ? (
                <button
                    className="flex justify-center items-center m-auto text-blue-400"
                    onClick={handleLoadMoreSeries}
                >
                    See More...
                </button>
            ) : (
                <Link className="flex justify-center items-center m-auto text-blue-400" href="/tv-shows">
                    See All...
                </Link>
            )}
        </div>
    );
}

export default Content;
