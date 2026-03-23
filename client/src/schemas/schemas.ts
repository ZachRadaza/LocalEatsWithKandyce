export type Category = {
    id: string | null;
    name: string;
    description: string;
}

export type CategoryImage = Category & {
    imageLink: string;
}

export type Item = {
    id: string | null;
    name: string;
    description: string;
    imageLink: string;
    contains: string[];
    category: Category | null;
    categoryID: string | null;
    price: number | "";
    custom: boolean;

    vegan: boolean;
    halal: boolean;
    vegetarian: boolean;
    glutenFree: boolean;
    dairyFree: boolean;
    ketoFriendly: boolean;
    spicy: boolean;
}

export type MenuItem = Item & {
    quantity: number;
}

export type AdminItem = Item & {
    edited: boolean;
    deleted: boolean;
    file: File | null;
}

export type Customer = {
    id: string | null;
    name: string;
    phone: string;
    email: string;
    phonePreffered: boolean;
}

export type OrderItem = {
    id: string | null;
    itemID: string;
    orderID: string | null;
    quantity: number;
    price: number;

    vegan: boolean;
    halal: boolean;
    vegetarian: boolean;
    glutenFree: boolean;
    dairyFree: boolean;
    ketoFriendly: boolean;
    spicy: boolean;
}

export type OrderMenuItem = OrderItem & {
    name: string;
    imageLink: string;
    categoryID: string;
}

export type Order = {
    id: string | null;
    orderItems: OrderMenuItem[];
    customItems: MenuItem[];
    dateOrdered: Date | string;
    dateDue: Date | string;
    customers: Customer;
    accepted: boolean;
    location: string;
    finished: boolean;
    comment: string | null;
}

export type OrderFull = Order & {
    price: number;
}

export type Sort = "Alphabetical" | "Date Ordered" | "Date Due";
export type Filter = "All" | "Accepted" | "Not Accepted";