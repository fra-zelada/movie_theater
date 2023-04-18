import Head from "next/head";
import { FC, PropsWithChildren, useContext, useEffect, useState } from "react";
import NextLink from "next/link";
import { CartIcon, NotificationIcon, TicketIcon } from "../Icons";
import { OrderContext } from "@/context/order";

interface Props {
    title: string;

    url: string;
    image: string;
}

export const MovieLayout: FC<PropsWithChildren<Props>> = ({
    children,
    title,
    url,
    image,
}) => {
    const { getInCartOrders, showAddedToCart } = useContext(OrderContext);

    const orders = getInCartOrders();

    const MOVIE_BY_ID_PATH = process.env.NEXT_PUBLIC_MOVIE_BY_ID_PATH;

    return (
        <div className="flex flex-col min-h-screen">
            <Head>
                <title>{`${title} | Movie Theater - Tickets`}</title>
                {/* Meta description tag */}
                <meta
                    name="description"
                    content={`Get your movie tickets for ${title} with My-Movie-Theater.dev. Online tickets here!`}
                />
                {/* Meta Keywords */}
                <meta
                    name="keywords"
                    content={`movie tickets, cinema tickets, online tickets, theater tickets, ${title} tickets, tickets ${title}, movie tickets ${title}`}
                />
                {/* canonical tag */}
                <link rel="canonical" href={`${MOVIE_BY_ID_PATH}/${url}`} />
                {/* open graph tags */}
                <meta
                    property="og:title"
                    content={`Tickets ${title} My-Movie-Theater.dev`}
                />
                <meta
                    property="og:description"
                    content={`Get your movie tickets for ${title} with My-Movie-Theater.dev. Online tickets here!`}
                />
                <meta property="og:image" content={`${image}`} />
                <meta
                    property="og:url"
                    content={`${MOVIE_BY_ID_PATH}/${url}`}
                />
            </Head>
            <header>
                <nav className="fixed h-9 z-10 bg-emerald-900 w-screen font-semibold ">
                    <div className="flex h-9 justify-between items-center w-full px-[5%] xl:px-[25%] text-xl font-mono">
                        <NextLink
                            className="flex flex-row items-center justify-center gap-1"
                            href={"/"}
                        >
                            <div className="hover:bg-emerald-800 px-4 rounded-2xl">
                                Home
                            </div>
                        </NextLink>
                        <NextLink
                            className="flex flex-row items-center justify-center gap-1"
                            href={"/tickets"}
                        >
                            <div className="hover:bg-emerald-800 px-4 rounded-2xl flex flex-row items-center justify-center gap-1">
                                <TicketIcon className="h-7 stroke-white" />
                                <span className="hidden sm:inline">My</span>
                                Tickets
                            </div>
                        </NextLink>
                        <NextLink className="" href={"/cart"}>
                            <div className="group hover:bg-emerald-800 px-4 rounded-2xl flex flex-row items-center justify-center gap-1 relative">
                                <CartIcon className="h-7 stroke-white" /> Cart
                                {orders.status === "ok" &&
                                    (orders.order?.length || 0) > 0 && (
                                        <div
                                            className={`text-red-700  p-0 absolute -bottom-1 -left-0 ${
                                                showAddedToCart &&
                                                "animate-notification"
                                            } `}
                                        >
                                            <NotificationIcon className="h-5 stroke-white p-0 fill-red-700     " />
                                        </div>
                                    )}
                            </div>
                        </NextLink>
                    </div>
                </nav>
            </header>
            {showAddedToCart && (
                <div className="fixed top-0 left-1/2  z-50 m-4 p-4 bg-blue-700 text-white rounded-xl font-bold text-lg border-green-600 border-8 transform -translate-x-1/2 text-center duration-500 ease-in-out">
                    Added to Cart...
                </div>
            )}
            <main className="flex-1">
                <div className="mt-9 w-screen flex flex-col justify-center">
                    {children}
                </div>
            </main>
            <footer className="bg-gray-800 p-4 text-center mt-auto">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
                        <div>
                            <p className="text-gray-400">
                                <NextLink href={"/"}>Movie Theater</NextLink>
                            </p>
                        </div>
                        <div className="md:ml-auto lg:ml-auto">
                            <p className="text-gray-400">Contacto</p>
                            <p className="text-gray-400">
                                Teléfono: 123-456-7890
                            </p>
                            <p className="text-gray-400">
                                Email: info@mymovietheater.com
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};
