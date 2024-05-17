import Link from "next/link";
import { FaArrowCircleRight } from "react-icons/fa";

const FullSite = () => {
    return (
    <div className="w-full ">
        <Link href="/home">     
        <div className="flex text-xl justify-center items-center gap-4 bg-cyan-950  p-4 rounded-lg my-5 hover:bg-opacity-70 ">
                <p>View Full Site</p>
                <FaArrowCircleRight />
        </div>
        </Link>
    </div>
     );
}
 
export default FullSite;