import Image from "next/image";
import Logo from "../../../../../public/images/logo-2-transparent.png"
import Navbar from "./SideNav";
const Header = () => {
    return ( 
            
        <div className="flex flex-1 justify-center items-center "><Image src={Logo} alt="logo" height={100} width={100}/></div>
            
     );
}
 
export default Header;