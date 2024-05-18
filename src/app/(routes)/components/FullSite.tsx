import Link from "next/link";
import { FaArrowCircleRight } from "react-icons/fa";

const FullSite = () => {
    return (
    <div className="w-full sm:w-screen md:w-full lg:w-full px-16">
        <Link href="/home">     
        <div className="flex text-4xl sm:text-lg md:xl lg:text-2xl justify-center items-center gap-4 bg-cyan-950  p-4 rounded-lg my-5 hover:bg-opacity-70 text-white">
                <p>View Full Site</p>
                <FaArrowCircleRight />
        </div>
        </Link>
    </div>
     );
}
 
export default FullSite;