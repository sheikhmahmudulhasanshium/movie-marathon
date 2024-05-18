import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaWhatsappSquare } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { FaReddit } from "react-icons/fa";

const SocialHandle = () => {
    return ( 
        <div className=" grid grid-cols-5 py-12 justify-center  items-center gap-12 md:text-5xl sm:text-3xl lg:text-6xl text-7xl mx-12">
            <div className="hover:animate-bounce col-span-1"><Link href="https://www.facebook.com/"><FaFacebook className=" text-blue-800"/></Link></div>
            <div className="hover:animate-bounce col-span-1"><Link href="https://twitter.com/"><FaSquareXTwitter className=" text-black"/></Link></div>
            <div className="hover:animate-bounce col-span-1"><Link href="https://web.whatsapp.com/"><FaWhatsappSquare className=" text-green-600"/></Link></div>
            <div className="hover:animate-bounce col-span-1"><Link href="https://web.telegram.org/a/"><FaTelegram className=" text-blue-500"/></Link></div>
            <div className="hover:animate-bounce col-span-1"><Link href="https://www.reddit.com/"><FaReddit className=" text-orange-600"/></Link></div>


        </div>
     );
}
 
export default SocialHandle;