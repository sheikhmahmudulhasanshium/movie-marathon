import Image from "next/image";
import Logo from "../../../../public/images/logo-2-transparent.png"
import Link from "next/link";
const Header = () => {
    return ( 
        <div className="flex items-center lg:px-16 md:px-10 sm:px-4 px-12 justify-between gap-8 w-max sm:w-full md:w-screen lg:w-screen">
            <Link href="/home"><Image src={Logo} alt="logo" height={100} width={100} className="lg:w-24 lg:h-24 md:w-28 md:h-28 sm:w-24 sm:h-24 w-40 h-40 "/></Link>
            <div className="flex gap-4 text-4xl sm:text-3xl md:text-3xl lg:text-3xl  lg:font-bold">
                <Link href="/home"><div className="hover:underline hover:text-emerald-950 hover:text-opacity-85">Home</div></Link>
                <Link href="/movies"><div className="hover:underline hover:text-emerald-950 hover:text-opacity-85">Movies</div></Link>
                <Link href="/tv-shows"><div className="hover:underline hover:text-emerald-950 hover:text-opacity-85">Tv Shows</div></Link>
                <Link href="/top-imdb"><div className="hover:underline hover:text-emerald-950 hover:text-opacity-85">Top IMDB</div></Link>
            </div>
        </div>
     );
}
 
export default Header;