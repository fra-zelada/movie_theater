import { useMovie } from "@/hooks";
import { IMovieDetails, IOrder } from "@/interfaces";
import { FC, useEffect, useState } from "react";
import QRCode from "react-qr-code";

interface PropsPurchasedTicket {
    order: IOrder;
    host: string;
}

export const PurchasedTicket: FC<PropsPurchasedTicket> = ({ order, host }) => {
    const { getMovieById } = useMovie();
    const [movie, setMovie] = useState<IMovieDetails>();
    useEffect(() => {
        const getMovie = async () => {
            const movieDetails = await getMovieById(`${order.imdbID}`);
            if (movieDetails.Response === "True") setMovie(movieDetails);
        };
        getMovie();
    }, [getMovieById, order.imdbID]);

    return (
        <div className="bg-slate-200 rounded-xl text-black my-4 p-3 mx-4 grid grid-cols-3 w-full xl:max-w-[65%] mt-2">
            <div className="col-span-1 flex justify-center items-center">
                <picture>
                    <img
                        src={movie?.Poster}
                        alt={movie?.Title}
                        className="rounded-xl max-h-52"
                    />
                </picture>
            </div>
            <div className="col-span-1">
                <div className="p-2">
                    <p className="text-md text-gray-500 font-bold">Movie</p>
                    <p className="text-md font-mono">{movie?.Title}</p>
                </div>
                <div className="p-2">
                    <p className="text-md text-gray-500 font-bold">
                        N° Tickets:
                    </p>
                    <div>
                        {order.ticketList.map((ticket) => {
                            if (ticket.quantity > 0)
                                return (
                                    <div className="grid grid-cols-2">
                                        <div className="font-mono">
                                            {ticket.type}:
                                        </div>
                                        <div>{ticket.quantity}</div>
                                    </div>
                                );
                        })}
                    </div>
                </div>
            </div>
            <div className="col-span-1 flex justify-center items-center flex-col">
                <QRCode
                    size={256}
                    className="h-28"
                    // style={{
                    //     height: "auto",
                    //     maxWidth: "100%",
                    //     width: "100%",
                    // }}
                    value={`${host}/ticket/${order.id}`}
                    // viewBox={`0 0 256 256`}
                />
                <p className="text-xs flex flex-row mt-2">{`Order: ${order.id}`}</p>
            </div>
        </div>
    );
};
