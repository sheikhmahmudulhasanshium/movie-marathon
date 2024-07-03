import Image from "next/image";
import Pinwheel from "../../../../public/images/pinwheel.png"

const Loading = () => {
    return ( 
        <div className="flex justify-center items-center min-h-screen">
            <Image src={Pinwheel} alt="loading..." className="animate-spin opacity-35" priority />
        </div>
     );
}
 
export default Loading;
