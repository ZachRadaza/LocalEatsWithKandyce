import type { Category, Item, AdminItem } from "../../schemas/schemas";
import { useEffect, useState, useRef } from "react";
import { ExtensionService } from "../../utils/ExtensionService";
import AdminItemComp from "./AdminItemComp";
import Popup from "../popups/Popup";
import "./AdminCategoryComp.css";

type AdminCategoryCompProp = {
    category: Category;
    deleteCategory: () => void;
}

export default function AdminCategoryComp({ category, deleteCategory }: AdminCategoryCompProp){
    const [items, setItems] = useState<AdminItem[]>([]);
    const [categoryName, setCategoryName] = useState<string>("");
    const [canEditName, setCanEditName] = useState<boolean>(false);
    const [refresh, setRefesh] = useState<boolean>(false);
    const [savingItemChanges, setSavingItemChanges] = useState<boolean>(false);
    const [savingCatChanges, setSavingCatChanges] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [titlePopup, setTitlePopup] = useState<string>("");
    const [messagePopup, setMessagePopup] = useState<string>("");


    const nameInputRef = useRef<HTMLInputElement>(null);

    function createItem(){
        const newItem: AdminItem = {
            id: `new-item-${items.length + 1}`,
            name: "",
            description: "",
            imageLink: "",
            contains: [],
            vegan: false,
            price: 0,
            category: category,
            categoryID: category.id,
            edited: false,
            deleted: false,
            file: null
        };

        setItems(oldItems => [...oldItems, newItem]);
    }

        function updateItem(id: string, patch: Partial<Item>){
        setItems(lastList => lastList.map(
            i => (i.id === id ? {...i, ...patch } : i)
        ));
    }

    function openPopup(type: string){
        setTitlePopup(`Error in ${type}`);
        setMessagePopup(`An error has occured in ${type.toLowerCase()}. Please contact the GOAT Zach for this issue.`);

        setShowPopup(true);
    }

    async function saveChanges(){
        try{
            setSavingItemChanges(true);

            for(const item of items){
                if(item.deleted && item.id?.includes('new-item'))
                    continue;
                else if(item.id?.includes("new-item"))
                    await ExtensionService.addMenuItem(item);
                else if(item.edited)
                    await ExtensionService.updateMenuItem(item);
                
                if(item.deleted && !item.id?.includes('new-item'))
                    await ExtensionService.deleteMenuItem(item.id!, item.imageLink);
            }

            setSavingItemChanges(false);
            setRefesh(!refresh);
        } catch(error){
            console.error("Error in Saving Changes: ", error);
            openPopup("Saving Changes");
        }
    }

    async function nameEditBtnClick(){
        try{
            if(canEditName){
                setSavingCatChanges(true);
                category.name = categoryName;

                if(category.id?.includes('new-cat'))
                    await ExtensionService.addCategory(category);
                else
                    await ExtensionService.updateCategory(category);

                setSavingCatChanges(false);
            }

            setCanEditName(!canEditName);
        } catch(error){
            console.error("Error in Adding/Editing category: ", error);
            openPopup("Adding/Editing Category");
        }
    }

    useEffect(() => {
        let cancelled = false;

        setCategoryName(category.name);

        if(category.id === 'temp')
            return;

        if(category.id?.includes('new-cat-')){
            setItems([]);
            return;
        }

        fetchItems();

        async function fetchItems(){
            try{
                setLoading(true);
                setError(null);

                if(!category.id)
                    return;

                const items = await ExtensionService.getMenuItems(category.id!);
                const adminItems: AdminItem[] = items.map(item => {
                    const adminItem = {
                        ...item, 
                        edited: false, 
                        deleted: false,
                        file: null 
                    }
                    adminItem.categoryID = category.id;
                    return adminItem;
                });

                if(cancelled)
                    return;

                setItems(adminItems);
                
            } catch(error){
                if(cancelled) 
                    return;
                setError("Failed to load items on menu");
            } finally{
                if(cancelled) 
                    return;
                setLoading(false);
            }
        }
    }, [category, refresh]);

    useEffect(() => {
        if(canEditName){
            nameInputRef.current?.focus();
        }
    }, [canEditName]);

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
        <div className="admin-category-comp-cont">
            <div className="popups">
                <Popup
                    title={ titlePopup }
                    message={ messagePopup }
                    positiveMessage={ false }
                    isOpened={ showPopup }
                    closePopup={ () => setShowPopup(false) }
                />
            </div>
            <div className="admin-category-cont">
                <input 
                    type="text"
                    value={ categoryName }
                    disabled={ !canEditName }
                    onChange={ (event) => { setCategoryName(event.target.value) } }
                    className={ canEditName ? "name-input editing" : "name-input" }
                    ref={ nameInputRef }
                />
                <button
                    onClick={ () => { nameEditBtnClick() } }
                    className={ canEditName ? "edit-btn editing" : "edit-btn" }
                >
                    { canEditName 
                        ? ( savingCatChanges ? "Saving..." : "Save" ) 
                        : "Edit" 
                    }
                </button>
            </div>
            <div className="admin-item-cont">
                { items.map(item => {
                    return (
                        <AdminItemComp key={ item.id } item={ item } onPatch={(patch) => updateItem(item.id!, patch) }/>
                    )
                })}
            </div>
            <div className="btns-cont">
                <button
                    className="add-item-btn"
                    onClick={ () => { createItem() } }
                >
                    Add Item
                </button>
                <button
                    className="save-btn"
                    onClick={ () => { saveChanges() }}
                >
                    { savingItemChanges ? "Saving Changes..." : "Save Changes" }
                </button>
                <button
                    onClick={ deleteCategory }
                    className="delete-btn"
                >
                    Delete Category
                </button>
            </div>
        </div>
    );
}