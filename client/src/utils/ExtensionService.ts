import type { Category, Customer, Item, Order, OrderItem, AdminItem } from "../schemas/schemas";

const apiUrl = "http://localhost:3001/api";
const apiCustomer = `${apiUrl}/customer`;
const apiCategory = `${apiUrl}/category`;
const apiItem = `${apiUrl}/item`;
const apiOrder = `${apiUrl}/order`;
const apiOrderItem = `${apiUrl}/orderitem`;

export const ExtensionService = {
    
    // GETS

    async getCategories(): Promise<Category[]>{
        const res = await fetch(`${apiCategory}/`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        });

        const body = await res.json();

        const categories: Category[] = body.data;

        return categories;
    },

    async getCategory(id: string): Promise<Category>{
        const res = await fetch(`${apiCategory}/${id}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        });

        const body = await res.json();

        const category: Category = body.data;

        return category;
    },

    async getAllMenuItems(): Promise<Item[]>{
        const res = await fetch(`${apiItem}/`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        });

        const body = await res.json();

        const items: Item[] = body.data;

        return items;
    },

    async getMenuItems(categoryID: string): Promise<Item[]>{
        const res = await fetch(`${apiItem}/from/${categoryID}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        });

        const body = await res.json();

        const items: Item[] = body.data;

        return items;
    },

    
    async getMenuItem(id: string): Promise<Item>{
        const res = await fetch(`${apiItem}/${id}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        });

        const body = await res.json();

        const item: Item = body.data;

        return item;
    },

    async getOrders(): Promise<Order[]>{
        const res = await fetch(`${apiOrder}/`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        });

        const body = await res.json();

        const orders: Order[] = body.data;

        return orders;
    },

    async getOrder(id: string): Promise<Order>{
        const res = await fetch(`${apiOrder}/${id}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        });

        const body = await res.json();

        const order: Order = body.data;

        return order;
    },

    async getAllOrderItems(): Promise<OrderItem[]>{
        const res = await fetch(`${apiOrderItem}/`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        });

        const body = await res.json();

        const items: OrderItem[] = body.data;

        return items;
    },

    async getOrderItems(orderID: string): Promise<OrderItem[]>{
        const res = await fetch(`${apiOrderItem}/from/${orderID}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        });

        const body = await res.json();

        const items: OrderItem[] = body.data;

        return items;
    },

    async getOrderItem(id: string): Promise<OrderItem>{
        const res = await fetch(`${apiOrderItem}/${id}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        });

        const body = await res.json();

        const item: OrderItem = body.data;

        return item;
    },

    async getAllCustomers(): Promise<Customer[]>{
        const res = await fetch(`${apiCustomer}/`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        });

        const body = await res.json();

        const customers: Customer[] = body.data;

        return customers;
    },

    async getCustomer(id: string): Promise<Customer>{
        const res = await fetch(`${apiCustomer}/${id}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        });

        const body = await res.json();

        const customer: Customer = body.data;

        return customer;
    },

    // POSTS

    async addCategory(category: Category): Promise<Category>{
        const res = await fetch(`${apiCategory}/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(category)
        });

        const body = await res.json();

        const newCategory: Category = body.data;

        return newCategory;
    },

    async addMenuItem(item: AdminItem): Promise<Item>{
        const form = new FormData();

        form.append("name", item.name);
        form.append("categoryID", item.categoryID!);
        form.append("contains", JSON.stringify(item.contains));
        form.append("description", item.description);
        form.append("price", String(item.price));
        form.append("imageLink", item.imageLink);
        form.append("vegan", String(item.vegan));

        if(item.file)
            form.append("file", item.file);

        const res = await fetch(`${apiItem}/`, {
            method: "POST",
            body: form
        });

        const body = await res.json();

        const newItem: Item = body.data;

        return newItem;
    },

    async addCustomer(customer: Customer): Promise<Customer>{
        const res = await fetch(`${apiCustomer}/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(customer)
        });

        const body = await res.json();

        const newCusotmer: Customer = body.data;

        return newCusotmer;
    },

    async addOrderItem(orderItem: OrderItem): Promise<OrderItem>{
        const res = await fetch(`${apiOrderItem}/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderItem)
        });

        const body = await res.json();

        const newOrderItem: OrderItem = body.data;

        return newOrderItem;
    },

    async addOrder(order: Order): Promise<Order>{
        const res = await fetch(`${apiOrder}/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order)
        });

        const body = await res.json();

        const newOrder: Order = body.data;

        return newOrder;
    },

    // PUTS

    async updateCategory(category: Category): Promise<Category>{
        const res = await fetch(`${apiCategory}/${category.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(category)
        });

        const body = await res.json();

        const updatedCategory: Category = body.data;

        return updatedCategory;
    },

    async updateMenuItem(item: AdminItem): Promise<Item>{
        const form = new FormData();

        form.append("name", item.name);
        form.append("categoryID", item.categoryID!);
        form.append("contains", JSON.stringify(item.contains));
        form.append("description", item.description);
        form.append("price", String(item.price));
        form.append("imageLink", item.imageLink);
        form.append("vegan", String(item.vegan));

        if(item.file)
            form.append("file", item.file);

        const res = await fetch(`${apiItem}/${item.id}`, {
            method: "PUT",
            body: form
        });

        const body = await res.json();

        const updatedItem: Item = body.data;

        return updatedItem;
    },

    async updateOrder(order: Order): Promise<Order>{
        const res = await fetch(`${apiOrder}/${order.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order)
        });

        const body = await res.json();

        const updatedOrder: Order = body.data;

        return updatedOrder;
    },

    async updateOrderItem(orderItem: OrderItem): Promise<OrderItem>{
        const res = await fetch(`${apiOrderItem}/${orderItem.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderItem)
        });

        const body = await res.json();

        const updatedOrderItem: OrderItem = body.data;

        return updatedOrderItem;
    },

    async updateCustomer(customer: Customer): Promise<Customer>{
        const res = await fetch(`${apiCustomer}/${customer.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(customer)
        });

        const body = await res.json();

        const updatedCustomer: Customer = body.data;

        return updatedCustomer;
    },

    // DELETES

    async deleteCategory(id: string): Promise<boolean>{
        const res = await fetch(`${apiCategory}/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });

        const body = await res.json();

        const deleted = body.data;

        return deleted;
    },

    async deleteMenuItem(id: string, imageLink: string): Promise<boolean>{
        const res = await fetch(`${apiItem}/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imageLink })
        });

        const body = await res.json();

        const deleted = body.data;

        return deleted;
    },

    async deleteOrder(id: string): Promise<boolean>{
        const res = await fetch(`${apiOrder}/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });

        const body = await res.json();

        const deleted = body.data;

        return deleted;
    },

    async deleteOrderItem(id: string): Promise<boolean>{
        const res = await fetch(`${apiOrderItem}/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });

        const body = await res.json();

        const deleted = body.data;

        return deleted;
    },

    async deleteCustomer(id: string): Promise<boolean>{
        const res = await fetch(`${apiCustomer}/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });

        const body = await res.json();

        const deleted = body.data;

        return deleted;
    }
};