"use client"
import Footer from "@/app/(routes)/components/Footer";
import Header from "@/app/(routes)/components/Header";
import SearchBar from "@/app/(routes)/components/SearchBar";
import Suggestion from "@/app/(routes)/components/Suggestions";
import { useSearchParams } from "next/navigation";
import SeasonInfoCard from "../../components/seasons-and-episodes-info";
import Details from "@/app/(routes)/components/Details";
import VideoPlayer from "./components/video-player";

const Episode :React.FC= () => {
    const searchParams=useSearchParams()
    const episodeId=searchParams.get("episodeId")
    const seriesId=searchParams.get("seriesId")
    return ( 
        <div className="flex flex-col">
            <Header/>
            <SearchBar/>
            <VideoPlayer episodeId={episodeId} seriesId={seriesId}/>
            <SeasonInfoCard imdbID={seriesId}/>
            <Details imdbID={episodeId} movieType="episode"/>

            <Suggestion imdbID={episodeId}/>
            <Footer/>
        </div>
     );
}
 
export default Episode;