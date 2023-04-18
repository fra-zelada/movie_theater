import Head from "next/head";
import { FC, PropsWithChildren, useContext, useEffect, useState } from "react";
import NextLink from "next/link";
import { CartIcon, NotificationIcon, TicketIcon } from "../Icons";
import { OrderContext } from "@/context/order";

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
    const { getInCartOrders } = useContext(OrderContext);
    const [animate, setAnimate] = useState(false);
    const orders = getInCartOrders();

    useEffect(() => {
        setTimeout(() => {
            setAnimate(true);
        }, 3000);
    }, [orders]);

    return (
        <div className="flex flex-col min-h-screen">
            <Head>
                <title>Movie Theater</title>
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
                                                animate &&
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
