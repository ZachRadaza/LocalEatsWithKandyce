import type { Category, MenuItem } from "../../schemas/schemas";
import React, { useState, useEffect } from "react";
import { scrollToID } from "../../utils/RandomFunctions";
import { useLocation, useOutletContext } from "react-router-dom";
import CustomItemComp from "../../components/non-admin/CustomItemComp";
import "./Menu.css";
import ItemComp from "../../components/non-admin/ItemComp";

type MenuContext = {
    addOrderItem: (item: MenuItem) => void;
    categories: Set<Category>;
    menu: Map<string, MenuItem[]>;
    setMenu: React.Dispatch<React.SetStateAction<Map<string, MenuItem[]>>>;
    customItems: MenuItem[];
    setCustomItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
    patchCustomItem: (customItemID: string, patch: Partial<MenuItem>) => void;
    deleteCustomItem: (customItemID: string) => void
}

export default function Menu(){
    const { 
        addOrderItem, 
        categories, 
        menu, setMenu, 
        customItems, setCustomItems, 
        patchCustomItem, deleteCustomItem
    } = useOutletContext<MenuContext>();

    const [activeNavId, setActiveNavId] = useState<string | null>([...categories][0].id ?? null);
    const location = useLocation();

    const patchMenuItem = (categoryID: string, itemID: string, patch: Partial<MenuItem>) => {
        const items = menu.get(categoryID) ?? [];
        const patchedItem = items.find(item => item.id === itemID);

        if(!patchedItem)
            return;

        const updated = { ...patchedItem, ...patch };

        setMenu(oldMenu => {
            const newMenu = new Map(oldMenu);
            const items = newMenu.get(categoryID) ?? [];
            
            newMenu.set(categoryID, items.map(item => (item.id === itemID ? updated : item)));
            return newMenu;
        });

        addOrderItem(updated);
    };

    function categoryClicked(clickedId: string | null){
        if(!clickedId)
            return;

        setActiveNavId(clickedId);

        scrollToID(clickedId)
    }

    function addCustomItem(){
        const newCustomItem: MenuItem = {
            id: `custom-item-${crypto.randomUUID()}`,
            name: "",
            description: "",
            imageLink: "",
            contains: [],
            price: 0,
            category: null,
            categoryID: [...categories][0].id,
            custom: true,
            quantity: 1,
            vegan: false,
            halal: false,
            ketoFriendly: false,
            vegetarian: false,
            glutenFree: false,
            dairyFree: false,
            spicy: false
        };

        setCustomItems(oldItems => {
            return [...oldItems, newCustomItem];
        });
    }

    useEffect(() => {
        if(!location.hash)
            return;

        const id = location.hash.replace("#", "");
        const element = document.getElementById(id);

        if(element){
            element.scrollIntoView({ behavior: "smooth" });
        }
    }, [location]);

    return (
        <div className="menu-cont">
            <nav>
                { [...categories].map(category => (
                    <button 
                        key={ `nav-${ category.id }` }
                        className={ category.id === activeNavId ? "active" : "inactive" }
                        onClick={ () => categoryClicked(category.id) }
                    >
                        { category.name }
                    </button>
                )) }
            </nav>
            <div className="menu">
                { [...menu.entries()].map(([categoryID, items], index) => {
                    const isLeft = index % 2 === 0;
                    const category = [...categories].find(cat => cat.id === categoryID)

                    return (
                        <div className="category" id={ category!.id! } key={ category!.id! }>
                            <div className={ isLeft ? "category-name left" : "category-name right" }>
                                { [...category!.name].map((c, i) => (
                                    <h5 key={ `${category!.id}-${i}${c}` }>{c}</h5>
                                )) }
                            </div>
                            <div className="category-items-cont">
                                <p className="category-description">{ category?.description }</p>
                                <div className="category-items">
                                    { items.map(item => 
                                        (
                                            <ItemComp
                                                key={ item.id }
                                                item={ item }
                                                onPatch={ (patch) => patchMenuItem(categoryID, item.id!, patch) }
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                }) }
                <div 
                    className="category"
                    key={ `div-custom` }
                    id="custom-item"
                >
                    <div className="category-name right">
                        <h5>C</h5>
                        <h5>U</h5>
                        <h5>S</h5>
                        <h5>T</h5>
                        <h5>O</h5>
                        <h5>M</h5>
                    </div>
                    <div className="category-items">
                        { customItems.map(item => 
                            <CustomItemComp
                                key={ item.id }
                                customItem={ item }
                                onPatch={ (patch) => patchCustomItem(item.id!, patch) }
                                deleteCustomItem={ () => deleteCustomItem(item.id!) }
                            />
                        ) }
                        <button
                            className="add-custom blue"
                            onClick={ () => addCustomItem() }
                        >
                            Add Custom Item
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}