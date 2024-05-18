"use client"
import Image from "next/image";
import MenuClose from "../../../../../public/images/close.png";
import Plus from "../../../../../public/images/plus.png";
import Minus from "../../../../../public/images/minus.png";

import { useState } from "react";
import Link from "next/link";
import { BiMenu } from "react-icons/bi";

const SideNav = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [showGenre, setShowGenre] = useState(false);
    const [showCountry, setShowCountry] = useState(false);
    
    function toggleMenu() {
        setShowMenu(!showMenu);
    }
    function toggleGenre() {
        setShowGenre(!showGenre);
    }
    //close genre automatically if menu is closed
    if (!showMenu && showGenre) {
        setShowGenre(false);
    }
    function toggleCountry() {
        setShowCountry(!showCountry);
    }
    //close country automatically if menu is closed
    if (!showMenu && showCountry) {
        setShowCountry(false);
    }
    return (
        <div className="flex justify-center items-center ">
            {!showMenu && (
                <div className="px-12 hover:opacity-70" onClick={toggleMenu} >
                    <BiMenu className="text-6xl text-cyan-950 mt-4 hover:bg-opactity-70"/>
                </div>
            )}
            {showMenu && (
                <>
                    <div className="px-28">&nbsp;</div>
                    <div className="flex flex-col bg-slate-200 fixed left-0 top-0 h-fit rounded-2xl justify-between items-center pl-10 pb-8">
                        <div className="flex pt-10 pr-2" onClick={toggleMenu}>
                            <div className="flex justify-center items-center">Close
                                <Image src={MenuClose} alt="close menu" height={30} width={30} />
                            </div>
                        </div>
                        <div className="flex flex-col justify-between items-start space-y-4 gap-2 pl-4 pb-24 pr-2 pt-36">
                            <div className="w-full shadow-green-900 shadow-lg ">
                                <Link href="/">
                                    <div className="pr-8 pl-2 border-b-4 border-b-emerald-900 hover:bg-slate-200 hover:border-opacity-50">Home</div>
                                </Link>
                            </div>
                            <div className="w-full flex justify-between shadow-green-900 shadow-lg pr-8 pl-2 border-b-4 border-b-emerald-900 hover:bg-slate-200 hover:border-opacity-50">
                                <div className="space-x-12 pr-4 justify-between items-center">Genre</div>
                                {!showGenre && <div onClick={toggleGenre}><Image src={Plus} alt="+" width={25} height={25} /></div>}
                                {showGenre && (
                                    <div>
                                        <div className="grid grid-cols-2 gap-2 bg-slate-600 bg-opacity-15 rounded-xl">
                                            <div className="col-span-2 p-4 flex justify-center" onClick={toggleGenre}><Image src={Minus} alt="-" width={25} height={25} /></div>
                                            <div className="col-span-1 p-2">Horror</div>
                                            <div className="col-span-1 p-2">Action</div>
                                            <div className="col-span-1 p-2">Comedy</div>
                                            <div className="col-span-1 p-2">Drama</div>
                                            <div className="col-span-1 p-2">Science Fiction</div>
                                            <div className="col-span-1 p-2">Fantasy</div>
                                            <div className="col-span-1 p-2">Romance</div>
                                            <div className="col-span-1 p-2">Thriller</div>
                                            <div className="col-span-1 p-2">Adventure</div>
                                            <div className="col-span-1 p-2">Animation</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="w-full flex justify-between shadow-green-900 shadow-lg pr-8 pl-2 border-b-4 border-b-emerald-900 hover:bg-slate-200 hover:border-opacity-50">
                                <div className="space-x-12 pr-4 justify-between items-center">Country</div>
                                {!showCountry && <div onClick={toggleCountry}><Image src={Plus} alt="+" width={25} height={25} /></div>}
                                {showCountry && (
                                    <div>
                                        <div className="grid grid-cols-2 gap-2 bg-slate-600 bg-opacity-15 rounded-xl">
                                            <div className="col-span-2 p-4 flex justify-center" onClick={toggleCountry}><Image src={Minus} alt="-" width={25} height={25} /></div>
                                            <div className="col-span-1 p-2">USA</div>
                                            <div className="col-span-1 p-2">UK</div>
                                            <div className="col-span-1 p-2">Canada</div>
                                            <div className="col-span-1 p-2">Australia</div>
                                            <div className="col-span-1 p-2">France</div>
                                            <div className="col-span-1 p-2">Germany</div>
                                            <div className="col-span-1 p-2">India</div>
                                            <div className="col-span-1 p-2">Japan</div>
                                            <div className="col-span-1 p-2">South Korea</div>
                                            <div className="col-span-1 p-2">China</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="w-full shadow-green-900 shadow-lg">
                                <Link href="/movies">
                                    <div className="pr-8 pl-2 border-b-4 border-b-emerald-900 hover:bg-slate-200 hover:border-opacity-50">Movies</div>
                                </Link>
                            </div>
                            <div className="w-full shadow-green-900 shadow-lg">
                                <Link href="/tv-shows">
                                    <div className="pr-8 pl-2 border-b-4 border-b-emerald-900 hover:bg-slate-200 hover:border-opacity-50">Tv Shows</div>
                                </Link>
                            </div>
                            <div className="w-full shadow-green-900 shadow-lg">
                                <Link href="/top-imdb">
                                    <div className="pr-8 pl-2 border-b-4 border-b-emerald-900 hover:bg-slate-200 hover:border-opacity-50">Top IMDB</div>
                                </Link>
                            </div>
                            <div className="w-full shadow-green-900 shadow-lg">
                                <Link href="">
                                    <div className="pr-8 pl-2 border-b-4 border-b-emerald-900 hover:bg-slate-200 hover:border-opacity-50">Download App</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default SideNav;
