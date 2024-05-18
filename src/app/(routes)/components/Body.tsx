import Image from "next/image";
import Logo from "./../../../../public/images/logo-transparent.png"
import SearchBar from "./SearchBar";
import FullSite from "./FullSite";
import FAQ from "./FAQ";
import SocialHandle from "./Social-Handle";
import Footer from "./Footer";
const Body = () => {
    return ( 
        <div className="bg-emerald-950  flex  justify-between items-center flex-col px-0 sm:px-0 md:px-2 lg:px-8 bg-opacity-15 w-max sm:w-full md:w-screen lg:w-screen ">
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