import * as orderService from "../services/order-service.js";
import * as orderItemService from "../services/order_item-service.js";
import * as customerService from "../services/customer-service.js";
import { objectizeOrderItem } from "./order_item-controller.js";

export async function getAllOrdersHandler(req, res){
    try{
        const orderData = await orderService.getAllOrders();
        
        const orders = await Promise.all(
            orderData.map(async (order) => {
                const orderItems = await orderItemService.getOrderItemsFrom(order.id);

                return {
                    ...order,
                    orderItems
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
            console.error('Invalid Params');
            return res.status(400).json({
                success: true,
                error: 'Invalid Params'
            });
        }

        const orderItems = await orderItemService.getOrderItemsFrom(id);
        const orderData = await orderService.getOrder(id);

        const order = { ...orderData, orderItems };
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
        const { customer, orderItems, order } = objectizeOrder(req.body);

        if(!customer || !orderItems || !order){
            console.log('Invalid body');
            return res.status(400).json({
                success: false,
                error: 'Invalid body'
            });
        }

        const customerNew = await customerService.addCustomer(customer);
        order.customer_id = customerNew.id;
        
        const dataRaw = await orderService.addOrder(order);

        for(const item of orderItems){
            item.orderID = data.id; 
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
        const { orderItems } = objectizeOrder(req.body);
        const { id } = req.params;

        if(!orderItems || !id){
            console.log('Invalid body or ID');
            return res.status(400).json({
                success: false,
                error: 'Invalid body or ID'
            });
        }
        
        const dataRaw = await orderService.updateOrder(order);

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
            console.log('Invalid Id');
            return res.status(400).json({
                success: false,
                error: "Invalid ID"
            });
        }

        await orderService.removeOrder(id);

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
        customer,
        dateDue,
        location,
        comment
    } = rawBody;

    if(
        !orderItems ||
        !customer ||
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
        customer: {
            name: customer.name,
            email: customer.email,
            phone: customer.phone
        },
        order: {
            customer_id: "",
            date_due: new Date(dateDue).toISOString(),
            accepted: false,
            location: location,
            finished: false,
            comment: comment
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