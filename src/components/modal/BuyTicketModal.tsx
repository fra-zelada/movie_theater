import { useContext, useEffect, useState } from "react";
import { ModalLayout } from "./ModalLayout";
import { MovieContext } from "@/context/movie";
import DATA_TICKET_VALUES from "../../db/tickets.json";
import { IOrder, ITicketType, ITicketTypeAndValue } from "@/interfaces/";
import { OrderContext } from "@/context/order";
import { AddToCartIcon, CloseIcon, SelectTickets } from "../";

const TICKET_TYPES = Object.values(ITicketType);

const ticket_values = DATA_TICKET_VALUES.filter(({ type }) =>
    TICKET_TYPES.includes(type as ITicketType)
) as ITicketTypeAndValue[];

export const BuyTicketModal = (args: any) => {
    const { showBuyTicketModal, movieInModal, closeMovieModalForBuyTicket } =
        useContext(MovieContext);

    const { addToCart } = useContext(OrderContext);

    const ticketsDefaultQuantity = ticket_values.map(({ type, value }) => {
        return {
            type,
            value,
            quantity: 0,
            total: 0,
        };
    });

    let TICKETS_SELECTED_INITIAL_STATE: IOrder = {
        imdbID: movieInModal!.imdbID,
        ticketList: ticketsDefaultQuantity,
        state: "preparing",
        total: 0,
    };

    const [ticketOrder, setticketOrder] = useState(
        TICKETS_SELECTED_INITIAL_STATE
    );
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setShowModal(!!showBuyTicketModal);
    }, [showBuyTicketModal]);

    if (!showBuyTicketModal) {
        return <div>Loading...</div>;
    }

    const handleAddToCart = () => {
        const newOrder: IOrder = {
            imdbID: ticketOrder.imdbID,
            state: "inCart",
            ticketList: ticketOrder.ticketList,
            total: ticketOrder.ticketList.reduce((totalSum, { total }) => {
                return totalSum + total;
            }, 0),
        };
        addToCart(newOrder);
        closeMovieModalForBuyTicket();
    };

    return (
        <ModalLayout closeModal={closeMovieModalForBuyTicket}>
            <div
                className={`${
                    showModal ? "scale-100" : "scale-0"
                } transform duration-300 flex flex-row bg-slate-200 xl:w-[50%] min-h-[30%]  items-center rounded-md`}
            >
                <div>
                    <picture>
                        <img
                            className="rounded-xl p-2"
                            src={movieInModal?.Poster}
                            alt={movieInModal?.Title}
                        />
                    </picture>
                </div>

                <div className="text-black p-2 flex xl:flex-row flex-col h-full ">
                    <div>
                        <h2 className="">Tickets</h2>

                        <h3 className="mb-5 text-center xl:text-left">
                            {movieInModal?.Title}
                        </h3>
                        <div className="">
                            <SelectTickets
                                ticketOrder={ticketOrder}
                                setTicketOrder={setticketOrder}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col justify-center items-center p-2">
                        <button
                            className={`px-4 h-12 w-full m-2 rounded-lg bg-blue-700 text-white font-semibold  ${
                                ticketOrder.total === 0
                                    ? "hover:cursor-not-allowed"
                                    : "hover:bg-blue-800"
                            }`}
                            onClick={handleAddToCart}
                            disabled={ticketOrder.total === 0}
                        >
                            <p className="flex justify-center items-center">
                                Add to Cart
                                <AddToCartIcon className="  stroke-white h-7 " />
                            </p>
                        </button>
                    </div>
                </div>
                <div
                    className="absolute top-1 right-1"
                    onClick={closeMovieModalForBuyTicket}
                >
                    <CloseIcon className="cursor-pointer hover:fill-slate-300" />
                </div>
            </div>
        </ModalLayout>
    );
};
