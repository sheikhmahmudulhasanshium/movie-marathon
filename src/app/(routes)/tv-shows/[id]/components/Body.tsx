import React, { useState } from "react";
import SamplePic from "../../../../../../public/images/sample-poster.jpg";
import { FaCirclePlay } from "react-icons/fa6";
import VideoPlayer from "@/app/(routes)/components/VideoPlayer";
import useShow from "../../../../../../actions/get-show";

interface BodyProps {
    imdbID: string | null;
}

const Body: React.FC<BodyProps> = ({ imdbID }) => {
    const { series, loading, error } = useShow(imdbID);
    const [showVideo, setShowVideo] = useState(false);
    const [selectedServer, setSelectedServer] = useState<number>(0);

    const handleServerSelect = (index: number) => {
        setSelectedServer(index);
    };

    if (error) return <div>Error loading series details: {error}</div>;

    if (!series) return null;

    return (
        <div className="relative flex flex-col justify-center items-center my-12 w-full h-screen">
            {showVideo && imdbID ? (
                <div className="flex justify-center items-center w-full h-full">
                    <VideoPlayer
                        imdbID={imdbID}
                        movie={series}
                        selectedServer={selectedServer}
                        onSelectServer={handleServerSelect}
                    />
                </div>
            ) : (
                <>
                    <div
                        className="absolute w-full h-full bg-cover bg-center opacity-45 z-0"
                        style={{
                            backgroundImage: `url(${series.Poster !== "N/A" ? series.Poster : SamplePic.src})`
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
