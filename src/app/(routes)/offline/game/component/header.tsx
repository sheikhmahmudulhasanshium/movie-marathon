"use client"
import { useRouter } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";

const Header = () => {
    const router = useRouter();

    const goBack = () => {
        router.push('/offline/');
    };

    return ( 
        <div className="flex justify-between items-center">
            <button onClick={goBack} className="mr-4 text-cyan-950 relative left-0">
                <BiArrowBack className="text-4xl"/>
            </button>
            <h1 className="text-6xl font-bold my-4 text-cyan-950">Snake Game</h1>
        </div>
     );
}
 
export default Header;
