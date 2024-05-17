import Image from "next/image";
import Logo from "./../../../../public/images/logo-transparent.png"
import SearchBar from "./SearchBar";
import FullSite from "./FullSite";
import FAQ from "./FAQ";
const Body = () => {
    return ( 
        <div className="bg-emerald-950 w-screen flex flex-1 justify-between items-center flex-col px-12 bg-opacity-15">
            <Image src={Logo} alt="Logo" height={200} width={200}/>
            <SearchBar/>
            <FullSite/>
            <FAQ/>
            <FullSite/>
        </div>
     );
}
 
export default Body;