import { OrderContext } from "@/context/order";
import { IOrder, ITicketType } from "@/interfaces";
import {
    Dispatch,
    FC,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
} from "react";

interface SelectTicketsProps {
    ticketOrder: IOrder;
    setTicketOrder?: Dispatch<SetStateAction<IOrder>>;
}

export const SelectTickets: FC<SelectTicketsProps> = ({
    ticketOrder,
    setTicketOrder,
}) => {
    const { updateOrder } = useContext(OrderContext);

    const incrementTickets = useCallback(
        (type: ITicketType, value: number) => {
            const updatedTickets = ticketOrder.ticketList.map((tickets) => {
                if (tickets.type === type) {
                    return {
                        ...tickets,
                        quantity:
                            value < 0
                                ? Math.max(0, tickets.quantity + value)
                                : Math.min(12, tickets.quantity + value),
                        total:
                            (value < 0
                                ? Math.max(0, tickets.quantity + value)
                                : Math.min(12, tickets.quantity + value)) *
                            tickets.value,
                    };
                } else {
                    return tickets;
                }
            });
            const orderForUpdate = {
                ...ticketOrder,
                ticketList: updatedTickets,
                total: updatedTickets.reduce((totalSum, { total }) => {
                    return totalSum + total;
                }, 0),
            };

            if (!!orderForUpdate.id) {
                updateOrder(orderForUpdate);
            } else {
                setTicketOrder!!(orderForUpdate);
            }
        },
        [setTicketOrder, ticketOrder, updateOrder]
    );

    useEffect(() => {
        if (ticketOrder.id) updateOrder(ticketOrder);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ticketOrder]);

    return (
        <div>
            {ticketOrder.ticketList.map(({ type, value, quantity, total }) => (
                <div
                    key={type}
                    className="grid grid-cols-3 border-b-2 border-sky-900"
                >
                    <div className="flex flex-col justify-center min-content ">
                        <div className=" text-sm font-semibold">{type}</div>
                        <div className="font-sans text-sm">{`$${value}`}</div>
                    </div>
                    <div className="flex flex-row items-center justify-center px-2 mx-1 min-content">
                        <button
                            className="flex 
                            justify-center items-center  px-2 h-7 w-9 m-1 rounded-lg bg-slate-500 text-white font-bold hover:bg-slate-600 text-xl"
                            onClick={() => {
                                incrementTickets(type, -1);
                            }}
                        >
                            -
                        </button>
                        {quantity}
                        <button
                            className="flex 
                            justify-center items-center  px-2 h-7 w-9 m-1 rounded-lg bg-slate-500 text-white font-bold hover:bg-slate-600 text-xl"
                            onClick={() => {
                                incrementTickets(type, +1);
                            }}
                        >
                            +
                        </button>
                    </div>
                    <div className="flex items-center ml-1 min-content">
                        ${total}
                    </div>
                </div>
            ))}
            <div className="grid grid-cols-3">
                <div className="col-span-1"></div>
                <div className="col-span-1 flex justify-end pr-5">Total:</div>
                <div className="col-span-1 ml-1">{`$${ticketOrder.total}`}</div>
            </div>
        </div>
    );
};
