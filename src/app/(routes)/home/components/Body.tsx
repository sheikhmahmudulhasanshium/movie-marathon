import SearchBar from "../../components/SearchBar";
import SocialHandle from "../../components/Social-Handle";
import About from "./About";
import Content from "./Content";

const Body = () => {
    return ( 
        <div className="w-full bg-slate-300 flex  justify-between items-center  flex-col">
            <div className="w-full justify-center items-center flex lg:px-60 md:px-6 sm:px-2"><SearchBar/></div>
            
            <About/>
            <SocialHandle/>
            <Content/>
        </div>
     );
}
 
export default Body;