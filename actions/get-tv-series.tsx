"use client"
import { useEffect, useState } from "react";
import GetData from "./get-data"; // Adjust the path as needed
import { Movie } from "../type";

const useSeries = () => {
    const [series, setSeries] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchSeries = async () => {
            try {
                const data = await GetData();
                const allSeries = data.filter(movie => movie.Type === "series");
                setSeries(allSeries);
            } catch (error) {
                console.error("Error fetching series:", error);
            }
        };

        fetchSeries();
    }, []);

    return series;
};

export default useSeries;
