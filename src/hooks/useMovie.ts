import { IMovieDetails } from "@/interfaces";
import { useCallback } from "react";

export const useMovie = () => {
    

    const getMovieById = useCallback(
         async ( imdbID : string ) => {
            
            const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;
            
            const resp = await fetch(
                    `https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`
                );
            const movie = (await resp.json()) as IMovieDetails;
            
            return movie;
            
        },
        [],
    )

    // const getMovieById = async  ( imdbID : string ) => {
            
    //     const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;
    //     const resp = await fetch(
    //             `https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`
    //         );
    //     const movie = (await resp.json()) as IMovieDetails;
    //     return movie;
        
    // };
    
    return {
        getMovieById
    }
    }
