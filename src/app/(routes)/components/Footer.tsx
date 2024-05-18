import Image from "next/image";
import Logo from "../../../../public/images/logo-transparent.png";
import Link from "next/link";

const Footer = () => {
    return (
        <div className=" flex flex-col justify-center items-center mt-24 w-full py-20 bg-slate-200 bg-opacity-25">
            <div className="flex flex-1 sm:flex-row  justify-center items-center w-full max-w-screen-lg px-20 gap-8">
                <div className="flex">
                    <Image src={Logo} alt="Logo" height={3200} width={3200} className="py-20 w-400 h-400" />
                </div>
                <div className="text-black ">
                    <p className="text-justify text-xl flex">
                        Movie Marathon is the ultimate app for movie enthusiasts who love to binge-watch their favorite films and TV shows. Whether you're planning a cozy night in or an epic weekend of non-stop entertainment, Movie Marathon helps you organize and enhance your viewing experience. With a vast library of movies and TV series across various genres, personalized recommendations, and seamless streaming options, you can easily discover new favorites and revisit classics.
                    </p>
                </div>
            </div>

            <div className="flex justify-center items-center gap-4 pt-8 text-xl space-x-2">
                <div className="hover:underline hover:opacity-85"><Link href="/terms-and-conditions">Terms & Conditions</Link></div>
                <div className="hover:underline hover:opacity-85"><Link href="/privacy-policy">Privacy Policy</Link></div>
                
                <div className="hover:underline hover:opacity-85"><Link href="/contact">Contact</Link></div>
                
            </div>
            <p className="text-base pt-8">&copy; 2024 Movie Marathon. All rights reserved.</p>
        </div>
    );
};

export default Footer;

{/*<footer className="bg-gray-100 text-gray-900 pb-4 text-center grid grid-cols-2">
            <Link href="/" >
                <div className="flex justify-center items-center gap-10 pb-8">
                    <Image src={Logo} alt="Logo" width={100} height={100} className=""/>
                    <p className="w-4/12 text-justify pt-6">Movie Marathon is the ultimate app for movie enthusiasts who love to binge-watch their favorite films and TV shows. Whether you&apos;re planning a cozy night in or an epic weekend of non-stop entertainment, Movie Marathon helps you organize and enhance your viewing experience. With a vast library of movies and TV series across various genres, personalized recommendations, and seamless streaming options, you can easily discover new favorites and revisit classics.</p>
                </div>
            </Link>
            
            <div className="flex justify-center items-center gap-4 pb-8">
                <div className="hover:underline hover:opacity-85"><Link href="/terms-and-conditions">Terms & Conditions</Link></div>
                <div className="hover:underline hover:opacity-85"><Link href="/privacy-policy">Privacy Policy</Link></div>
                
                <div className="hover:underline hover:opacity-85"><Link href="/contact">Contact</Link></div>
                
            </div>
            <p className="text-sm">&copy; 2024 Movie Marathon. All rights reserved.</p>
    </footer>*/}