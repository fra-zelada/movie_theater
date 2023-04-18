export enum ITicketType {
    Child = "Child",
    Adult = "Adult",
    Senior = "Senior",
}

export interface ITicketTypeAndValue {
    type : ITicketType,
    value: number
}

export interface ITicketOrder {
    type: ITicketType,
    quantity : number,
    value: number
    total: number,
}