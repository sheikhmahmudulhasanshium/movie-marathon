import Image from "next/image";
import Link from "next/link";
import SamplePoster from "../../../../../public/images/sample-poster.jpg"
import { Movie } from "../../../../../type";
interface CardProps {
    movie: Movie
}

const Card: React.FC<CardProps> = ({movie}) => {
    return ( 
        <div className="flex flex-col rounded-lg col-span-1 bg-slate-500 m-2 hover:opacity-85">
            <Link href={`/movie/${movie.imdbID}`} >
             {/**Quality in HD/4K/3D  */}
             <p className="border rounded-sm absolute ml-8 mt-4 font-bold text-yellow-500 bg-slate-50 bg-opacity-15">HD</p>
            <img src={movie.Poster} alt="Poster" height="400" width="300" className="rounded-t-xl" loading="lazy" />
            <p className="text-2xl text-center">{movie.Title}</p>
            <div className="flex justify-between gap-4 items-center p-4">
                {/**Release in Soon/Release year */}
                <p>{movie.Year}</p>
                {/**Type in Movie/Tv Show */}
                <p className=" border rounded-sm">{movie.Type}</p>

            </div></Link>
               
  
        </div>
     );
}
 
export default Card;