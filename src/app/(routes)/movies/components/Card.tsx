"use client"
import Image from "next/image";
import Link from "next/link";
import SamplePoster from "../../../../../public/images/sample-poster.jpg";
import { Movie } from "../../../../../type";
import React from 'react';

interface CardProps {
    movie: Movie;
}

const Card: React.FC<CardProps> = ({ movie }) => {
    const posterSrc = movie.Poster !== "N/A" ? movie.Poster : SamplePoster;
    const truncatedTitle = movie.Title.length > 20 ? `${movie.Title.substring(0, 10)}...` : movie.Title;

    return ( 
        <div className="flex flex-col rounded-lg col-span-1 bg-slate-500 m-2 hover:opacity-85">
            <Link href={`/movies/${movie.imdbID}`} >
                {<p className="border rounded-sm absolute ml-8 mt-4 font-bold text-yellow-500 bg-slate-50 bg-opacity-15">HD</p>}
                <Image src={posterSrc} alt="Poster" height={400} width={300} className="rounded-t-xl" loading="lazy" />
                <p className="text-xl text-center text-white mt-auto">{truncatedTitle}</p>
            </Link>
            <div className="flex justify-between gap-4 items-center p-4 mt-auto">
                <p>{movie.Year}</p>
                <p className="border rounded-sm">{movie.Type}</p>
            </div>
        </div>
    );
}

export default Card;
