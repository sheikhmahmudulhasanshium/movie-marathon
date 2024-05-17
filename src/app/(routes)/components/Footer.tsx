import Image from "next/image";
import Logo from "../../../../public/images/logo-transparent.png"
import Link from "next/link";
const Footer = () => {
    return (
        <footer className="bg-gray-100 text-gray-900 pb-4 text-center w-full">
            <Link href="/" >
                <div className="flex justify-center items-center gap-10 pb-8">
                    <Image src={Logo} alt="Logo" width={100} height={100} className="w-4/12 h-4/12"/>
                    <p className="w-4/12 text-justify pt-6">Movie Marathon is the ultimate app for movie enthusiasts who love to binge-watch their favorite films and TV shows. Whether you&apos;re planning a cozy night in or an epic weekend of non-stop entertainment, Movie Marathon helps you organize and enhance your viewing experience. With a vast library of movies and TV series across various genres, personalized recommendations, and seamless streaming options, you can easily discover new favorites and revisit classics.</p>
                </div>
            </Link>
            
            <div className="flex justify-center items-center gap-4 pb-8">
                <div className="hover:underline hover:opacity-85"><Link href="/terms-and-conditions">Terms & Conditions</Link></div>
                <div className="hover:underline hover:opacity-85"><Link href="/privacy-policy">Privacy Policy</Link></div>
                
                <div className="hover:underline hover:opacity-85"><Link href="/contact">Contact</Link></div>
                
            </div>
            <p className="text-sm">&copy; 2024 Movie Marathon. All rights reserved.</p>
        </footer>
    );
};

export default Footer;