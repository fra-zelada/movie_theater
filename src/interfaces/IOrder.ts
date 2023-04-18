import { ITicketOrder } from "./";


type IOrderState = 'inCart' | 'paid' | 'preparing';

export interface IOrder {
    id?: number,
    state: IOrderState,
    imdbID: string,
    total: number,
    ticketList: ITicketOrder[]
}

