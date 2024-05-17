import Card from "./Card";

const Content = () => {
    return ( 
    <div className="flex flex-col w-full gap-4 justify-center items-center pb-12">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            <Card/><Card/><Card/><Card/><Card/><Card/>
        </div>
        
    </div>
     );
}
 
export default Content;