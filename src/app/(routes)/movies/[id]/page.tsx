import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import SocialHandle from "../../components/Social-Handle";
import Body from "./components/Body";
import Suggestions from "../../components/Suggestions";
import Details from '../../components/Details';
import useMovie from '../../../../../actions/get-movie';
import { Movie } from '../../../../../type';

interface MovieProps {
    imdbID: string;
    movie: Movie;
}

const MoviePage: React.FC<MovieProps> = ({ imdbID, movie }) => {
    return (
        <>
            <Head>
                <meta property="og:image" content={movie?.Poster} />
                <meta property="og:title" content={movie?.Title} />
                <meta property="og:description" content={movie?.Plot} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={movie?.Title} />
                <meta name="twitter:description" content={movie?.Plot} />
                <meta name="twitter:image" content={movie?.Poster} />
            </Head>
            <div className='flex flex-col pt-8 w-max sm:w-screen md:w-full lg:w-full justify-center items-center max-w-max'>
                <div className="flex flex-col justify-center items-center ">
                    <Header />
                </div>
                <div className="flex flex-col justify-center items-center ">
                    <SearchBar />
                    <Body imdbID={imdbID} />
                    <Details imdbID={imdbID} movieType={"movie"} />
                    <SocialHandle />
                    <Suggestions imdbID={imdbID} />
                    <Footer />
                </div>
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const imdbID = context.query.id as string;
    const movie = await useMovie(imdbID); // Update this line according to how you fetch your movie data

    return {
        props: {
            imdbID,
            movie,
        },
    };
};

export default MoviePage;
