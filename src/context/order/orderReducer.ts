import { IOrder } from '@/interfaces';
import { OrderState } from './';

type OrderActionType = 
 | { type: '[Order] - Add to Cart', payload: IOrder }
 | { type: '[Order] - Reload local Cart', payload: IOrder[] }
 | { type: '[Order] - Update Cart', payload: IOrder[] }
 | { type: '[Order] - Remove Order', payload: IOrder[] }
 | { type: '[Order] - Paid Order', payload: IOrder[] }
 | { type: '[Order] - Show Added to Cart Notification' }
 | { type: '[Order] - Hide Added to Cart Notification' }

export const orderReducer = ( state: OrderState, action: OrderActionType ): OrderState => {

    switch (action.type) {
        case '[Order] - Add to Cart':
            return {
                ...state,
                cart: [action.payload, ...state.cart ]
            };
        case '[Order] - Reload local Cart' :
            return {
                ...state,
                cart : action.payload
            }
        case '[Order] - Update Cart' :
            return {
                ...state,
                cart : action.payload
            }
        case '[Order] - Remove Order' :
            return {
                ...state,
                cart : action.payload
            }
        case '[Order] - Paid Order' :
            return {
                ...state,
                cart : action.payload
            }
        case '[Order] - Show Added to Cart Notification' :
            return {
                ...state,
                showAddedToCart: true
            }
        case '[Order] - Hide Added to Cart Notification' :
            return {
                ...state,
                showAddedToCart: false
            }
         default:
             return state;
     }

}