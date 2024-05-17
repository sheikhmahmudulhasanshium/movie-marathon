// pages/index.js

import Footer from "../components/Footer";
import Body from "./components/Body";

const Home = () => {
    return (
            <div className="w-screen min-h-max flex flex-col justify-between items-center">
                <Body/>
                <Footer />
            </div>
    );
};

export default Home;
