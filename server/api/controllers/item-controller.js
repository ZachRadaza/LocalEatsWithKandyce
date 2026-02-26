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
            return res.status(400).json({
                success: false,
                error: 'Item ID is required'
            });
        }

        const data = await itemService.getItem(id);

        if(!data){
            return res.status(404).json({
                success: false,
                error: 'Item not found'
            })
        }

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

        if(!categoryid || typeof categoryid !== "string" || !categoryid.trim()){
            return res.status(400).json({
                success: false,
                error: 'Category ID is required'
            });
        }

        const trimmedCatID = categoryid.trim()

        const data = await itemService.getItemsFromCategory(trimmedCatID);

        if(!data){
            return res.status(404).json({
                success: false,
                error: 'Item not found'
            })
        }

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
            return res.status(400).json({
                success: false,
                error: "Item is required"
            });
        }

        const file = req.file;
        if(file){
            const upload = await itemService.uploadImageToBucket({
                buffer: file.buffer,
                mimetype: file.mimetype,
                originalName: file.originalname,
            });

            newItem.image_link = upload.publicUrl
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
        const file = req.file;

        if(!id){
            return res.status(400).json({
                success: false,
                error: 'Item ID is required'
            });
        }

        if(!item){
            return res.status(400).json({
                success: false,
                error: "Item is required"
            });
        }

        if(file){
            const publicPath = publicUrlToPath(item.image_link);

            if(item.image_link)
                await itemService.deleteImagesFromBucket({ paths: publicPath })

            const upload = await itemService.uploadImageToBucket({
                buffer: file.buffer,
                mimetype: file.mimetype,
                originalName: file.originalname,
            });

            item.image_link = upload.publicUrl
        }

        const data = await itemService.updateItem(id, item);

        if(!data){
            return res.status(404).json({
                success: false,
                error: 'Item not found'
            })
        }

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
        const { imageLink } = req.body;

        if(!id){
            return res.status(400).json({
                success: false,
                error: 'Item ID is required'
            });
        }

        if(imageLink){
            const path = publicUrlToPath(imageLink)
            await itemService.deleteImagesFromBucket({ paths: path })
        }

        const data = await itemService.deleteItem(id);

        if(!data){
            return res.status(404).json({
                success: false,
                error: 'Item not found'
            })
        }

        res.status(200).json({
            success: true,
            data: data
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
        !price ||
        !contains ||
        !categoryID
    )
        return false;

    return {       
        name: name,
        description: description,
        image_link: imageLink ?? "",
        price: price,
        contains: JSON.parse(contains),
        vegan: vegan === "true",
        category_id: categoryID
    };
}

function publicUrlToPath(publicUrl) {
    const marker = "/object/public/menu_images/";
    const index = publicUrl.indexOf(marker);
    return publicUrl.slice(index + marker.length);
}