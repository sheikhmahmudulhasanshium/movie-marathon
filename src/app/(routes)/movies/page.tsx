import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import Header from "../home/components/Header";
import SideNav from "../home/components/SideNav";
import Container from "./components/container";

const Movies = () => {
    return (
        <div>
            <div className="flex justify-start">
                <SideNav />
                <Header />

            </div>
            <SearchBar/>
            <Container />
            <Footer />
        </div>
    );
};

export default Movies;
