"use client"
import { setDefaultValues } from "../data/utils";
import { Movie } from "../type";

const fetchMovieOrSeriesDetails = async (title: string): Promise<Movie | null> => {
    const response = await fetch(`https://www.omdbapi.com/?apikey=fa8c7f7d&t=${encodeURIComponent(title)}`);
    const data = await response.json();
    if (data.Response === "True") {
        return setDefaultValues(data);
    } else {
        console.error(`Error fetching details for ${title}:`, data.Error);
        return null;
    }
};

const GetData = async (): Promise<Movie[]> => {
    const titles = [
        "Top Gun: Maverick",
        "Black Panther: Wakanda Forever",
        "Avatar: The Way of Water",
        "Jurassic World: Dominion",
        "The Batman",
        "Minions: The Rise of Gru",
        "Nope",
        "Elvis",
        "Everything Everywhere All At Once",
        "Don't Worry Darling",
        "Bros",
        "The Northman",
        "Bullet Train",
        "Halloween Ends",
        "The Woman King",
        "Bones and All",
        "The Fabelmans",
        "Triangle of Sadness",
        "The Lost City",
        "Top Gun",
        "Spider-Man: No Way Home",
        "Uncharted",
        "Doctor Strange in the Multiverse of Madness",
        "The Bad Guys",
        "The Batman",
        "Downton Abbey: A New Era",
        "Ambulance",
        "Death on the Nile",
        "The Lost City",
        "Father Stu",
        "Memory",
        "Fantastic Beasts: The Secrets of Dumbledore",
        "The Northman",
        "Smoke & Mirrors",
        "Smile",
        "Firestarter",
        "The Inspection",
        "Babylon",
        "White Bird: A Wonder Story",
        "Ticket to Paradise",
        "Wendell & Wild",
        "House of the Dragon",
        "Stranger Things",
        "The Rings of Power",
        "Abbott Elementary",
        "Andor",
        "Better Call Saul",
        "The White Lotus",
        "Reservation Dogs",
        "The Dropout",
        "Ozark",
        "Severance",
        "Barry",
        "The Rehearsal",
        "The Bear",
        "We Own This City",
        "Atlanta",
        "Obi-Wan Kenobi",
        "The Staircase",
        "Winning Time",
        "The Last of Us",
        "The Old Man",
        "The Umbrella Academy",
        "The English",
        "A League of Their Own",
        "Under the Banner of Heaven",
        "Pachinko",
        "Black Bird",
        "Physical",
        "Tokyo Vice",
        "Hacks",
        "Pam & Tommy",
        "Yellowjackets",
        "The First Lady",
        "The Patient",
        "Gaslit",
        "The Flight Attendant",
        "The Woman in the House Across the Street from the Girl in the Window"
        ];

    const promises = titles.map(title => fetchMovieOrSeriesDetails(title));
    const results = await Promise.all(promises);
    console.log(results)
    return results.filter(result => result !== null) as Movie[];
};

export default GetData;
