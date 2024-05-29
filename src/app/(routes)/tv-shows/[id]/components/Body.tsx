import React from "react";
import Image from "next/image";
import SamplePic from "../../../../../../public/images/sample-poster.jpg";
import { BiSolidVideo } from "react-icons/bi";
import useShow from "../../../../../../actions/get-show";
import stringToList from "../../../../../../actions/get-string";

interface BodyProps {
    imdbID: string | null;
}

const Body: React.FC<BodyProps> = ({ imdbID }) => {
    const { series, loading, error } = useShow(imdbID);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading series details: {error}</div>;

    if (!series) return null;

    const genres = stringToList(series.Genre, 'genre');
    const countries = stringToList(series.Country, 'country');
    const actors = stringToList(series.Actors, 'actors');
    const productions = stringToList(series.Production, 'production');
    const directors= stringToList(series.Director,"director")

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
                        <p className="text-orange-800 dark:text-orange-400 text-xl font-bold bg-opacity-30 bg-slate-400 rounded-xl p-1">IMDB: {series.imdbRating}</p>
                    </div>
                    <div className="text-base text-cyan-950 dark:text-white mt-3 space-y-4">
                        <p className="text-justify items-center w-10/12">{series.Plot}</p>
                        <div className="flex gap-2">
                            <p className="font-bold">Released:</p>
                            <p>{series.Released}</p>
                        </div>
                        <div className="flex gap-2">
                            <p className="font-bold">Genre:</p>
                            {genres}
                        </div>
                        <div className="flex gap-2">
                            <p className="font-bold">Casts:</p>
                            {actors}
                        </div>
                        <div className="flex gap-2">
                            <p className="font-bold">Director:</p>
                            {directors}
                        </div>
                        <div className="flex gap-2">
                            <p className="font-bold">Country:</p>
                            {countries}
                        </div>
                        <div className="flex gap-2">
                            <p className="font-bold">Production:</p>
                            {productions}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Body;
