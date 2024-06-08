// Body.tsx
import React, { useState } from "react";
import SamplePic from "../../../../../../public/images/sample-poster.jpg";
import useMovie from "../../../../../../actions/get-movie";
import { FaCirclePlay } from "react-icons/fa6";
import VideoPlayer from "@/app/(routes)/components/VideoPlayer";

interface BodyProps {
    imdbID: string | null;
}

const Body: React.FC<BodyProps> = ({ imdbID }) => {
    const { movie, loading, error } = useMovie(imdbID);
    const [showVideo, setShowVideo] = useState(false);

    if (error) return <div>Error loading movie details: {error}</div>;

    if (!movie) return null;

    return (
        <div className="relative flex flex-col justify-center items-center my-12 w-full h-screen">
            {showVideo && imdbID ? (
                <div className=" flex justify-center items-center "><VideoPlayer imdbID={imdbID} movie={movie}/></div>
            ) : (
                <>
                    <div
                        className="absolute w-full h-full bg-cover bg-center opacity-45 z-0"
                        style={{
                            backgroundImage: `url(${movie.Poster !== "N/A" ? movie.Poster : SamplePic.src})`
                        }}
                    />
                    <div className="relative flex justify-center items-center py-12 w-full">
                        <button onClick={() => setShowVideo(true)}>
                            <FaCirclePlay className="text-9xl text-zinc-100 bg-cyan-950 rounded-full hover:bg-zinc-900 hover:text-zinc-500" />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Body;