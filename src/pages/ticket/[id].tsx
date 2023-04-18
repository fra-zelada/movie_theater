import { PurchasedTicket } from "@/components";
import { MainLayout } from "@/components/layout";

import { OrderContext } from "@/context/order";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useContext } from "react";

interface TicketPageByIdProps {
    host: string;
}

const TicketPageById: NextPage<TicketPageByIdProps> = ({ host }) => {
    const router = useRouter();

    const { id = "0" } = router.query;

    const { getOrderById } = useContext(OrderContext);
    const resp = getOrderById(`${id}`);

    return (
        <MainLayout>
            {resp.status === "ok" && (
                <div className="flex flex-col justify-center items-center">
                    <PurchasedTicket order={resp.order!!} host={host} />
                </div>
            )}
        </MainLayout>
    );
};

export default TicketPageById;
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const host = ctx.req.headers.host || "";

    return {
        props: { host },
    };
};
