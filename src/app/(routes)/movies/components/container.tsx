"use client"
import { FC } from "react";
import useMovies from "../../../../../actions/get-movies";
import { VscLoading } from "react-icons/vsc";
import Card from "../../components/Card";

const Container: FC = () => {
    const movies = useMovies();
    const loading = movies.length === 0;

    if (loading) {
        return <div className="text-center py-12 flex text-slate-400  justify-center items-center">Please wait... <VscLoading className="animate-spin text-2xl"/></div>;
    }

    return (
        <div className=" flex flex-col justify-center items-center mt-12 pb-14">
            <div className="grid grid-cols-3 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-4">
                {movies.map((movie, index) => (
                    <Card key={index} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default Container;
