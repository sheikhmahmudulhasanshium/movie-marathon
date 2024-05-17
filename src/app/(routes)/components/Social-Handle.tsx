import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaWhatsappSquare } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { FaReddit } from "react-icons/fa";

const SocialHandle = () => {
    return ( 
        <div className="w-full  flex flex-row pt-12 justify-center  items-center gap-14 pb-12">
            <div className="hover:animate-bounce"><Link href="https://www.facebook.com/"><FaFacebook className="text-5xl text-blue-800"/></Link></div>
            <div className="hover:animate-bounce"><Link href="https://twitter.com/"><FaSquareXTwitter className="text-5xl text-black"/></Link></div>
            <div className="hover:animate-bounce"><Link href="https://web.whatsapp.com/"><FaWhatsappSquare className="text-5xl text-green-600"/></Link></div>
            <div className="hover:animate-bounce"><Link href="https://web.telegram.org/a/"><FaTelegram className="text-5xl text-blue-500"/></Link></div>
            <div className="hover:animate-bounce"><Link href="https://www.reddit.com/"><FaReddit className="text-5xl text-orange-600"/></Link></div>


        </div>
     );
}
 
export default SocialHandle;