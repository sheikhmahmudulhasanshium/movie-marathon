import React from "react";
import SamplePic from "../../../../../../public/images/sample-poster.jpg";
import useMovie from "../../../../../../actions/get-movie";
import Link from "next/link";
import { FaCirclePlay } from "react-icons/fa6";

interface BodyProps {
    imdbID: string | null;
}

const Body: React.FC<BodyProps> = ({ imdbID }) => {
    const { movie, loading, error } = useMovie(imdbID);

    if (error) return <div>Error loading movie details: {error}</div>;

    if (!movie) return null;

    return (
        <div className="relative flex flex-col justify-center items-center my-12 w-full h-screen">
            <div
                className="absolute w-full h-full bg-cover bg-center opacity-45 z-0"
                style={{
                    backgroundImage: `url(${movie.Poster !== "N/A" ? movie.Poster : SamplePic.src})`
                }}
            />
            <div className="relative z-10 flex justify-center items-center py-12">
                <Link href={`https://vidsrc.net/embed/movie/${imdbID}`}>
                    <FaCirclePlay className="text-9xl text-zinc-100 bg-cyan-950 rounded-full hover:bg-zinc-900 hover:text-zinc-500" />
                </Link>
            </div>
        </div>
    );
};

export default Body;
