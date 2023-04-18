import {
    FC,
    PropsWithChildren,
    useCallback,
    useEffect,
    useReducer,
} from "react";
import { orderReducer, OrderContext } from "./";
import { IOrder } from "@/interfaces";

export interface OrderState {
    cart: IOrder[] | [];
    showAddedToCart: boolean;
}

const ORDER_INITIAL_STATE: OrderState = {
    cart: [],
    showAddedToCart: false,
};

export type statusType = "ok" | "error";

export const OrderProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(orderReducer, ORDER_INITIAL_STATE);

    const addToCart = useCallback((order: IOrder) => {
        const newOrder: IOrder = {
            ...order,
            id: Date.now(),
        };
        dispatch({ type: "[Order] - Add to Cart", payload: newOrder });
        showAddedToCartNotification();
        return newOrder;
    }, []);

    const showAddedToCartNotification = () => {
        dispatch({ type: "[Order] - Show Added to Cart Notification" });
        setTimeout(() => {
            dispatch({ type: "[Order] - Hide Added to Cart Notification" });
        }, 3000);
    };

    const updateOrder = useCallback(
        (order: IOrder) => {
            const updatedCart: IOrder[] = state.cart.map((cart) => {
                if (order.id === cart.id) return order;
                return cart;
            });
            dispatch({ type: "[Order] - Update Cart", payload: updatedCart });
        },
        [state.cart]
    );

    const paidOrder = useCallback(
        (order: IOrder) => {
            try {
                const updatedCart: IOrder[] = state.cart.map((cart) => {
                    if (order.id === cart.id)
                        return { ...order, state: "paid" };
                    return cart;
                });

                dispatch({
                    type: "[Order] - Paid Order",
                    payload: updatedCart,
                });
                return { status: "paid" };
            } catch (error) {
                return { status: "error" };
            }
        },
        [state.cart]
    );

    const getOrderById = useCallback(
        (id: string) => {
            try {
                const order = state.cart.find(
                    (tickets) => tickets.state === "paid" && tickets.id === +id
                );
                if (!order) throw new Error("not found");

                return { status: "ok", order: order as IOrder };
            } catch (error) {
                return { status: "error" };
            }
        },
        [state.cart]
    );

    const getPaidOrders = useCallback(() => {
        try {
            const order = state.cart.filter(
                (tickets) => tickets.state === "paid"
            );
            if (!order) throw new Error("not found");

            return { status: "ok", order: order as IOrder[] };
        } catch (error) {
            return { status: "error" };
        }
    }, [state.cart]);

    const getInCartOrders = useCallback(() => {
        try {
            const order = state.cart.filter(
                (tickets) => tickets.state === "inCart"
            );
            if (!order) throw new Error("not found");

            return { status: "ok" as statusType, order: order as IOrder[] };
        } catch (error) {
            return { status: "error" as statusType };
        }
    }, [state.cart]);

    const reloadCart = useCallback(() => {
        try {
            const localCart = localStorage.getItem("cart");
            const localCartParsed: IOrder[] | [] = JSON.parse(
                localCart || "[]"
            );
            if (localCartParsed as IOrder[])
                dispatch({
                    type: "[Order] - Reload local Cart",
                    payload: localCartParsed,
                });
        } catch (error) {}
    }, []);

    const removeOrder = useCallback(
        (order: IOrder) => {
            const updatedCart: IOrder[] = state.cart.filter((cart) => {
                if (order.id !== cart.id) return order;
            });
            dispatch({ type: "[Order] - Remove Order", payload: updatedCart });
            if (updatedCart.length === 0) localStorage.removeItem("cart");
        },
        [state.cart]
    );

    useEffect(() => {
        reloadCart();
    }, [reloadCart]);

    useEffect(() => {
        if (state.cart.length !== 0) {
            localStorage.setItem("cart", JSON.stringify(state.cart));
        }
    }, [state.cart]);

    return (
        <OrderContext.Provider
            value={{
                //   cart: []
                ...state,
                addToCart,
                updateOrder,
                removeOrder,
                paidOrder,
                getOrderById,
                getPaidOrders,
                getInCartOrders,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
};
