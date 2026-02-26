import type { Category, Customer, Item, Order, OrderItem, AdminItem } from "../schemas/schemas";

const apiUrl = "http://localhost:3001/api";
const apiCustomer = `${apiUrl}/customer`;
const apiCategory = `${apiUrl}/category`;
const apiItem = `${apiUrl}/item`;
const apiOrder = `${apiUrl}/order`;
const apiOrderItem = `${apiUrl}/orderitem`;
const apiEmail = `${apiUrl}/email`;

export const ExtensionService = {
    
    // GETS

    async getCategories(): Promise<Category[]>{
        try{
            const res = await fetch(`${apiCategory}/`, {
                method: 'GET',
                headers: { "Content-Type": "application/json" }
            });

            const body = await res.json();

            const categories: Category[] = body.data;

            return categories;
        } catch(error){
            console.error("getCategories error: ", error);
            return []
        }
    },

    async getCategory(id: string): Promise<Category | null>{
        try{
            const res = await fetch(`${apiCategory}/${id}`, {
                method: 'GET',
                headers: { "Content-Type": "application/json" }
            });

            const body = await res.json();

            const category: Category = body.data;

            return category;
        } catch(error){
            console.error("getCategory Error: ", error);
            return null;
        }
    },

    async getAllMenuItems(): Promise<Item[]>{
        try{
            const res = await fetch(`${apiItem}/`, {
                method: 'GET',
                headers: { "Content-Type": "application/json" }
            });

            const body = await res.json();

            const items: Item[] = body.data;

            return items;
        } catch(error){
            console.error("getAllMenuItems Error: ", error);
            return [];
        }
    },

    async getMenuItems(categoryID: string): Promise<Item[]>{
        try{
            const res = await fetch(`${apiItem}/from/${categoryID}`, {
                method: 'GET',
                headers: { "Content-Type": "application/json" }
            });

            const body = await res.json();

            const items: Item[] = body.data;

            return items;
        } catch(error){
            console.error("getMenuItems Error: ", error);
            return [];
        }
    },

    async getMenuItem(id: string): Promise<Item | null>{
        try{
            const res = await fetch(`${apiItem}/${id}`, {
                method: 'GET',
                headers: { "Content-Type": "application/json" }
            });

            const body = await res.json();

            const item: Item = body.data;

            return item;
        } catch(error){
            console.error("getMenuItem Error: ", error);
            return null;
        }
    },

    async getOrders(): Promise<Order[]>{
        try{
            const res = await fetch(`${apiOrder}/`, {
                method: 'GET',
                headers: { "Content-Type": "application/json" }
            });

            const body = await res.json();

            const orders: Order[] = body.data;

            return orders;
        } catch(error){
            console.error("getOrders Error: ", error);
            return [];
        }
    },

    async getOrder(id: string): Promise<Order | null>{
        try{
            const res = await fetch(`${apiOrder}/${id}`, {
                method: 'GET',
                headers: { "Content-Type": "application/json" }
            });

            const body = await res.json();

            const order: Order = body.data;

            return order;
        } catch(error){
            console.error("getOrder Error: ", error);
            return null;
        }
    },

    async getAllOrderItems(): Promise<OrderItem[]>{
        try{
            const res = await fetch(`${apiOrderItem}/`, {
                method: 'GET',
                headers: { "Content-Type": "application/json" }
            });

            const body = await res.json();

            const items: OrderItem[] = body.data;

            return items;
        } catch(error){
            console.error("getAllOrderItems error: ", error);
            return [];
        }
    },

    async getOrderItems(orderID: string): Promise<OrderItem[]>{
        try{
            const res = await fetch(`${apiOrderItem}/from/${orderID}`, {
                method: 'GET',
                headers: { "Content-Type": "application/json" }
            });

            const body = await res.json();

            const items: OrderItem[] = body.data;

            return items;
        } catch(error){
            console.error("getOrderItem Error: ", error);
            return [];
        }
    },

    async getOrderItem(id: string): Promise<OrderItem | null>{
        try{
            const res = await fetch(`${apiOrderItem}/${id}`, {
                method: 'GET',
                headers: { "Content-Type": "application/json" }
            });

            const body = await res.json();

            const item: OrderItem = body.data;

            return item;
        } catch(error){
            console.error("getOrderItem Error: ", error);
            return null;
        }
    },

    async getAllCustomers(): Promise<Customer[]>{
        try{
            const res = await fetch(`${apiCustomer}/`, {
                method: 'GET',
                headers: { "Content-Type": "application/json" }
            });

            const body = await res.json();

            const customers: Customer[] = body.data;

            return customers;
        } catch(error){
            console.error("getAllCustomers Error: ", error);
            return [];
        }
    },

    async getCustomer(id: string): Promise<Customer | null>{
        try{
            const res = await fetch(`${apiCustomer}/${id}`, {
                method: 'GET',
                headers: { "Content-Type": "application/json" }
            });

            const body = await res.json();

            const customer: Customer = body.data;

            return customer;
        } catch(error){
            console.error("getCustomer Error: ", error);
            return null;
        }
    },

    // POSTS

    async addCategory(category: Category): Promise<Category | null>{
        try{
            const res = await fetch(`${apiCategory}/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(category)
            });

            const body = await res.json();

            const newCategory: Category = body.data;

            return newCategory;
        } catch(error){
            console.error("addCategory Error: ", error);
            return null;
        }
    },

    async addMenuItem(item: AdminItem): Promise<Item | null>{
        try{
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
        } catch(error){
            console.error("addMenuItem Error: ", error);
            return null;
        }
    },

    async addCustomer(customer: Customer): Promise<Customer | null>{
        try{
            const res = await fetch(`${apiCustomer}/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(customer)
            });

            const body = await res.json();

            const newCusotmer: Customer = body.data;

            return newCusotmer;
        } catch(error){
            console.error("addCustomer Error: ", error);
            return null;
        }
    },

    async addOrderItem(orderItem: OrderItem): Promise<OrderItem | null>{
        try{
        const res = await fetch(`${apiOrderItem}/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderItem)
        });

        const body = await res.json();

        const newOrderItem: OrderItem = body.data;

        return newOrderItem;
        } catch(error){
            console.error("addOrderItem Error: ", error);
            return null;
        }
    },

    async addOrder(order: Order): Promise<Order | null>{
        try{
            const res = await fetch(`${apiOrder}/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(order)
            });

            const body = await res.json();

            const newOrder: Order = body.data;

            return newOrder;
        } catch(error){
            console.error("addOrder Error: ", error);
            return null;
        }
    },

    // PUTS

    async updateCategory(category: Category): Promise<Category | null>{
        try{
            const res = await fetch(`${apiCategory}/${category.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(category)
            });

            const body = await res.json();

            const updatedCategory: Category = body.data;

            return updatedCategory;
        } catch(error){
            console.error("updateCategory Error: ", error);
            return null;
        }
    },

    async updateMenuItem(item: AdminItem): Promise<Item | null>{
        try{
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
        } catch(error){
            console.error("updateMenuItem Error: ", error);
            return null;
        }
    },

    async updateOrder(order: Order): Promise<Order | null>{
        try{
            const res = await fetch(`${apiOrder}/${order.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(order)
            });

            const body = await res.json();

            const updatedOrder: Order = body.data;

            return updatedOrder;
        } catch(error){
            console.error("updateOrder Error: ", error);
            return null;
        }
    },

    async updateOrderItem(orderItem: OrderItem): Promise<OrderItem | null>{
        try{
            const res = await fetch(`${apiOrderItem}/${orderItem.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderItem)
            });

            const body = await res.json();

            const updatedOrderItem: OrderItem = body.data;

            return updatedOrderItem;
        } catch(error){
            console.error("updateOrderItem Error: ", error);
            return null;
        }
    },

    async updateCustomer(customer: Customer): Promise<Customer | null>{
        try{
            const res = await fetch(`${apiCustomer}/${customer.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(customer)
            });

            const body = await res.json();

            const updatedCustomer: Customer = body.data;

            return updatedCustomer;
        } catch(error){
            console.error("updateCustomer Error: ", error);
            return null;
        }
    },

    // DELETES

    async deleteCategory(id: string): Promise<boolean | null>{
        try{
            const res = await fetch(`${apiCategory}/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });

            const body = await res.json();

            const deleted = body.data;

            return deleted;
        } catch(error){
            console.error("deleteCategory Error: ", error);
            return null;
        }
    },

    async deleteMenuItem(id: string, imageLink: string): Promise<boolean | null>{
        try{
            const res = await fetch(`${apiItem}/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ imageLink })
            });

            const body = await res.json();

            const deleted = body.data;

            return deleted;
        } catch(error){
            console.error("deleteMenuItem Error: ", error);
            return null;
        }
    },

    async deleteOrder(id: string): Promise<boolean | null>{
        try{
            const res = await fetch(`${apiOrder}/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });

            const body = await res.json();

            const deleted = body.data;

            return deleted;
        } catch(error){
            console.error("deleteOrder Error: ", error);
            return null;
        }
    },

    async deleteOrderItem(id: string): Promise<boolean | null>{
        try{
            const res = await fetch(`${apiOrderItem}/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });

            const body = await res.json();

            const deleted = body.data;

            return deleted;
        } catch(error){
            console.error("deleteOrderItem Error: ", error);
            return null;
        }
    },

    async deleteCustomer(id: string): Promise<boolean | null>{
        try{
            const res = await fetch(`${apiCustomer}/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });

            const body = await res.json();

            const deleted = body.data;

            return deleted;
        } catch(error){
            console.error("deleteCustomer Error: ", error);
            return null;
        }
    },

    async sendConfirmationEmail(sendTo: string, order: Order): Promise<boolean | null>{
        try{
            const res = await fetch(`${apiEmail}/confirmation`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sendTo, order })
            });

            const body = await res.json();

            return body;
        } catch(error){
            console.error("sendConfimationEmail Error: ", error);
            return null;
        }
    },

    async sendAcceptEmail(sendTo: string, order: Order): Promise<boolean | null>{
        try{
            const res = await fetch(`${apiEmail}/accept`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sendTo, order })
            });

            const body = await res.json();

            return body;
        } catch(error){
            console.error("sendAcceptEmail Error: ", error);
            return null;
        }
    },

    async sendDeclineEmail(sendTo: string, order: Order, message: string): Promise<boolean | null>{
        try{
            const res = await fetch(`${apiEmail}/decline`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sendTo, order, message })
            });

            const body = await res.json();

            return body;
        } catch(error){
            console.error("sendDeclineEmail Error: ", error);
            return null;
        }
    },

    async sendReminderEmail(sendTo: string, order: Order): Promise<boolean | null>{
        try{
            const res = await fetch(`${apiEmail}/reminder`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sendTo, order })
            });

            const body = await res.json();

            return body;
        } catch(error){
            console.error("sendReminderEmail Error: ", error);
            return null;
        }
    },

    async sendCompleteEmail(sendTo: string, orderID: string, customerName: string): Promise<boolean | null>{
        try{
            const res = await fetch(`${apiEmail}/complete`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sendTo, orderID, customerName })
            });

            const body = await res.json();

            return body;
        } catch(error){
            console.error("sendCompleteEmail Error: ", error);
            return null;
        }
    }
};