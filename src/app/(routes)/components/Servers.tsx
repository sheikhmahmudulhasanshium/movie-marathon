import { FaPlay } from "react-icons/fa";
import { serverList } from "../../../../type";

interface ServerProps {
    imdbID: string | null;
    selectedServer: number;
    onSelectServer: (index: number) => void;
}

const Servers: React.FC<ServerProps> = ({ selectedServer, onSelectServer }) => {

    return (
        <div className="flex flex-col justify-between items-center bg-slate-600 dark:bg-slate-950 text-cyan-950 dark:text-white md:w-max sm:w-max w-max lg:w-max p-12 bg-opacity-5 dark:bg-opacity-15 rounded-lg">
            <p className="text-center text-lg mb-4">
                If current server doesn&apos;t work please try other servers below.
            </p>
            <div className="grid grid-cols-3 justify-center items-center gap-12 py-2 m-2">
                {serverList.map((server, index) => (
                    <div
                        key={index}
                        className={`flex rounded-xl ${
                            selectedServer === index
                                ? "bg-opacity-20 bg-cyan-500"
                                : "bg-slate-500"
                        } p-3 justify-center items-center gap-2`}
                    >
                        <div
                            className="flex justify-center items-center gap-3"
                            onClick={() => onSelectServer(index)}
                        >
                            <FaPlay className="text-3xl" />
                            <div className="flex flex-col">
                                <p className="text-lg font-thin">Server</p>
                                <p className="text-xl">{server}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Servers;
