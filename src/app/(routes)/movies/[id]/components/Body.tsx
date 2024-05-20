import Image from "next/image";
import SamplePic from "../../../../../../public/images/sample-poster.jpg";
import { BiSolidVideo } from "react-icons/bi";

const Body = () => {
    return (
        <div className="relative flex flex-col  justify-center items-center w-full h-screen mt-12">
            {/* Background image with opacity */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-75 justify-center items-center"
                style={{
                    backgroundImage: `url(${SamplePic.src})`
                }}
            ></div>
            {/* Content on top of the background */}
            <div className="relative flex   gap-4 space-x-2 p-4">
                <div className="rounded-xl">
                    <Image src={SamplePic} alt="poster" height={200} width={200} className="rounded-xl" />
                </div>
                <div className="flex-1 flex flex-col justify-between items-start">
                    <p className="text-4xl text-white font-thin font-sans">Movie/ Series Title</p>
                    <div className="flex pt-4 gap-4 items-center">
                        <div className="bg-white text-black flex rounded-lg justify-center items-center p-1 gap-x-2 text-lg font-thin">
                            <p>Trailer</p>
                            <BiSolidVideo className="text-2xl" />
                        </div>
                        {/** Quality */}
                        <div className="border border-white p-1 bg-cyan-950 bg-opacity-30 flex text-white m-1 rounded-md">HD</div>
                        {/** IMDB Rating */}
                        <p className="text-orange-400 text-lg">IMDB: 9</p>
                    </div>
                    {/** Description */}
                    <div className="text-base text-white mt-3 space-y-4">
                        {/** Plot */}
                        <p className="text-justify">Here the plot will be explained. It might be long. But it will be summarized eventually. The average plot length should be calculated.</p>
                        <div className="flex gap-2">
                            <p className="font-bold">Released:</p>
                            <p>20-May-2024</p>
                        </div>
                        <div className="flex gap-2">
                            <p className="font-bold">Genre:</p>
                            <p>Genre1, Genre2, Genre3, & Genre4</p>
                        </div>
                        <div className="flex gap-2">
                            <p className="font-bold">Casts:</p>
                            <p>Actor1, Actor2, Actor3, Actor4, ...</p>
                        </div>
                        <div className="flex gap-2">
                            <p className="font-bold">Country:</p>
                            <p>United States of America</p>
                        </div>
                        <div className="flex gap-2">
                            <p className="font-bold">Production:</p>
                            <p>Company1 , Company 2</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Body;
