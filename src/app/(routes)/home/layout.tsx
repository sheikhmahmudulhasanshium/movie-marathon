// components/Layout.js

import Header from "./components/Header";
import SideNav from "./components/SideNav";

export default function Layout({ children }:{children:React.ReactNode}) {
    return (
        <div className="flex flex-col justify-between  min-h-screen  ">
            <div className="flex">
                <SideNav />
                <Header /> {/* Include Header if needed */}
            </div>
            <div className="">{children}</div>
        </div>
    );
}
