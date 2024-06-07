import React from "react";
import SamplePic from "../../../../../../public/images/sample-poster.jpg";
import Link from "next/link";
import { FaCirclePlay } from "react-icons/fa6";
import useShow from "../../../../../../actions/get-show";

interface BodyProps {
    imdbID: string | null;
}

const Body: React.FC<BodyProps> = ({ imdbID }) => {
    const { series, loading, error } = useShow(imdbID);

    if (error) return <div>Error loading series details: {error}</div>;

    if (!series) return null;

    return (
        <div className="relative flex flex-col justify-center items-center my-12 w-full h-screen">
            <div
                className="absolute w-full h-full bg-cover bg-center opacity-45 z-0"
                style={{
                    backgroundImage: `url(${series.Poster !== "N/A" ? series.Poster : SamplePic.src})`
                }}
            />
            <div className="relative z-10 flex justify-center items-center py-12">
                <Link href={`https://vidsrc.net/embed/series/${imdbID}`}>
                    <FaCirclePlay className="text-9xl text-zinc-100 bg-cyan-950 rounded-full hover:bg-zinc-900 hover:text-zinc-500" />
                </Link>
            </div>
        </div>
    );
};

export default Body;
