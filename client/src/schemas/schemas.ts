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
    category: Category;
    price: number;
}

export interface OrderItem{
    itemID: string;
    quantity: number;
}

export interface Order{
    id: string | null;
    items: OrderItem[];
    dateOrdered: Date;
    dateDue: Date;
    accepted: boolean;
    location: string; //change to something more robust
}

