import Image from "next/image";
import Link from "next/link";
import React from 'react';
import { Movie } from "../../../../type";
import SamplePoster from "../../../../public/images/sample-poster.jpg";

interface CardProps {
    movie: Movie;
}

const Card: React.FC<CardProps> = ({ movie }) => {
    const posterSrc = movie.Poster !== "N/A" ? movie.Poster : SamplePoster;
    const truncatedTitle = movie.Title.length > 20 ? `${movie.Title.substring(0, 10)}...` : movie.Title;
    const movieType=movie.Type==="movie"?"movies":"tv-shows"
    return (
        <div className="flex flex-col rounded-lg col-span-1 bg-slate-500 m-2 hover:opacity-85">
            <Link
                href={{
                    pathname: `/${movieType}/${movie.imdbID}`,
                    query: {
                        id: movie.imdbID,
                        },
                }}
            >
                <p className="border rounded-sm absolute ml-8 mt-4 font-bold text-yellow-500 bg-slate-50 bg-opacity-85">{movie.Rated}</p>
                <Image src={posterSrc} alt="Poster" height={400} width={300} className="rounded-t-xl" loading="lazy" />
                <p className="text-xl text-center text-white mt-auto">{truncatedTitle}</p>
            </Link>
            <div className="flex justify-between gap-4 items-center p-4 mt-auto">
                <p>{movie.Year}</p>
                <p>{movie.Runtime}</p>
                <p className="border rounded-sm">{movie.Type}</p>
            </div>
        </div>
    );
};

export default Card;
