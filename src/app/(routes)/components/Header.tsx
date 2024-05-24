"use client"
import Image from "next/image";
import Logo from "../../../../public/images/logo-2-transparent.png";
import Link from "next/link";
import { FaHome, FaTv, FaStar, FaImdb } from 'react-icons/fa';
import ModeToggle from "./mode-toggle";
import { BiSolidCameraMovie } from "react-icons/bi";

const Header = () => {
    return ( 
        <div className="flex items-center lg:px-16 md:px-10 sm:px-4 px-12 justify-between gap-8 w-max sm:w-full md:w-screen lg:w-screen">
            <Link href="/">
                <Image 
                    src={Logo} 
                    alt="logo" 
                    height={100} 
                    width={100} 
                    className=""
                />
            </Link>
            <div className="flex gap-4 text-6xl sm:text-6xl md:text-6xl lg:text-4xl lg:font-bold text-cyan-950">
                {/* Icons for small and medium screens */}
                <Link href="/home" className="lg:hidden hover:text-emerald-950 hover:text-opacity-85">
                    <FaHome />
                </Link>
                <Link href="/movies" className="lg:hidden hover:text-emerald-950 hover:text-opacity-85">
                    <BiSolidCameraMovie />
                </Link>
                <Link href="/tv-shows" className="lg:hidden hover:text-emerald-950 hover:text-opacity-85">
                    <FaTv />
                </Link>
                <Link href="/top-imdb" className="lg:hidden hover:text-emerald-950 hover:text-opacity-85">
                    <FaImdb />
                </Link>
                
                {/* Text for large screens */}
                <Link href="/home" className="hidden lg:block hover:underline hover:text-emerald-950 hover:text-opacity-85 text-3xl">
                    Home
                </Link>
                <Link href="/movies" className="hidden lg:block hover:underline hover:text-emerald-950 hover:text-opacity-85 text-3xl">
                    Movies
                </Link>
                <Link href="/tv-shows" className="hidden lg:block hover:underline hover:text-emerald-950 hover:text-opacity-85 text-3xl">
                    Tv Shows
                </Link>
                <Link href="/top-imdb" className="hidden lg:block hover:underline hover:text-emerald-950 hover:text-opacity-85 text-3xl">
                    Top IMDB
                </Link>
            </div>
            <ModeToggle />
        </div>
    );
}

export default Header;
