import { BiSolidVideo } from "react-icons/bi";
import useMovie from "../../../../actions/get-movie";
import useShow from "../../../../actions/get-show";
import stringToList from "../../../../actions/get-string";
import SamplePic from "../../../../public/images/sample-poster.jpg";
import Image from "next/image";

interface DetailsProps {
    imdbID: string | null;
    movieType: string;
}

const Details: React.FC<DetailsProps> = ({ imdbID, movieType }) => {
    const { movie, loading: movieLoading, error: movieError } = useMovie(imdbID);
    const { series, loading: seriesLoading, error: seriesError } = useShow(imdbID);

    const loading = movieType === "movie" ? movieLoading : seriesLoading;
    const error = movieType === "movie" ? movieError : seriesError;
    const data = movieType === "movie" ? movie : series;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading details: {error}</div>;
    if (!data) return null;

    const genres = stringToList(data.Genre, 'genre');
    const countries = stringToList(data.Country, 'country');
    const actors = stringToList(data.Actors, 'actors');
    const productions = stringToList(data.Production, 'production');
    const directors = stringToList(data.Director, "director");

    return (
        <div className="relative flex gap-4 space-x-2 pl-44 z-10 my-12">
            <div className="rounded-xl">
                <Image src={data.Poster !== "N/A" ? data.Poster : SamplePic} alt="poster" height={200} width={200} className="rounded-xl" />
            </div>

            <div className="flex-1 flex flex-col justify-between items-start text-cyan-950 dark:text-white">
                <p className="text-4xl text-cyan-950 dark:text-white font-thin font-sans">{data.Title}</p>
                <div className="flex pt-4 gap-4 items-center">
                    <div className="bg-white text-black flex rounded-lg justify-center items-center p-1 gap-x-2 text-lg font-thin">
                        <p>Trailer</p>
                        <BiSolidVideo className="text-2xl" />
                    </div>
                    <div className="border border-white p-1 bg-cyan-950 bg-opacity-30 flex text-white m-1 rounded-md">HD</div>
                    <p className="text-orange-800 dark:text-orange-400 text-xl font-bold bg-opacity-30 bg-slate-400 rounded-xl p-1">IMDB: {data.imdbRating}</p>
                </div>
                <div className="text-base text-cyan-950 dark:text-white mt-3 space-y-4">
                    <p className="text-justify items-center w-10/12">{data.Plot}</p>
                    <div className="flex gap-2">
                        <p className="font-bold">Released:</p>
                        <p>{data.Released}</p>
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
    );
}

export default Details;
