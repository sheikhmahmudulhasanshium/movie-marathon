import SnakeGame from "../component/game";
import Header from "../component/header";

const Game = () => {
    return ( 
        <main className="flex justify-between items-center flex-col pt-4 " >
        <Header/>
        <SnakeGame/>
      </main>
  
     );
}
 
export default Game;