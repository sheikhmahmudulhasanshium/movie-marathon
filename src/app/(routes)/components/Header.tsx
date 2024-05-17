import Image from "next/image";
import Logo from "../../../../public/images/logo-2-transparent.png"
import Link from "next/link";
const Header = () => {
    return ( 
        <div className="flex items-center   justify-between bg-blue-200  px-14">
            <div className=""><Image src={Logo} alt="logo" height={100} width={100}/></div>
            <div className="flex gap-4 md:text-xl lg:text-2xl sm:text-lg font-bold">
                <Link href="/home"><div className="hover:underline hover:text-emerald-950 hover:text-opacity-85">Home</div></Link>
                <div className="hover:underline hover:text-emerald-950 hover:text-opacity-85">Movies</div>
                <div className="hover:underline hover:text-emerald-950 hover:text-opacity-85">Tv Shows</div>
                <div className="hover:underline hover:text-emerald-950 hover:text-opacity-85">Top IMDB</div>
            </div>
        </div>
     );
}
 
export default Header;