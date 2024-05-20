"use client"
import { useEffect, useState } from "react";
import Card from "./Card";
import { Movie } from "../../../../../type";
import GetData from "../../../../../actions/get-data";

const Content = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function loadMovies() {
            const allMovies = await GetData();
            setMovies(allMovies);
            setLoading(false);
        }

        loadMovies();
    }, []);

    if (loading) {
        return <div className="text-center py-12 flex text-slate-400">Please wait...</div>;
    }

    return (
        <div className="pb-12">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-cols-2 w-full max-w-screen-lg">
                {movies.map((movie, index) => (
                    <Card key={index} movie={movie} />
                ))}
            </div>
        </div>
    );
}

export default Content;
