import SearchBar from "../../components/SearchBar";
import SocialHandle from "../../components/Social-Handle";
import About from "./About";
import Content from "./Content";

const Body = () => {
    return ( 
        <div className=" flex  flex-col  justify-center items-center ">
            <div className="max-w-screen-sm sm:w-full md:w-screen lg:w-screen ">
                <div className=" flex"><SearchBar/></div>
                <About/>
                <SocialHandle/>
                <Content/>
            </div>
        </div>
     );
}
 
export default Body;