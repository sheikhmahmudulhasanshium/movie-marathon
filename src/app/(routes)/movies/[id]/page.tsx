import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import SocialHandle from "../../components/Social-Handle";
import Body from "./components/Body";
import Suggestions from "./components/Suggestions";

const Movie = () => {
    return ( 
        <>
            <div className="flex justify-start">
                {/*<SideNav />*/}
                <Header />
            </div>
                <SearchBar/>
                <Body/>
                <SocialHandle/>
                <Suggestions/>
                <Footer />
        </>
     );
}
 
export default Movie;