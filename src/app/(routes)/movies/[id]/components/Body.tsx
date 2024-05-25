import React from "react";
import Image from "next/image";
import SamplePic from "../../../../../../public/images/sample-poster.jpg";
import { BiSolidVideo } from "react-icons/bi";
import useMovie from "../../../../../../actions/get-movie";

interface BodyProps {
    imdbID: string | null;
}

const Body: React.FC<BodyProps> = ({ imdbID }) => {
    const { movie, loading, error } = useMovie(imdbID);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading movie details: {error}</div>;

    if (!movie) return null;

    return (
        <div className="relative flex flex-col justify-center items-center w-full h-screen mt-12">
            <div
                className="absolute inset-0 bg-cover bg-center opacity-45 justify-center items-center z-0"
                style={{
                    backgroundImage: `url(${movie.Poster !== "N/A" ? movie.Poster : SamplePic.src})`
                }}
            ></div>
            <div className="relative flex gap-4 space-x-2 p-4 z-10 ">
                <div className="rounded-xl">
                    <Image src={movie.Poster !== "N/A" ? movie.Poster : SamplePic} alt="poster" height={200} width={200} className="rounded-xl" />
                </div>
                <div className="flex-1 flex flex-col justify-between items-start text-cyan-950 dark:text-white">
                    <p className="text-4xl text-cyan-950 dark:text-white font-thin font-sans">{movie.Title}</p>
                    <div className="flex pt-4 gap-4 items-center">
                        <div className="bg-white text-black flex rounded-lg justify-center items-center p-1 gap-x-2 text-lg font-thin">
                            <p>Trailer</p>
                            <BiSolidVideo className="text-2xl" />
                        </div>
                        <div className="border border-white p-1 bg-cyan-950 bg-opacity-30 flex text-white m-1 rounded-md">HD</div>
                        <p className="text-orange-400 text-xl font-bold">IMDB: {movie.imdbRating}</p>
                    </div>
                    <div className="text-base text-cyan-950 dark:text-white mt-3 space-y-4">
                        <p className="text-justify items-center w-6/12">{movie.Plot}</p>
                        <div className="flex gap-2">
                            <p className="font-bold">Released:</p>
                            <p>{movie.Released}</p>
                        </div>
                        <div className="flex gap-2">
                            <p className="font-bold">Genre:</p>
                            <p>{movie.Genre}</p>
                        </div>
                        <div className="flex gap-2">
                            <p className="font-bold">Casts:</p>
                            <p>{movie.Actors}</p>
                        </div>
                        <div className="flex gap-2">
                            <p className="font-bold">Country:</p>
                            <p>{movie.Country}</p>
                        </div>
                        <div className="flex gap-2">
                            <p className="font-bold">Production:</p>
                            <p>{movie.Production}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Body;
