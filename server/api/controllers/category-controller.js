import * as categoryService from "../services/category-service.js";

export async function getAllCategoriesHandler(req, res){
    try{
        const data = await categoryService.getAllCategories();

        res.status(200).json({
            success: true,
            data: data
        });
    } catch(error){
        console.error(`getAllCategorysHandler Error: `, error);
        res.status(500).json({
            success: false,
            error: error
        });
    }
}

export async function getCategoryHandler(req, res){
    try{
        const { id } = req.params;

        if(!id){
            return res.status(400).json({
                success: false,
                error: `Category ID is required`
            });
        }

        const data = await categoryService.getCategory(id);
        
        if(!data){
            return res.status(404).json({
                success: false,
                error: "Category not found"
            });
        }

        res.status(200).json({
            success: true,
            data: data
        });
    } catch(error){
        console.error(`getCategoryHandler Error: `, error);
        res.status(500).json({
            success: false,
            error: error
        });
    }
}

export async function addCategoryHandler(req, res){
    try{
        const { name, description } = req.body;

        if(
            !name || !description ||
            typeof name !== "string" ||
            typeof description !== "string" ||
            !name.trim() ||
            !description.trim()
        ){
            return res.status(400).json({
                success: false,
                error: "Category name and description is required."
            });
        }

        const trimmedName = name.trim();
        const trimmedDesc = description.trim();
        const data = await categoryService.addCategory(trimmedName, trimmedDesc);

        res.status(201).json({
            success: true,
            data: data
        });
    } catch(error){
        console.error(`addCategoryHandler Error: `, error);
        res.status(500).json({
            success: false,
            error: error
        });
    }
}

export async function updateCategoryHandler(req, res){
    try{
        const { id } = req.params;
        const { name, description } = req.body;

        if(!id){
            return res.status(400).json({
                success: false,
                error: `Category ID is required`
            });
        }

        if(
            !name || !description ||
            typeof name !== "string" ||
            typeof description !== "string" ||
            !name.trim() ||
            !description.trim()
        ){
            return res.status(400).json({
                success: false,
                error: "Category name and description is required."
            });
        }

        const trimmedName = name.trim();
        const trimmedDesc = description.trim();
        const data = await categoryService.updateCategory(id, trimmedName, trimmedDesc);

        if(!data){
            return res.status(404).json({
                success: false,
                error: "Category not found"
            });
        }

        res.status(200).json({
            success: true,
            data: data
        });
    } catch(error){
        console.error(`updateCategoryHandler Error: `, error);
        res.status(500).json({
            success: false,
            error: error
        });
    }
}

export async function deleteCategoryHandler(req, res){
    try{
        const { id } = req.params;

        if(!id){
            return res.status(400).json({
                success: false,
                error: `Category ID is required`
            });
        }

        await categoryService.deleteCategory(id);

        res.status(200).json({
            success: true,
            data: true
        });
    } catch(error){
        console.error(`deleteCategoryHandler Error: `, error);
        res.status(500).json({
            success: false,
            error: error
        });
    }
}