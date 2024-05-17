"use client"
import Image from "next/image";
import Menu from "../../../../../public/images/menu.png";
import MenuClose from "../../../../../public/images/close.png";
import { useState } from "react";

const SideNav = () => {
    const [showMenu, setShowMenu] = useState(false);

    function toggleMenu() {
        setShowMenu(!showMenu);
    }

    return (
        <div className="flex justify-center items-center">
            {!showMenu && (
                <div className="px-12" onClick={toggleMenu}>
                    
                    <Image src={Menu} alt="menu" height={30} width={30} />
                </div>
            )}
            {showMenu && (
                <div className="flex flex-col bg-slate-400 fixed left-0 top-0   h-full justify-between items-center pl-10 bg-opacity-15">
                    <div className="flex pt-10 pr-2" onClick={toggleMenu}>
                        <div className="flex justify-center items-center">Close
                        <Image src={MenuClose} alt="close menu" height={30} width={30} />
                        </div>
                    </div>
                    <div className="flex flex-col justify-between items-start space-y-4  gap-2 pl-4 pb-24 pr-2">
                        <div className="w-full  shadow-green-900 shadow-lg pr-8 pl-2   border-b-4 border-b-emerald-900 hover:bg-slate-200 hover:border-opacity-50">Home</div>
                        <div className="w-full  shadow-green-900 shadow-lg pr-8 pl-2   border-b-4 border-b-emerald-900 hover:bg-slate-200 hover:border-opacity-50">Genre</div>
                        <div className="w-full  shadow-green-900 shadow-lg pr-8 pl-2   border-b-4 border-b-emerald-900 hover:bg-slate-200 hover:border-opacity-50">Country</div>
                        <div className="w-full  shadow-green-900 shadow-lg pr-8 pl-2   border-b-4 border-b-emerald-900 hover:bg-slate-200 hover:border-opacity-50">Movies</div>
                        <div className="w-full  shadow-green-900 shadow-lg pr-8 pl-2   border-b-4 border-b-emerald-900 hover:bg-slate-200 hover:border-opacity-50">Tv Shows</div>
                        <div className="w-full  shadow-green-900 shadow-lg pr-8 pl-2   border-b-4 border-b-emerald-900 hover:bg-slate-200 hover:border-opacity-50">Top IMDB</div>
            
                        <div className="w-full  shadow-green-900 shadow-lg pr-8 pl-2   border-b-4 border-b-emerald-900 hover:bg-slate-200 hover:border-opacity-50">Top IMDB</div>
                    </div>
                    
                </div>
            )}
        </div>
    );
};

export default SideNav;
