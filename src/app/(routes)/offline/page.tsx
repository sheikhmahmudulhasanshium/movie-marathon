"use client";

import { FaFrown } from 'react-icons/fa';
import Header from "../components/Header";
import { TbWorldOff } from 'react-icons/tb';
import { GiSnake, GiTBrick, GiTicTacToe } from 'react-icons/gi';
import { useRouter } from 'next/navigation';

const Offline = () => {
    const router = useRouter();

    return ( 
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 dark:bg-slate-950 p-12">
           {/* <Header/>*/}
            <div className="flex flex-col mt-12 p-8 justify-center items-center text-center bg-white dark:bg-slate-800 shadow-md rounded-lg">
                <TbWorldOff className="text-8xl text-gray-500 dark:text-gray-300 mb-4"/>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">You are currently offline</h1>
                <FaFrown className="text-3xl text-yellow-500 mb-4"/>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">Feeling bored without your favorite shows?</p>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">Play a game while you wait to reconnect:</p>
                <div className="flex space-x-4 text-xl text-cyan-950 dark:text-cyan-300">
                    <button onClick={() => router.push('/offline/game/snake-2d')} className="flex items-center px-4 py-2 bg-white dark:bg-gray-700 text-green-950 dark:text-green-300 rounded hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-300">
                        <GiSnake className="mr-2"/> Snake 2D
                    </button>
                    <button onClick={() => router.push('/offline/game/tetris')} className="flex items-center px-4 py-2 bg-white dark:bg-gray-700 text-green-950 dark:text-green-300 rounded hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-300">
                        <GiTBrick className="mr-2"/> Tetris
                    </button>
                    <button onClick={() => router.push('/offline/game/tick-tac-toe')} className="flex items-center px-4 py-2 bg-white dark:bg-gray-700 text-green-950 dark:text-green-300 rounded hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-300">
                        <GiTicTacToe className="mr-2"/> Tic-Tac-Toe
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Offline;
