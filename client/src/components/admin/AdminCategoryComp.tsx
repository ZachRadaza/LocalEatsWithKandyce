import type { Category, Item } from "../../schemas/schemas";
import { useEffect, useState, useRef } from "react";
import { ExtensionService } from "../../utils/ExtensionService";
import AdminItemComp from "./AdminItemComp";
import "./AdminCategoryComp.css";

type AdminCategoryCompProp = {
    category: Category
}

export default function AdminCategoryComp({ category }: AdminCategoryCompProp){
    const [items, setItems] = useState<Item[]>([]);
    const [categoryName, setCategoryName] = useState<string>("");
    const [canEditName, setCanEditName] = useState<boolean>(false);
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

                if(cancelled)
                    return;

                setItems(items);
                
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
    }, [category]);

    useEffect(() => {
        if (canEditName) {
            nameInputRef.current?.focus();
        }
    }, [canEditName]);

    async function nameEditBtnClick(){
        if(canEditName){
            
        }

        setCanEditName(!canEditName);
    }

    async function deleteBtnClick(){

    }

    function createItem(){
        const newItem: Item = {
            id: `new-item-${items.length + 1}`,
            name: "",
            description: "",
            imageLink: "",
            contains: [],
            vegan: false,
            price: 0,
            category: category,
            categoryID: category.id
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
                    { canEditName ? "Save" : "Edit" }
                </button>
            </div>
            <div className="admin-item-cont">
                { items.map(item => {
                    return (
                        <AdminItemComp key={ item.id } item={ item }/>
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
                >
                    Save Changes
                </button>
                <button
                    onClick={ () => { deleteBtnClick() }}
                    className="delete-btn"
                >
                    Delete Category
                </button>
            </div>
        </div>
    );
}