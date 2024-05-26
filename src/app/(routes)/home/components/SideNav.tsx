"use client";
import { useState } from "react";
import Link from "next/link";
import { BiLeftArrow, BiMenu } from "react-icons/bi";
import ModeToggle from "../../components/mode-toggle";
import { PiMinusCircleFill, PiPlusCircleFill } from "react-icons/pi";
import { Countries, Genres } from "../../../../../type";
import { queue } from "sharp";

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

    function toggleCountry() {
        setShowCountry(!showCountry);
    }

    if (!showMenu && (showGenre || showCountry)) {
        setShowGenre(false);
        setShowCountry(false);
    }

    return (
        <div className="flex justify-center items-center h-full ">
            {!showMenu && (
                <div className="px-12 hover:opacity-70" onClick={toggleMenu}>
                    <BiMenu className="text-6xl text-cyan-950 mt-4 hover:bg-opacity-70" />
                </div>
            )}
            {showMenu && (
                <div className="flex justify-center items-center h-full w-full px-48">
                    <div className="fixed inset-0 bg-white dark:bg-cyan-950  flex flex-col justify-between items-center h-full w-64 p-4 rounded-br-2xl shadow-lg z-50">
                        <div className="flex items-center justify-between w-full pb-8 ">
                            <ModeToggle />
                            <div className="flex items-center gap-2 cursor-pointer" onClick={toggleMenu}>
                                <BiLeftArrow className="text-red-700 text-4xl font-bold" />
                                <span className="text-xl">Close</span>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-4 w-full flex-grow overflow-y-auto ">
                            <Link href="/">
                                <div className="pr-8 pl-2 border-b-4 border-emerald-900 dark:border-emerald-600 hover:bg-slate-300 dark:hover:bg-slate-700 hover:border-opacity-50">Home</div>
                            </Link>
                            <div className="flex flex-col w-full border-b-4 border-emerald-900 dark:border-emerald-600 shadow-lg hover:bg-slate-300 dark:hover:bg-slate-700 hover:border-opacity-50">
                                <div className="flex justify-between items-center pr-8 pl-2 cursor-pointer" onClick={toggleGenre}>
                                    <span>Genre</span>
                                    <div>
                                        {showGenre ? <PiMinusCircleFill className="text-xl text-slate-950" /> : <PiPlusCircleFill className="text-xl text-slate-950" />}
                                    </div>
                                </div>
                                {showGenre && (
                                    <div className="grid grid-cols-2 gap-2 p-2 bg-slate-600 bg-opacity-15 rounded-xl">
                                        {Genres.map((genre) => (
                                            <div
                                                key={genre}
                                                className="col-span-1 px-1 hover:bg-cyan-500 cursor-pointer"
                                            >
                                                <Link  href={{pathname:`/genre/${genre.toLowerCase()}`,query:{genre}}}>
                                                    <p>{genre}</p>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col w-full border-b-4 border-emerald-900 dark:border-emerald-600 shadow-lg hover:bg-slate-300 dark:hover:bg-slate-700 hover:border-opacity-50">
                                <div className="flex justify-between items-center pr-8 pl-2 cursor-pointer" onClick={toggleCountry}>
                                    <span>Country</span>
                                    <div>
                                        {showCountry ? <PiMinusCircleFill className="text-xl text-slate-950" /> : <PiPlusCircleFill className="text-xl text-slate-950" />}
                                    </div>
                                </div>
                                {showCountry && (
                                    <div className="grid grid-cols-2 gap-2 p-2 bg-slate-600 bg-opacity-15 rounded-xl">
                                        {Countries.map((country) => (
                                            <div
                                                key={country}
                                                className="col-span-1 px-1 hover:bg-cyan-500 cursor-pointer"
                                            >
                                                <Link  href={{pathname:`/country/${country.toLowerCase()}`,query:{country}}}>
                                                    <p>{country}</p>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <Link href="/movies">
                                <div className="pr-8 pl-2 border-b-4 border-emerald-900 dark:border-emerald-600 hover:bg-slate-300 dark:hover:bg-slate-700 hover:border-opacity-50">Movies</div>
                            </Link>
                            <Link href="/tv-shows">
                                <div className="pr-8 pl-2 border-b-4 border-emerald-900 dark:border-emerald-600 hover:bg-slate-300 dark:hover:bg-slate-700 hover:border-opacity-50">Tv Shows</div>
                            </Link>
                            <Link href="/top-imdb">
                                <div className="pr-8 pl-2 border-b-4 border-emerald-900 dark:border-emerald-600 hover:bg-slate-300 dark:hover:bg-slate-700 hover:border-opacity-50">Top IMDB</div>
                            </Link>
                            <Link href="">
                                <div className="pr-8 pl-2 border-b-4 border-emerald-900 dark:border-emerald-600 hover:bg-slate-300 dark:hover:bg-slate-700 hover:border-opacity-50">Download App</div>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SideNav;
