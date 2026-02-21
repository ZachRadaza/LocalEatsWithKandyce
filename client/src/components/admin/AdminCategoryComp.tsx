import type { Category, Item, AdminItem } from "../../schemas/schemas";
import { useEffect, useState, useRef } from "react";
import { ExtensionService } from "../../utils/ExtensionService";
import AdminItemComp from "./AdminItemComp";
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

    const nameInputRef = useRef<HTMLInputElement>(null);

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

    function updateItem(id: string, patch: Partial<Item>){
        setItems(lastList => lastList.map(
            i => (i.id === id ? {...i, ...patch } : i)
        ));
    }

    async function nameEditBtnClick(){
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
    }

    async function saveChanges(){
        setSavingItemChanges(true);

        for(const item of items){
            if(item.id?.includes("new-item"))
                await ExtensionService.addMenuItem(item);
            else if(item.edited)
                await ExtensionService.updateMenuItem(item);
            
            if(item.deleted && !item.id?.includes('new-item'))
                await ExtensionService.deleteMenuItem(item.id!, item.imageLink);
        }

        setSavingItemChanges(false);
        setRefesh(!refresh);
    }

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
        <div className="admin-category-comp-cont">
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