import React, { useState } from 'react';
import { IoCloseCircle } from 'react-icons/io5';
import { TrailerData } from '../../../../type';
import { BiPlayCircle } from 'react-icons/bi';

interface TrailerProps {
  onClose: () => void;
  trailerData: TrailerData | null; // Adjust the type according to your data structure
}

const Trailer: React.FC<TrailerProps> = ({ onClose, trailerData }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!trailerData || !trailerData.videos || trailerData.videos.length === 0 || (trailerData.status && trailerData.status === "error")) {
    return (
      <div className='w-full h-screen absolute top-0 left-0 flex justify-center items-center bg-black'>
        <div className="bg-gray-900 w-full h-full max-w-md rounded-lg overflow-hidden shadow-lg flex flex-col justify-center items-center">
          <p className="text-white text-lg">{trailerData?.error || "Sorry, no trailer available."}</p>
          <button onClick={onClose} className="absolute top-2 right-2">
            <IoCloseCircle className='text-4xl text-red-600'/>
          </button>
        </div>
      </div>
    );
  }

  const videoIds = trailerData.videos.map(video => video.youtube_video_id).join(',') || '';
  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className='w-full h-screen absolute top-0 left-0 flex justify-center items-center bg-transparent'>
      <div className="w-full h-full max-w-5xl rounded-lg overflow-hidden shadow-lg relative">
        {!isPlaying && (
          <div className="relative w-full h-full flex justify-center items-center cursor-pointer" onClick={handlePlay}>
            <img 
              src={trailerData.videos[0].youtube_thumbnail} 
              alt="Thumbnail" 
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
            <BiPlayCircle className='absolute text-cyan-950 hover:opacity-50 text-8xl' />
          </div>
        )}
        {isPlaying && (
          <div className="relative w-full h-0" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 bg-transparent w-full h-full"
              src={`https://www.youtube.com/embed/${trailerData.videos[0].youtube_video_id}?playlist=${videoIds}&autoplay=1`}
              allowFullScreen
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        )}
        <button onClick={onClose} className="absolute top-2 right-2">
          <IoCloseCircle className='text-4xl text-red-600'/>
        </button>
      </div>
    </div>
  );
}

export default Trailer;
