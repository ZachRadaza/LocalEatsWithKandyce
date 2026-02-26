import * as orderItemService from "../services/order_item-service.js";

export async function getAllOrderItemsHandler(req, res){
    try{
        const rawData = await orderItemService.getAllOrderItems();

        const data = rawData.map(oi => 
            convertToFrontEndOI(oi)
        )

        res.status(200).json({
            success: true,
            data: data
        });
    } catch(error){
        console.error(`getAllOrderItemsHandler Error: `, error);
        res.status(500).json({
            success: false,
            error: error
        });
    }
}

export async function getAllOrderItemsFromHandler(req, res){
    try{
        const { orderid } = req.params;

        if(!orderid){
            return res.status(400).json({
                success: false,
                error: 'Order ID is required'
            });
        }

        const rawData = await orderItemService.getOrderItemsFrom(orderid);

        const data = rawData.map(oi => 
            convertToFrontEndOI(oi)
        )

        res.status(200).json({
            success: true,
            data: data
        });
    } catch(error){
        console.error(`getAllOrderItemsFromHandler Error: `, error);
        res.status(500).json({
            success: false,
            error: error
        });
    }
}

export async function getOrderItemHandler(req, res){
    try{
        const { id } = req.params;

        if(!id){
            return res.status(400).json({
                success: false,
                error: 'OrderItem ID is required'
            });
        }

        const rawData = await orderItemService.getOrderItem(id);

        if(!rawData){
            return res.status(404).json({
                success: false,
                error: "OrderItem not found"
            });
        }

        const data = convertToFrontEndOI(rawData);

        res.status(200).json({
            success: true,
            data: data
        });
    } catch(error){
        console.error(`getOrderItemHandler Error: `, error);
        res.status(500).json({
            success: false,
            error: error
        });
    }
}

export async function addOrderItemHandler(req, res){
    try{
        const orderItem = objectizeOrderItem(req.body);

        if(!orderItem){
            return res.status(400).json({
                success: false,
                error: 'Valid OrderItem Required'
            });
        }

        const rawData = await orderItemService.addOrderItem(orderItem);

        const data = convertToFrontEndOI(rawData);

        res.status(200).json({
            success: true,
            data: data
        });
    } catch(error){
        console.error(`addOrderItemHandler Error: `, error);
        res.status(500).json({
            success: false,
            error: error
        });
    }
}

export async function updateOrderItemHandler(req, res){
    try{
        const { id } = req.params;
        const orderItem = objectizeOrderItem(req.body);

        if(!id){
            return res.status(400).json({
                success: false,
                error: 'OrderItem ID is required'
            });
        }

        if(!orderItem){
            return res.status(400).json({
                success: false,
                error: 'Valid OrderItem Required'
            });
        }

        const rawData = await orderItemService.updateOrderItem(id, orderItem);

        if(!rawData){
            return res.status(404).json({
                success: false,
                error: "OrderItem not found"
            });
        }

        const data = convertToFrontEndOI(rawData);

        res.status(200).json({
            success: true,
            data: data
        });
    } catch(error){
        console.error(`updateOrderItemHandler Error: `, error);
        res.status(500).json({
            success: false,
            error: error
        });
    }
}

export async function deleteOrderItemHandler(req, res){
    try{
        const { id } = req.params;

        if(!id){
            return res.status(400).json({
                success: false,
                error: 'OrderItem ID is required'
            });
        }

        const data = await orderItemService.deleteOrderItem(id);

        if(!data){
            return raw.status(404).json({
                success: false,
                error: "OrderItem not found"
            });
        }

        res.status(200).json({
            success: true,
            data: true
        });
    } catch(error){
        console.error(`deleteOrderItemHandler Error: `, error);
        res.status(500).json({
            success: false,
            error: error
        });
    }
}

export function objectizeOrderItem(rawBody){
    const {
        orderID,
        itemID,
        quantity,
        price
    } = rawBody;

    if(
        !orderID ||
        !itemID ||
        !quantity ||
        !price
    )
        return false;

    return{
        order_id: orderID,
        item_id: itemID,
        quantity: quantity,
        price: price,
    };
}

export function convertToFrontEndOI(orderItem){
    return {
        id: orderItem.id,
        orderID: orderItem.order_id,
        quantity: orderItem.quantity,
        price: orderItem.price,
        createdAt: orderItem.created_at,
        name: orderItem.item.name,
        imageLink: orderItem.item.image_link,
        categoryID: orderItem.item.category.id
    }
}