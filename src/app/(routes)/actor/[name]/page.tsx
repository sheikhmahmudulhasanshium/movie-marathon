import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Profile from "./components/profile";

const Actor = () => {
    return ( 
        <div className="flex flex-col justify-between items-center ">
            <Header/>
            <Profile/>
            <Footer/>
        </div>
     );
}
 
export default Actor;