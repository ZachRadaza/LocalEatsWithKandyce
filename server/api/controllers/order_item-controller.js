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
            console.error('Invalid ID passed in params');
            return res.status(400).json({
                success: false,
                error: 'Invalid ID passed in params'
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
            console.error('Invalid ID passed in params');
            return res.status(400).json({
                success: false,
                error: 'Invalid ID passed in params'
            });
        }

        const rawData = await orderItemService.getOrderItem(id);

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
            console.error("order item is invalid");
            return res.status(400).json({
                success: false,
                error: 'Invalid orderItem passed'
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

        if(!orderItem || !id){
            console.error("id or order item is invalid");
            return res.status(400).json({
                success: false,
                error: 'Invalid id or orderItem passed'
            });
        }

        const rawData = await orderItemService.updateOrderItem(id, orderItem);

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
            console.error("invalid id");
            return res.status(400).json({
                success: false,
                error: 'Invalid ID passed'
            });
        }

        await orderItemService.deleteOrderItem(id);

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