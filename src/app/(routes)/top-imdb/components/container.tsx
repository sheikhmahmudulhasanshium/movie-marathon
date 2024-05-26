"use client";
import { FC } from "react";
import { VscLoading } from "react-icons/vsc";
import Card from "../../components/Card";
import useTopImdb from "../../../../../actions/get-top-imdb";

const Container: FC = () => {
    const { movies, series } = useTopImdb();
    const loading = movies.length === 0 && series.length === 0;

    if (loading) {
        return <div className="text-center py-12 flex text-slate-400 justify-center items-center">Please wait... <VscLoading className="animate-spin text-2xl"/></div>;
    }

    return (
        <div className="flex flex-col justify-center items-center mt-12 pb-14 px-4">
            <div className="flex flex-col justify-between">
                <h2 className="text-4xl font-thin font-serif text-cyan-950 py-12 dark:text-white flex items-start">Top Movies</h2>
                <div className="grid grid-cols-3 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-4 mb-12">
                    {movies.map((movie, index) => (
                        <Card key={index} movie={movie} />
                    ))}
                </div>
            </div>
            <div className="flex flex-col justify-between">
                <h2 className="text-4xl font-thin font-serif text-cyan-950 py-12 dark:text-white flex items-start">Top Movies</h2>
                <div className="grid grid-cols-3 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-4">
                    {series.map((series, index) => (
                        <Card key={index} movie={series} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Container;
