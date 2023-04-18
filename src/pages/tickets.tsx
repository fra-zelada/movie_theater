import { PurchasedTicket } from "@/components/PurchasedTicket";
import { MainLayout } from "@/components/layout";

import { OrderContext } from "@/context/order";
import { IOrder } from "@/interfaces";
import { GetServerSideProps, NextPage } from "next";
import { useContext, useEffect, useState } from "react";

interface TicketsPageProps {
    host: string;
}

const TicketsPage: NextPage<TicketsPageProps> = ({ host }) => {
    const { getPaidOrders } = useContext(OrderContext);

    const [tickets, setTickets] = useState<IOrder[]>([]);

    useEffect(() => {
        const resp = getPaidOrders();
        if (resp.status === "ok") setTickets(resp.order!!);
    }, [getPaidOrders]);

    return (
        <MainLayout>
            <div className="flex justify-center items-center  w-screen my-2  ">
                <div className="flex flex-col xl:w-[60%] w-screen  justify-center items-center border-2 border-sky-900 bg-sky-950 rounded-lg shadow-xl p-4">
                    {tickets.map((ticket) => (
                        <PurchasedTicket
                            key={ticket.id}
                            order={ticket}
                            host={host}
                        />
                    ))}
                </div>
            </div>
        </MainLayout>
    );
};

export default TicketsPage;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const host = ctx.req.headers.host || "";

    return {
        props: { host },
    };
};
