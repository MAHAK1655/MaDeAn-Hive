import type { Product } from './productTypes';
import type { Address, User } from './userTypes';

export interface OrderState {
    orders: Order[];
    orderItem:OrderItem | null;
    currentOrder: Order | null;
    paymentOrder: Record<string, unknown> | null;
    loading: boolean;
    error: string | null;
    orderCanceled: boolean
}

export interface Order {
    id: number;
    orderId: string;
    user: User;
    sellerId: number;
    orderItems: OrderItem[];
    orderDate: string; 
    shippingAddress: Address;
    paymentDetails: Record<string, unknown>;
    totalMrpPrice: number;
    totalSellingPrice?: number; // Optional field
    discount?: number; // Optional field
    orderStatus: OrderStatus;
    totalItem: number;
    deliverDate:string;
}

export const OrderStatus = {
    PENDING: 'PENDING',
    SHIPPED: 'SHIPPED',
    DELIVERED: 'DELIVERED',
    CANCELLED: 'CANCELLED'
} as const;

export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];

export interface OrderItem {
    id: number;
    order: Order;
    product: Product;
    size: string;
    quantity: number;
    mrpPrice: number;
    sellingPrice: number; 
    userId: number;
}
