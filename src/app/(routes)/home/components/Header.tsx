import Image from "next/image";
import Logo from "../../../../../public/images/logo-2-transparent.png"
import Navbar from "./SideNav";
import Link from "next/link";
const Header = () => {
    return ( 
            
        <Link href="/">
            <div className="">
                <Image src={Logo} alt="logo" height={100} width={100}/>
            </div>
        </Link>
            
     );
}
 
export default Header;