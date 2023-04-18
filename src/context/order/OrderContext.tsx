import { IOrder } from "@/interfaces";
import { createContext } from "react";
import { statusType } from ".";

interface ContextProps {
    cart: IOrder[] | [];
    showAddedToCart: boolean;
    addToCart: (order: IOrder) => IOrder;
    updateOrder: (order: IOrder) => void;
    removeOrder: (order: IOrder) => void;
    paidOrder: (order: IOrder) => {
        status: string;
    };
    getOrderById: (id: string) =>
        | {
              status: string;
              order: IOrder;
          }
        | {
              status: string;
              order?: undefined;
          };
    getPaidOrders: () =>
        | {
              status: string;
              order: IOrder[];
          }
        | {
              status: string;
              order?: undefined;
          };
    getInCartOrders: () =>
        | {
              status: statusType;
              order: IOrder[];
          }
        | {
              status: statusType;
              order?: undefined;
          };
}

export const OrderContext = createContext({} as ContextProps);
