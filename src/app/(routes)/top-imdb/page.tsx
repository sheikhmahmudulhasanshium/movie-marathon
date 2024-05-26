import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import Header from "../home/components/Header";
import SideNav from "../home/components/SideNav";
import Container from "./components/container";

const topImdb = () => {
    return (
        <div className="flex flex-col w-max sm:w-max md:w-screen lg:w-full ">
            <div className="flex start">
                <SideNav />
                <Header />
            </div>
            
            <div className="flex flex-col justify-center items-center">
                <SearchBar/>
                <Container />
                <Footer/>
            </div>
        </div>
    );
};

export default topImdb;
