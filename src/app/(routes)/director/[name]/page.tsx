import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Profile from "./components/profile";

const Director = () => {
    return ( 
        <div className="flex flex-col justify-between items-center ">
            <Header/>
            <Profile/>
            <div className="flex w-max sm:w-max md:w-full lg:w-full "><Footer/></div>
        </div>
     );
}
 
export default Director;