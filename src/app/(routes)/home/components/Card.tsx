import Image from "next/image";
import Link from "next/link";
import SamplePoster from "../../../../../public/images/sample-poster.jpg"
const Card = () => {
    return ( 
        <div className="flex flex-col rounded-lg col-span-1 bg-slate-500 m-2 hover:opacity-85">
            <Link href="/" >
             {/**Quality in HD/4K/3D  */}
             <p className="border rounded-sm absolute ml-8 mt-4 font-bold text-yellow-500">HD</p>
            <Image src={SamplePoster} alt="Poster" height="400" width="300" className="rounded-t-xl"/>
            <p className="text-2xl text-center">Movie / Show Title</p>
            <div className="flex justify-between gap-4 items-center p-4">
                {/**Release in Soon/Release year */}
                <p>2024</p>
                {/**Type in Movie/Tv Show */}
                <p className=" border rounded-sm">Movie</p>

            </div></Link>
               
  
        </div>
     );
}
 
export default Card;