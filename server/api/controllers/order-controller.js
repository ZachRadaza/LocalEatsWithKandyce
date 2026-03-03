import * as orderService from "../services/order-service.js";
import * as orderItemService from "../services/order_item-service.js";
import * as customerService from "../services/customer-service.js";
import * as emailService from "../services/email-service.js";
import * as itemService from "../services/item-service.js";
import { objectizeOrderItem } from "./order_item-controller.js";
import { convertToFrontEndOI } from "./order_item-controller.js";
import { objectizeItem } from "./item-controller.js";

export async function getAllOrdersHandler(req, res){
    try{
        const orderData = await orderService.getAllOrders();
        
        const orders = await Promise.all(
            orderData.map(async (order) => {
                const orderItemsRaw = await orderItemService.getOrderItemsFrom(order.id);
                const orderItemsAll = orderItemsRaw.map(oi => 
                    convertToFrontEndOI(oi)
                )

                const { orderItems, customItems } = segregateOrderItems(orderItemsAll);

                return {
                    ...order,
                    orderItems,
                    customItems
                };
            })
        );

        const data = orders.map(order => {
            return convertToFrontEnd(order);
        });

        res.status(200).json({
            success: true,
            data: data
        });
    } catch(error){
        console.error(`getAllOrdersHandler Error: `, error);
        res.status(500).json({
            success: false,
            error: error
        });
    }
}

export async function getOrderHandler(req, res){
    try{
        const { id } = req.params;

        if(!id){
            return res.status(400).json({
                success: true,
                error: 'Order ID is required'
            });
        }

        const orderData = await orderService.getOrder(id);

        if(!orderData){
            return res.status(404).json({
                success: false,
                error: "Order not found"
            });
        }

        const orderItemsRaw = await orderItemService.getOrderItemsFrom(id);

        const orderItemsAll = orderItemsRaw.map(oi => 
            convertToFrontEndOI(oi)
        )

        const { orderItems, customItems } = segregateOrderItems(orderItemsAll);

        const order = { ...orderData, orderItems, customItems };
        const data = convertToFrontEnd(order);

        res.status(200).json({
            success: true,
            data: data
        });
    } catch(error){
        console.error(`getOrderHandler Error: `, error);
        res.status(500).json({
            success: false,
            error: error
        });
    }
}

export async function addOrderHandler(req, res){
    try{
        const { customer, orderItems, customItems, order } = objectizeOrder(req.body);

        if(!customer || !orderItems || !order){
            return res.status(400).json({
                success: false,
                error: 'Customer, OrderItems, Order are required'
            });
        }

        const customerNew = await customerService.addCustomer(customer);
        order.customer_id = customerNew.id;
        
        const dataRaw = await orderService.addOrder(order);

        const postCustom = await Promise.all(
            customItems.map(async (item) => {
                const fullItem = objectizeItem(item);
                const addedItem = await itemService.addItem(fullItem);

                return {
                    orderID: "",
                    itemID: addedItem.id,
                    quantity: item.quantity,
                    price: 0
                };
            })
        );

        const fullOrderItems = [...orderItems, ...postCustom];

        for(const item of fullOrderItems){
            item.orderID = dataRaw.id; 

            const orderItem = objectizeOrderItem(item);

            await orderItemService.addOrderItem(orderItem);
        }

        const data = convertToFrontEnd(dataRaw);

        res.status(200).json({
            success: true,
            data: data
        });
    } catch(error){
        console.error(`addOrderHandler Error: `, error);
        res.status(500).json({
            success: false,
            error: error
        });
    }
}

export async function updateOrderHandler(req, res){
    try{
        const { order } = objectizeOrder(req.body);
        const { id } = req.params;

        if(!id){
            return res.status(400).json({
                success: true,
                error: 'Order ID is required'
            });
        }

        if(!order){
            return res.status(400).json({
                success: false,
                error: 'Valid Order is Required'
            });
        }
        
        const dataRaw = await orderService.updateOrder(id, order);

        if(!dataRaw){
            return res.status(404).json({
                success: false,
                error: "Order not found"
            });
        }

        const data = convertToFrontEnd(dataRaw);

        res.status(200).json({
            success: true,
            data: data
        });

    } catch(error){
        console.error(`updateOrderHandler Error: `, error);
        res.status(500).json({
            success: false,
            error: error
        });
    }
}

export async function deleteOrderHandler(req, res){
    try{
        const { id } = req.params;

        if(!id){
            return res.status(400).json({
                success: true,
                error: 'Order ID is required'
            });
        }

        const orderItemsAll = await orderItemService.getOrderItemsFrom(id);

        const order = await orderService.removeOrder(id);

        if(!order){
            return res.status(404).json({
                success: false,
                error: "Rrder not found"
            });
        }

        await customerService.deleteCustomer(order.customers.id);

        for(const orderItem of orderItemsAll){
            const item = orderItem.item;
            if(item.custom)
                await itemService.deleteItem(item.id);
        }

        res.status(200).json({
            success: true,
            data: true
        })
    } catch(error){
        console.error(`deleteOrderHandler Error: `, error);
        res.status(500).json({
            success: false,
            error: error
        });
    }
}

function objectizeOrder(rawBody){
    const {
        orderItems,
        customItems,
        customers,
        dateDue,
        location,
        comment,
        accepted,
        finished
    } = rawBody;

    if(
        !orderItems ||
        !customers ||
        !dateDue ||
        !location
    )
        return false;

    const orderItemsObjects = [];

    orderItems.forEach(orderItem => {
        const object = objectizeOrderItem(orderItem);
        orderItemsObjects.push(object);
    });

    return {
        orderItems: orderItems,
        customItems: customItems,
        customer: {
            name: customers.name,
            email: customers.email,
            phone: customers.phone
        },
        order: {
            customer_id: customers.id ?? "",
            date_due: new Date(dateDue).toISOString(),
            accepted: accepted ?? false,
            location: location,
            finished: finished ?? false,
            comment: comment ?? ""
        }
    };
}

function convertToFrontEnd(order){
    return { 
        ...order, 
        dateDue: order.date_due,
        dateOrdered: order.date_ordered
    };
}

function segregateOrderItems(orderItemsAll){
    const orderItems = [];
    const customItems = [];

    for(const item of orderItemsAll){
        if(!item.custom)
            orderItems.push(item);
        else
            customItems.push(item);
    }

    return { orderItems, customItems };
}