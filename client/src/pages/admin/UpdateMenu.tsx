import { useState, useEffect } from "react";
import type { Category } from "../../schemas/schemas";
import { ExtensionService } from "../../utils/ExtensionService";
import AdminCategoryComp from "../../components/admin/AdminCategoryComp";
import "./UpdateMenu.css";

export default function UpdateMenu(){
    const [categories, setCategories] = useState<Category[]>([]);
    const [currentCategory, setCurrentCategory] = useState<Category>({ id: 'temp', name: "temp" });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        let cancelled = false;

        fetchData();

        async function fetchData(){
            try{
                setLoading(false);
                setError(null);

                const categoriesData: Category[] = await ExtensionService.getCategories();
                if(cancelled)
                    return;

                setCategories(categoriesData);

                setCurrentCategory(categoriesData[0] ?? null);
            } catch(error){
                if(cancelled) 
                    return;
                setError("Failed to load update menu");
            } finally{
                if(cancelled) 
                    return;
                setLoading(false);
            }
        }
    },[]);

    function addCategoryClicked(){
        const catNum = categories.length + 1;
        const newCategory: Category = { id: `new-cat-${catNum}`, name: `New Category ${catNum}`};

        setCategories([...categories, newCategory]);

        setCurrentCategory(newCategory);
    }

    async function deleteCategory(categoryID: string){
        try{
            if(!categoryID.includes('new-cat'))
                await ExtensionService.deleteCategory(categoryID);

            setCategories(oldCat => oldCat.filter(cat => cat.id !== categoryID));

            setCurrentCategory(categories[0] ?? { id:'temp', name: 'temp' });
        } catch(error){
            console.error("Error in Deleting Category: ", error);
        }
    }

    if(loading)
        return (
            <div className="loading-page">

            </div>
        );

    if(error)
        return (
            <div className="error-page">
                <h1>Error: { error }</h1>
            </div>
        );

    return (
        <div className="admin-menu-cont">
            <nav className="categories">
                { categories.map(category => {
                    return (
                        <button 
                            key={ category!.id }
                            onClick={ () => { setCurrentCategory(category) } }
                            className={ category.id === currentCategory.id ? "current" : "" }
                        >
                            { category!.name.toUpperCase() }
                        </button>
                    );
                }) }
                <button 
                    onClick={ () => addCategoryClicked() }
                    className="new-category-btn"    
                >
                    Add Category
                </button>
            </nav>
            <div className="items-cont">
                <AdminCategoryComp 
                    key={'current-category'} 
                    category={ currentCategory! }
                    deleteCategory={ () => deleteCategory(currentCategory.id!) }
                />
            </div>
        </div>
    );
}