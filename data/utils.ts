import { Movie } from "../type";  // Adjust the import path as needed

export const setDefaultValues = (movie: any): Movie => {
    return {
        Title: movie.Title || "N/A",
        Year: movie.Year || "N/A",
        Rated: movie.Rated || "N/A",
        Released: movie.Released || "N/A",
        Runtime: movie.Runtime || "N/A",
        Genre: movie.Genre || "N/A",
        Director: movie.Director || "N/A",
        Writer: movie.Writer || "N/A",
        Actors: movie.Actors || "N/A",
        Plot: movie.Plot || "N/A",
        Language: movie.Language || "N/A",
        Country: movie.Country || "N/A",
        Awards: movie.Awards || "N/A",
        Poster: movie.Poster || "N/A",
        Ratings: movie.Ratings || [{ Source: "N/A", Value: "N/A" }],
        Metascore: movie.Metascore || "N/A",
        imdbRating: movie.imdbRating || "N/A",
        imdbVotes: movie.imdbVotes || "N/A",
        imdbID: movie.imdbID || "N/A",
        Type: movie.Type || "N/A",
        DVD: movie.DVD || "N/A",
        BoxOffice: movie.BoxOffice || "N/A",
        Production: movie.Production || "N/A",
        Website: movie.Website || "N/A",
        Response: movie.Response || "N/A",
    };
}
