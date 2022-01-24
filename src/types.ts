import { ReduxState, Record, Identifier } from 'react-admin';

export type ThemeName = 'light' | 'dark';

export interface AppState extends ReduxState {
    theme: ThemeName;
}

export interface Category extends Record {
    name: string;
}

export interface Product extends Record {
    name: string;
    description?: string;
    image?: string;
    price: number,
    addition_prices?: {
        name: string;
        prices: {
            name: string;
            price: number;
            is_default?: boolean;
        }[];
    }[];
    information?: {
        title: string;
        content: string;
    }[];
    st: number;
    tax_ids?: string[];
    cat_ids?: string[];
}

export interface User extends Record {
    email: string;
    username: string;
    display_name: {
        last_name?: string;
        first_name?: string;
        last_name_kata?: string;
        first_name_kata?: string;
    };
    birth_day: number;
    gender: number;
    phone_number: string;
    address: {
        postal_code?: string;
        prefecture?: string;
        city?: string;
        address?: string;
        apartment?: string;
    };
    social_linkeds: {
        type: number,
        token: string
    }[];
    st?: number;
    last_login_at: number;
    verify_token: string;
    secret_question: {
        question: string;
        answer: string;
    },
    email_settings: {
        campaign?: boolean;
        new_food?: boolean;
    }
}

export enum OrderState {
    CART = 1,
    PAID = 10,
    WAIT_PAY = 11,
    PROCESS_PAY = 12,
    PAID_ERROR = 19,
    CANCEL_PROCESS = 80,
    CANCEL = 81,
    WAITING_RECEIVE = 89,
    COMPLETE = 90
}

export interface Order extends Record {
    st: OrderState;
    foods: {
        id: string;
        name: string;
        additions: {
            name: string;
            option_name: string;
            price: number;
        }[];
        price: number;
    }[];
    user_id: string;
    branch_id: string;
    queuing: number;
    order_date: number;
    note?: string;
    created_time?: number;
    paid_time?: number;
    complete_time?: number;
    refund_total?: number;
}

export interface BasketItem {
    product_id: Identifier;
    quantity: number;
}

export interface Invoice extends Record {}

export type ReviewStatus = 'accepted' | 'pending' | 'rejected';

export interface Review extends Record {
    date: Date;
    status: ReviewStatus;
    user_id: Identifier;
    product_id: Identifier;
}

declare global {
    interface Window {
        restServer: any;
    }
}
