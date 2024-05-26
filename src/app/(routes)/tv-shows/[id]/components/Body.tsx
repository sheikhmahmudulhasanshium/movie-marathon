import React from "react";
import Image from "next/image";
import SamplePic from "../../../../../../public/images/sample-poster.jpg";
import { BiSolidVideo } from "react-icons/bi";
import useMovie from "../../../../../../actions/get-show";
import useShow from "../../../../../../actions/get-show";

interface BodyProps {
    imdbID: string | null;
}

const Body: React.FC<BodyProps> = ({ imdbID }) => {
    const { series,loading, error } = useShow(imdbID);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading show details: {error}</div>;

    if (!series) return null;

    return (
        <div className="relative flex flex-col justify-center items-center w-full h-screen mt-12">
            <div
                className="absolute inset-0 bg-cover bg-center opacity-45 justify-center items-center z-0"
                style={{
                    backgroundImage: `url(${series.Poster !== "N/A" ? series.Poster : SamplePic.src})`
                }}
            ></div>
            <div className="relative flex gap-4 space-x-2 pl-28 z-10 ">
                <div className="rounded-xl">
                    <Image src={series.Poster !== "N/A" ? series.Poster : SamplePic} alt="poster" height={200} width={200} className="rounded-xl" />
                </div>
                <div className="flex-1 flex flex-col justify-between items-start text-cyan-950 dark:text-white">
                    <p className="text-4xl text-cyan-950 dark:text-white font-thin font-sans">{series.Title}</p>
                    <div className="flex pt-4 gap-4 items-center">
                        <div className="bg-white text-black flex rounded-lg justify-center items-center p-1 gap-x-2 text-lg font-thin">
                            <p>Trailer</p>
                            <BiSolidVideo className="text-2xl" />
                        </div>
                        <div className="border border-white p-1 bg-cyan-950 bg-opacity-30 flex text-white m-1 rounded-md">HD</div>
                        <p className="text-orange-400 text-xl font-bold">IMDB: {series.imdbRating}</p>
                    </div>
                    <div className="text-base text-cyan-950 dark:text-white mt-3 space-y-4">
                        <p className="text-justify items-center w-6/12">{series.Plot}</p>
                        <div className="flex gap-2">
                            <p className="font-bold">Released:</p>
                            <p>{series.Released}</p>
                        </div>
                        <div className="flex gap-2">
                            <p className="font-bold">Genre:</p>
                            <p>{series.Genre}</p>
                        </div>
                        <div className="flex gap-2">
                            <p className="font-bold">Casts:</p>
                            <p>{series.Actors}</p>
                        </div>
                        <div className="flex gap-2">
                            <p className="font-bold">Country:</p>
                            <p>{series.Country}</p>
                        </div>
                        <div className="flex gap-2">
                            <p className="font-bold">Production:</p>
                            <p>{series.Production}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Body;
