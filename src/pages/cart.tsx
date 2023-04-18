import { CartIcon } from "@/components";

import { OrderDetails } from "@/components/OrderDetails";
import { MainLayout } from "@/components/layout";

import { OrderContext } from "@/context/order";
import { IOrder } from "@/interfaces";
import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";

const CartPage: NextPage = () => {
    const { getInCartOrders } = useContext(OrderContext);

    const [cart, setCart] = useState<IOrder[]>([]);

    useEffect(() => {
        const resp = getInCartOrders();
        if (resp.status === "ok") {
            setCart(resp.order!!);
        }
    }, [getInCartOrders]);

    return (
        <MainLayout>
            <div className="bg-purple-950 border-b border-b-white shadow-slate-500 shadow-sm rounded-sm flex justify-center py-10 items-center text-5xl mb-5">
                My Cart <CartIcon className="stroke-white ml-2 h-[55px]" />
            </div>
            <div className="flex justify-center items-center  w-full my-2">
                <div className="flex flex-col xl:w-[60%] w-[90%]  justify-center items-center border-2 border-sky-900 bg-sky-950 rounded-lg shadow-xl p-4">
                    {cart.map((cart) => (
                        <OrderDetails key={cart.id} order={cart} />
                    ))}
                </div>
            </div>
        </MainLayout>
    );
};

export default CartPage;
