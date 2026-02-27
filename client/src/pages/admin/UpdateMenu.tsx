import { useState, useEffect } from "react";
import type { Category } from "../../schemas/schemas";
import { ExtensionService } from "../../utils/ExtensionService";
import AdminCategoryComp from "../../components/admin/AdminCategoryComp";
import OptionsPopup from "../../components/popups/OptionsPopup";
import Popup from "../../components/popups/Popup";
import "./UpdateMenu.css";

export default function UpdateMenu(){
    const [categories, setCategories] = useState<Category[]>([]);
    const [currentCategory, setCurrentCategory] = useState<Category>({ id: 'temp', name: "temp" });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [openedCategoryPopup, setOpenedCategoryPopup] = useState<boolean>(false);
    const [openedErrorPopup, setOpenedErrorPopup] = useState<boolean>(false);
    
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
            setOpenedErrorPopup(true);
        }
    }

    if(loading)
        return (
            <div className="loading-page">
                <h5>Local Eats With Kandyce</h5>
                <p>Loading Menu...</p>
            </div>
        );

    if(error)
        return (
            <div className="error-page">
                <h5>Local Eats With Kandyce</h5>
                <p>Sorry for the inconvience</p>
                <p>Error: { error } </p>
            </div>
        );

    return (
        <div className="admin-menu-cont">
            <div className="popups">
                <OptionsPopup
                    title={ "Delete Category" }
                    message={ "Are you sure you want to delete the Category? Deleting the Category will delete all the Items inside it" }
                    isOpened={ openedCategoryPopup }
                    option1Title={ "Cancel" }
                    option2Title={ "Delete Category" }
                    option1Func={ () => setOpenedCategoryPopup(false) }
                    option2Func={ () => { 
                        deleteCategory(currentCategory.id!);  
                        setOpenedCategoryPopup(false);
                    } }
                />
                <Popup
                    title={ "Error in Deleting Category" }
                    message={ "An error has occured in deleting the Category. Please contact Zach for help" }
                    isOpened={ openedErrorPopup }
                    positiveMessage={ false }
                    closePopup={() => setOpenedErrorPopup(false) }
                />
            </div>
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
                    deleteCategory={ () => setOpenedCategoryPopup(true) }
                />
            </div>
        </div>
    );
}