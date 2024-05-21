import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import SocialHandle from "../../components/Social-Handle";
import Body from "./components/Body";
import Suggestions from "./components/Suggestions";

const Movie = () => {
    return ( 
        <>
            <div className="flex flex-col justify-center items-center w-max sm:w-screen md:w-full lg:w-full">
                {/*<SideNav />*/}
                <Header />
            </div>
            <div className="flex flex-col justify-center items-center w-max sm:w-screen md:w-full lg:w-full">    
                <SearchBar/>
                <Body/>
                <SocialHandle/>
                <Suggestions/>
                <Footer />
            </div>    
        </>
     );
}
 
export default Movie;