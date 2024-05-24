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
        "Avatar: The Way of Water",
        "Jurassic World: Dominion",
        "The Batman",
        "Black Panther: Wakanda Forever",
        "Thor: Love and Thunder",
        "Minions: The Rise of Gru",
        "Everything Everywhere All at Once",
        "Nope",
        "The Fabelmans",
        "Glass Onion: A Knives Out Mystery",
        "Tár",
        "The Whale",
        "Bones and All",
        "RRR",
        "Decision to Leave",
        "The Banshees of Inisherin",
        "Elvis",
        "Bros",
        "Triangle of Sadness",
        "She Said",
        "Armageddon Time",
        "Emily the Criminal",
        "Ticket to Paradise",
        "Mrs. Harris Goes to Paris",
        "Puss in Boots: The Last Wish",
        "Amsterdam",
        "Don't Worry Darling",
        "The Northman",
        "Bardo, False Chronicle of a Handful of Truths",
        "The Son",
        "The Woman King",
        "My Policeman",
        "Till",
        "Black Adam",
        "Halloween Ends",
        "Pearl",
        "White Noise",
        "The Good Nurse",
        "Babylon",
        "Living",
        "The Menu",
        "Causeway",
        "No Bears",
        "The Eternal Daughter",
        "Holy Spider",
        "House of the Dragon",
        "The Lord of the Rings: The Rings of Power",
        "Andor",
        "Stranger Things",
        "Abbott Elementary",
        "The White Lotus",
        "Severance",
        "Yellowjackets",
        "The Bear",
        "Better Call Saul",
        "Ozark",
        "Reservation Dogs",
        "The Rehearsal",
        "The Patient",
        "The Old Man",
        "Slow Horses",
        "The Dropout",
        "The Staircase",
        "Pachinko",
        "The Gilded Age",
        "Winning Time: The Rise of the Lakers Dynasty",
        "Barry",
        "Gaslit",
        "Dark Winds",
        "Poker Face",
        "Obi-Wan Kenobi",
        "The First Lady",
        "Welcome to Chippendales",
        "Shrinking",
        "Daisy Jones & The Six",
        "The Watcher"
    ];

    const promises = titles.map(title => fetchMovieOrSeriesDetails(title));
    const results = await Promise.all(promises);
    return results.filter(result => result !== null) as Movie[];
};

export default GetData;
