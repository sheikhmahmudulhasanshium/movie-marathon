"use client"
import Image from "next/image";
import SamplePic from "../../../../../../public/images/sample-poster.jpg";
import { BiSolidVideo } from "react-icons/bi";
import { useSearchParams } from 'next/navigation';

interface BodyProps {
    title: string;
    poster: string;
    year: string;
    type: string;
    imdbRating: string;
    country: string;
    genre: string;
    production: string;
    plot: string;
    casts: string;
}

const Body: React.FC<BodyProps> = ({ title, poster, year, type, imdbRating, country, genre, production, plot, casts }) => {
    const genreArray = genre.split(',').map(item => item.trim());
    const productionArray = production.split(',').map(item => item.trim());
    const castsArray = casts.split(',').map(item => item.trim());

    return (
        <div className="relative flex flex-col justify-center items-center w-full h-screen mt-12">
            {/* Background image with opacity */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-75 justify-center items-center z-0"
                style={{
                    backgroundImage: `url(${poster !== "N/A" ? poster : SamplePic.src})`
                }}
            ></div>
            {/* Content on top of the background */}
            <div className="relative flex gap-4 space-x-2 p-4 z-10">
                <div className="rounded-xl">
                    <Image src={poster !== "N/A" ? poster : SamplePic} alt="poster" height={200} width={200} className="rounded-xl" />
                </div>
                <div className="flex-1 flex flex-col justify-between items-start">
                    <p className="text-4xl text-white font-thin font-sans">{title}</p>
                    <div className="flex pt-4 gap-4 items-center">
                        <div className="bg-white text-black flex rounded-lg justify-center items-center p-1 gap-x-2 text-lg font-thin">
                            <p>Trailer</p>
                            <BiSolidVideo className="text-2xl" />
                        </div>
                        {/* Quality */}
                        <div className="border border-white p-1 bg-cyan-950 bg-opacity-30 flex text-white m-1 rounded-md">HD</div>
                        {/* IMDB Rating */}
                        <p className="text-orange-400 text-lg">IMDB: {imdbRating}</p>
                    </div>
                    {/* Description */}
                    <div className="text-base text-white mt-3 space-y-4">
                        {/* Plot */}
                        <p className="text-justify items-center w-6/12">{plot}</p>
                        <div className="flex gap-2">
                            <p className="font-bold">Released:</p>
                            <p>{year}</p>
                        </div>
                        <div className="flex gap-2">
                            <p className="font-bold">Genre:</p>
                            <p>{genreArray.join(', ')}</p>
                        </div>
                        <div className="flex gap-2">
                            <p className="font-bold">Casts:</p>
                            <p>{castsArray.join(', ')}</p>
                        </div>
                        <div className="flex gap-2">
                            <p className="font-bold">Country:</p>
                            <p>{country}</p>
                        </div>
                        <div className="flex gap-2">
                            <p className="font-bold">Production:</p>
                            <p>{productionArray.join(', ')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Body;
