import { IMovieDetails } from "@/interfaces";
import { createContext } from "react";

interface ContextProps {
    showBuyTicketModal: boolean;
    movieInModal: IMovieDetails | undefined;
    openMovieModalForBuyTicket: (movieInModal: IMovieDetails) => void;
    closeMovieModalForBuyTicket: () => void;
}

export const MovieContext = createContext({} as ContextProps);
