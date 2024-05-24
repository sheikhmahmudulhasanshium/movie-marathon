import Image from "next/image";
import Logo from "./../../../../public/images/logo-transparent.png"
import SearchBar from "./SearchBar";
import FullSite from "./FullSite";
import FAQ from "./FAQ";
import SocialHandle from "./Social-Handle";
import Footer from "./Footer";
const Body = () => {
    return ( 
        <div className="bg-emerald-950  flex  justify-center items-center flex-col  bg-opacity-15   ">
            <Image src={Logo} alt="Logo" height={200} width={200}/>
            <SearchBar/>
            <FullSite/>
            <SocialHandle/>
            <FAQ/>
            <FullSite/>
            <Footer/>
        </div>
     );
}
 
export default Body;