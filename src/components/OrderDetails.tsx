import { useMovie } from "@/hooks";
import { IMovieDetails, IOrder } from "@/interfaces";
import { FC, SetStateAction, useContext, useEffect, useState } from "react";
import { SelectTickets } from "./";
import { OrderContext } from "@/context/order";
import { useRouter } from "next/router";

interface OrderDetailsProps {
    order: IOrder;
}

export const OrderDetails: FC<OrderDetailsProps> = ({ order }) => {
    const router = useRouter();
    const { getMovieById } = useMovie();

    const [movie, setMovie] = useState<IMovieDetails>();

    const { paidOrder, removeOrder } = useContext(OrderContext);

    const handleRemoveOrder = () => {
        removeOrder(order);
    };

    const handlePaidOrder = () => {
        const { status } = paidOrder(order);
        if (status === "paid") {
            router.push(`/ticket/${order.id}`);
        }
    };

    useEffect(() => {
        const getMovie = async () => {
            const movieDetails = await getMovieById(`${order.imdbID}`);
            if (movieDetails.Response === "True") setMovie(movieDetails);
        };
        getMovie();
    }, [getMovieById, order.imdbID]);

    return (
        <div className="xl:w-[75%] w-[95%] bg-slate-200 text-sky-950 m-1 flex flex-row p-2 rounded-xl  ">
            <div className="flex justify-center items-center w-auto">
                <picture className="flex justify-center items-center pr-3">
                    <img
                        src={movie?.Poster}
                        alt={movie?.Title}
                        className="max-h-56 rounded-md"
                    />
                </picture>
            </div>
            <div className="flex flex-col justify-center items-center w-full">
                <div className="row-start-1 col-start-1 flex flex-col justify-center items-center h-8 font-semibold my-2 xl:text-lg pb-2 text-center">
                    <p>{movie?.Title}</p>
                </div>
                <div className="flex xl:flex-row flex-col">
                    <div className="row-start-2 col-start-1  px-4 w-full 	">
                        <SelectTickets ticketOrder={order} />
                    </div>
                    <div className="row-start-2 col-start-2 ml-2 grid  w-full">
                        <div className="col-span-1 flex flex-col  justify-center items-center">
                            <button
                                className="bg-blue-700 text-white font-semibold p-4 rounded-xl hover:bg-blue-800 w-full mr-1"
                                onClick={handlePaidOrder}
                            >
                                Confirm Purchase
                            </button>
                            <button
                                className="bg-white text-red-600 font-semibold px-2 rounded-xl hover:bg-gray-100 hover:border-red-600 m-2 border-2 border-red-900"
                                onClick={handleRemoveOrder}
                            >
                                Remove Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
