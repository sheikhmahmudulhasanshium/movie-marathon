"use client";
import Footer from "@/app/(routes)/components/Footer";
import Header from "@/app/(routes)/components/Header";
import SearchBar from "@/app/(routes)/components/SearchBar";
import Suggestion from "@/app/(routes)/components/Suggestions";
import { useSearchParams } from "next/navigation";
import SeasonInfoCard from "../../components/seasons-and-episodes-info";
import Details from "@/app/(routes)/components/Details";
import VideoPlayer from "./components/video-player";
import useEpisode from "../../../../../../../actions/get-episode";
import useShow from "../../../../../../../actions/get-show";

const Episode: React.FC = () => {
    const searchParams = useSearchParams();
    const episodeId = searchParams.get("episodeId");
    const seriesId = searchParams.get("seriesId");
    const { episode } = useEpisode(episodeId);
    const season = episode?.Season;
    const ep = episode?.Episode;
    const seriesTitle = useShow(seriesId).series?.Title;

    const title = `${seriesTitle} | S-${season} : Ep-${ep}`;
    const description = episode?.Plot || "Watch this exciting episode.";
    const imageUrl = episode?.Poster || "/default-image.jpg"; // Replace with a default image path

    return (
        <html>
            <head>
                <title>{title}</title>
                {/* Open Graph tags for Facebook */}
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={imageUrl} />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:type" content="video.episode" />
                
                {/* Twitter Card tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={imageUrl} />
                
                {/* Meta tags for email clients */}
                <meta name="description" content={description} />
                
                {/* Schema.org tags for Google+ and other services */}
                <meta itemProp="name" content={title} />
                <meta itemProp="description" content={description} />
                <meta itemProp="image" content={imageUrl} />
            </head>
            <body>
                <div className="flex flex-col">
                    <Header />
                    <SearchBar />
                    <VideoPlayer episodeId={episodeId} seriesId={seriesId} />
                    <SeasonInfoCard imdbID={seriesId} />
                    <Details imdbID={episodeId} movieType="episode" />
                    <Suggestion imdbID={episodeId} />
                    <Footer />
                </div>
            </body>
        </html>
    );
};

export default Episode;
