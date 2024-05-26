export interface Movie {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: { Source: string; Value: string }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export interface ErrorResponse {
  Response: string;
  Error: string;
}

export type MovieResponse = Movie | ErrorResponse;
export type SeriesResponse = Movie | ErrorResponse;

export const Genres = [
  "Action",
  "Drama",
  "Sci-Fi",
  "Fantasy",
  "Superhero",
  "Crime",
  "Comedy",
  "Animation",
  "Horror",
  "Mystery",
  "Thriller",
  "Biography",
  "Romance",
  "Adventure",
  "Reality",
  "Sports",
  "Historical",
  "Music"
];
export const Countries = [
  "USA", "UK", "Canada", "Australia", "France", "Germany",
  "India", "Japan", "South Korea", "China"
];