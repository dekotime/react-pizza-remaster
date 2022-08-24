import { calcTotalPrice } from './calcTotalPrice';
import { CartItem } from '../redux/cart/types';

export const getCartFromLocalStorage = () => {
    const data = localStorage.getItem('cart');
    const items = data ? JSON.parse(data) : [];
    const totalPrice = calcTotalPrice(items);

    return {
        items: items as CartItem[],
        totalPrice,
    };
};
