"use client";
import { useSearchParams } from 'next/navigation';
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import SocialHandle from "../../components/Social-Handle";
import Body from "./components/Body";
import Suggestions from "../../components/Suggestions";
import Details from '../../components/Details';
import SeasonInfoCard from './components/seasons-and-episodes-info';
import useShow from '../../../../../actions/get-show';

const Show: React.FC = () => {
    const searchParams = useSearchParams();
    const imdbID = searchParams.get("id");
    const {series}=useShow(imdbID)
    const title=series?.Title||"loading..."
    const description=series?.Plot
    const imageUrl=series?.Poster
    return (
        <html>
            <head>
                <link rel="icon" href="../../images/favicon.ico" />
                <title>{title}</title>
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={imageUrl} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={imageUrl} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={imageUrl} />
            </head>
            <body>
                <div className='flex flex-col pt-8  w-max sm:w-screen md:w-full lg:w-full justify-center items-center max-w-max'>
                    <div className="flex flex-col justify-center items-center ">
                        <Header />
                    </div>
                    <div className="flex flex-col justify-center items-center ">
                        <SearchBar />
                        
                        <Body imdbID={imdbID} />
                        <SeasonInfoCard imdbID={imdbID}/>
                        <Details imdbID={imdbID} movieType='series'/>
                        <SocialHandle />
                        <Suggestions imdbID={imdbID}/>
                        <Footer />
                        

                    </div>
                </div>
            </body>
        </html>
    );
};

export default Show;
