"use client"
import { useEffect, useState } from "react";
import GetData from "./get-data"; // Assuming this is the correct path to your GetData function
import { Movie } from "../type";

const GetMovies = () => {
    // Declare state for movies
    const [movies, setMovies] = useState<Movie[]>([]);

    // Fetch movies when component mounts
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                // Call your function to fetch movies
                const data = await GetData();
                // Filter out only the movies
                const allMovies = data.filter(movie => movie.Type === "movie");
                // Set the filtered movies to state
                setMovies(allMovies);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies(); // Call the fetchMovies function
    }, []); // Empty dependency array ensures this effect runs only once on component mount

    // Return the movies
    return movies;
}

export default GetMovies;
