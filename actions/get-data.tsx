"use client"
import { setDefaultValues } from "../data/utils";
import { Movie } from "../type";

const GetData = async (): Promise<Movie[]> => {
    let allMovies: Movie[] = [];
    for (let page = 1; page <= 100; page++) {
        const response = await fetch(`https://www.omdbapi.com/?apikey=fa8c7f7d&s=man&page=${page}`);
        const data = await response.json();
        if (data.Search) {
            const moviesWithDefaults = data.Search.map((movie: any) => setDefaultValues(movie));
            allMovies = [...allMovies, ...moviesWithDefaults];
        } else {
            break;
        }
    }
    return allMovies;
}

export default GetData;
