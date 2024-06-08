// VideoPlayer.tsx

import { Movie } from "../../../../type";

interface VideoPlayerProps {
    imdbID: string;
    movie: Movie;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ imdbID,movie }) => {
    const movieType=movie.Type
    if(movieType==="series"){
       const totalSeasons= movie.totalSeasons
       return (
        <div className="flex justify-center items-center w-full h-full absolute top-0 left-0">
            <div className="relative w-[100%] max-w-5xl h-full">
                <iframe
                    src={`https://vidsrc.net/embed/tv/${imdbID}`}
                    className="absolute top-0 left-0 w-full h-full"
                    allowFullScreen
                    
                ></iframe>
            </div>
        </div>
    );
    }

    if(movieType==="movie"){
        return (
                <div className="flex justify-center items-center w-full h-full absolute top-0 left-0">
                    <div className="relative w-[100%] max-w-5xl h-full">
                        <iframe
                            src={`https://vidsrc.net/embed/movie/${imdbID}`}
                            className="absolute top-0 left-0 w-full h-full"
                            allowFullScreen
                            
                        ></iframe>
                    </div>
                </div>
        );
    }
    
};

export default VideoPlayer;