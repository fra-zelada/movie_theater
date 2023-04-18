import { IMovieDetails } from '@/interfaces';
import { MovieState } from '.';

type MovieActionType = 
 | { type: '[Movie] - Open Modal' } | { type: '[Movie] - Close Modal' } | {type: '[Movie] - Set Movie Tickets', payload: IMovieDetails};

export const movieReducer = ( state: MovieState, action: MovieActionType ): MovieState => {

    switch (action.type) {
        case '[Movie] - Open Modal':
            return {
                ...state,
                showBuyTicketModal: true
            };
        case '[Movie] - Close Modal':
            return {
                ...state,
                movieInModal: undefined,
                showBuyTicketModal: false
            };
        case '[Movie] - Set Movie Tickets' :
            return {
                ...state,
                movieInModal: action.payload
            }

         default:
             return state;
     }

}