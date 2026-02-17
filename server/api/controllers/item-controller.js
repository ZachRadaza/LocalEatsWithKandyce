import * as itemService from "../services/item-service.js";

export async function getAllItemsHandler(req, res){
    try{
        const data = await itemService.getAllItems();

        res.status(200).json({
            success: true,
            data: data
        });
    } catch(error){
        console.error(`getAllItemsHandler Error: `, error);
        res.status(500).json({
            success: false,
            error: error
        });
    }
}

export async function getItemHandler(req, res){
    try{
        const { id } = req.params;

        if(!id){
            console.error('Invalid ID in params');
            return res.status(400).json({
                success: false,
                error: 'Invalid ID params'
            });
        }

        const data = await itemService.getItem(id);

        res.status(200).json({
            success: true,
            data: data
        });
    } catch(error){
        console.error(`getItemHandler Error: `, error);
        res.status(500).json({
            success: false,
            error: error
        });
    }
}

export async function getItemsFromCategoryHandler(req, res){
    try{
        const { categoryid } = req.params;

        if(!categoryid){
            console.error('Invalid CategoryID in params');
            return res.status(400).json({
                success: false,
                error: 'Invalid CategoryID params'
            });
        }

        const data = await itemService.getItemsFromCategory(categoryid);

        res.status(200).json({
            success: true,
            data: data
        });
    } catch(error){
        console.error(`getItemsFromCategoryHandler Error:`, error);
        res.status(500).json({
            success: false,
            error: error
        });   
    }
}

export async function addItemHandler(req, res){
    try{
        const newItem = objectizeItem(req.body);

        if(!newItem){
            console.error('Invalid body for new Item');
            return res.status(400).json({
                success: false,
                error: "invalid body for adding item"
            });
        }

        const data = await itemService.addItem(newItem);

        res.status(200).json({
            success: true,
            data: data
        });
    } catch(error){
        console.error(`addItemHandler Error: `, error);
        res.status(500).json({
            success: false,
            error: error
        });
    }
}

export async function updateItemHandler(req, res){
    try{
        const item = objectizeItem(req.body);
        const { id } = req.params;

        if(!item || !id){
            console.error('Invalid body or params for updating Item');
            return res.status(400).json({
                success: false,
                error: "invalid body or params for updating item"
            });
        }

        const data = await itemService.updateItem(id, item);

        res.status(200).json({
            success: true,
            data: data
        });
    } catch(error){
        console.error(`updateItemHandler Error: `, error);
        res.status(500).json({
            success: false,
            error: error
        });
    }
}

export async function deleteItemHandler(req, res){
    try{
        const { id } = req.params;

        if(!id){
            console.error('Invalid id for deleting item');
            return res.status(400).json({
                success: false,
                error: 'invalid id for deleting item'
            });
        }

        await itemService.deleteItem(id);

        res.status(200).json({
            success: true,
            data: true
        });
    } catch(error){
        console.error(`deleteItemHandler Error: `, error);
        res.status(500).json({
            success: false,
            error: error
        });
    }
}

export function objectizeItem(rawBody){
    const {
        name,
        description,
        imageLink,
        price,
        contains,
        vegan,
        categoryID
    } = rawBody;

    if(
        !name ||
        !description ||
        !imageLink ||
        !price ||
        !contains ||
        !categoryID
    )
        return false;

    return {       
        name: name,
        description: description,
        image_link: imageLink,
        price: price,
        contains: contains,
        vegan: vegan,
        category_id: categoryID
    };
}