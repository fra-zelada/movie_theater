import { FC, PropsWithChildren, useReducer } from "react";
import { movieReducer, MovieContext } from "./";
import { IMovieDetails } from "@/interfaces";

export interface MovieState {
    showBuyTicketModal: boolean;
    movieInModal: IMovieDetails | undefined;
}

const MOVIE_INITIAL_STATE: MovieState = {
    showBuyTicketModal: false,
    movieInModal: undefined,
};

export const MovieProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(movieReducer, MOVIE_INITIAL_STATE);

    const openMovieModalForBuyTicket = (movieInModal: IMovieDetails) => {
        dispatch({ type: "[Movie] - Open Modal" });
        dispatch({
            type: "[Movie] - Set Movie Tickets",
            payload: movieInModal,
        });
    };
    const closeMovieModalForBuyTicket = () => {
        dispatch({ type: "[Movie] - Close Modal" });
    };
    return (
        <MovieContext.Provider
            value={{
                //   showBuyTicketModal: false
                openMovieModalForBuyTicket,
                closeMovieModalForBuyTicket,
                ...state,
            }}
        >
            {children}
        </MovieContext.Provider>
    );
};
