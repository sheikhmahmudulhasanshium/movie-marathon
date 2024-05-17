import Image from "next/image";
import Logo from "../../../../public/images/logo-2-transparent.png"
import Link from "next/link";
const Header = () => {
    return ( 
        <div className="flex items-center   justify-between   px-14">
            <Link href="/home"><Image src={Logo} alt="logo" height={100} width={100}/></Link>
            <div className="flex gap-4 md:text-xl lg:text-2xl sm:text-lg font-bold">
                <Link href="/home"><div className="hover:underline hover:text-emerald-950 hover:text-opacity-85">Home</div></Link>
                <Link href="/movies"><div className="hover:underline hover:text-emerald-950 hover:text-opacity-85">Movies</div></Link>
                <Link href="/tv-shows"><div className="hover:underline hover:text-emerald-950 hover:text-opacity-85">Tv Shows</div></Link>
                <Link href="/top-imdb"><div className="hover:underline hover:text-emerald-950 hover:text-opacity-85">Top IMDB</div></Link>
            </div>
        </div>
     );
}
 
export default Header;