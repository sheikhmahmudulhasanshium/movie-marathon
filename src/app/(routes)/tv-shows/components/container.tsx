"use client"
import { FC } from "react";
import { VscLoading } from "react-icons/vsc";
import Card from "../../components/Card";
import useSeries from "../../../../../actions/get-shows";

const Container: FC = () => {
    const shows = useSeries();
    const loading = shows.length === 0;

    if (loading) {
        return <div className="text-center py-12 flex text-slate-400  justify-center items-center">Please wait... <VscLoading className="animate-spin text-2xl"/></div>;
    }

    return (
        <div className=" flex flex-col justify-center items-center mt-12 pb-14">
            <div className="grid grid-cols-3 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-4">
                {shows.map((show, index) => (
                    <Card key={index} movie={show} />
                ))}
            </div>
        </div>
    );
};

export default Container;
