export interface Category{
    id: string | null;
    name: string;
}

export interface Item{
    id: string | null;
    name: string;
    description: string;
    imageLink: string;
    contains: string[];
    vegan: boolean;
    category: Category | null;
    categoryID: string | null;
    price: number | "";
}

export type MenuItem = Item & {
    quantity: number;
}

export type AdminItem = Item & {
    edited: boolean;
    deleted: boolean;
    file: File | null;
}

export interface Customer{
    id: string | null;
    name: string;
    phone: string;
    email: string;
}

export interface OrderItem{
    id: string | null;
    itemID: string;
    orderID: string | null;
    quantity: number;
    price: number;
}

export type OrderMenuItem = OrderItem & {
    name: string;
    imageLink: string;
    categoryID: string;
}

export interface Order{
    id: string | null;
    orderItems: OrderItem[];
    dateOrdered: Date | string;
    dateDue: Date | string;
    customer: Customer;
    accepted: boolean;
    location: string;
    finished: boolean;
    comment: string | null;
}

