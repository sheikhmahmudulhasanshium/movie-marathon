const Suggestion = () => {
    return (  
        <div className=" flex flex-col py-14 w-fit justify-between ">
            <div className="text-3xl font-thin font-sans  text-start flex justify-start flex-1 flex-col">You may also like</div>
            <div className="grid grid-cols-4 pt-8 justify-center items-center gap-4">
                <div className="col-span-1 bg-slate-400 p-12">Card 1</div>
                <div className="col-span-1 bg-slate-400 p-12">Card 2</div>
                <div className="col-span-1 bg-slate-400 p-12">Card 3</div>
                <div className="col-span-1 bg-slate-400 p-12">Card 4</div>
                <div className="col-span-1 bg-slate-400 p-12">Card 1</div>
                <div className="col-span-1 bg-slate-400 p-12">Card 2</div>
                <div className="col-span-1 bg-slate-400 p-12">Card 3</div>
                <div className="col-span-1 bg-slate-400 p-12">Card 4</div>
                
            </div>
        </div>
    );
}
 
export default Suggestion;