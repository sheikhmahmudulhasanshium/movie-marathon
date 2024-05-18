import Card from "./Card";

const Content = () => {
    return ( 
    <div className=" pb-12 " >
        <div className="grid sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 grid-cols-2 w-full max-w-screen-lg ">
            <Card/><Card/><Card/><Card/><Card/><Card/>
        </div>
        
    </div>
     );
}
 
export default Content;