import * as categoryService from "../services/category-service.js";

export async function getAllCategoriesHandler(req, res){
    try{
        const data = await categoryService.getAllCategories();

        res.status(200).json({
            success: true,
            data: data
        });
    } catch(error){
        console.error(`getAllCategorysHandler Error: ${error}`);
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
            console.error("ID is invalid");
            return res.status(400).json({
                success: false,
                error: `ID is an invalid value`
            });
        }

        const data = await categoryService.getCategory(id);
        
        res.status(200).json({
            success: true,
            data: data
        });
    } catch(error){
        console.error(`getCategoryHandler Error: ${error}`);
        res.status(500).json({
            success: false,
            error: error
        });
    }
}

export async function addCategoryHandler(req, res){
    try{
        const { name } = req.body;

        if(!name){
            console.error(`name is invalid`);
            return res.status(400).json({
                success: false,
                error: `passed name is invalid`
            });
        }

        const data = await categoryService.addCategory(name);

        res.status(200).json({
            success: true,
            data: data
        });
    } catch(error){
        console.error(`addCategoryHandler Error: ${error}`);
        res.status(500).json({
            success: false,
            error: error
        });
    }
}

export async function updateCategoryHandler(req, res){
    try{
        const { id } = req.params;
        const { name } = req.body;

        if(!id || !name){
            console.error('ID or name passed is invalid');
            return res.status(400).json({
                success: false,
                error: 'Invalid ID or Name passed'
            });
        }

        const data = await categoryService.updateCategory(id, name);

        res.status(200).json({
            success: true,
            data: data
        });
    } catch(error){
        console.error(`updateCategoryHandler Error: ${error}`);
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
            console.error('Invalid ID passed');
            return res.status(400).json({
                success: false,
                error: 'Invalid ID passed'
            });
        }

        await categoryService.deleteCategory(id);

        res.status(200).json({
            success: true,
            data: true
        });
    } catch(error){
        console.error(`deleteCategoryHandler Error: ${error}`);
        res.status(500).json({
            success: false,
            error: error
        });
    }
}