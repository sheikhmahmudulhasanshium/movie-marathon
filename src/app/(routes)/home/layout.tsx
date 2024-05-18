// components/Layout.js

import Footer from "../components/Footer";
import Header from "./components/Header";
import SideNav from "./components/SideNav";

export default function Layout({ children }:{children:React.ReactNode}) {
    return (
        <div className="flex flex-col justify-between   w-max sm:full md:w-screen lg:w-screen ">
            <div className="flex ">
                <SideNav />
                <Header />
            </div>
            {children}
            <Footer/>
        </div>
    );
}
