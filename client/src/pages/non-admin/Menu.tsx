import "./Menu.css";
import { ExtensionService } from "../../utils/ExtensionService";
import type { Category, Item } from "../../schemas/schemas";
import { useState, useEffect } from "react";
import CategoryComp from "../../components/non-admin/CategoryComp";
import { scrollToID } from "../../utils/RandomFunctions";
import { useOutletContext } from "react-router-dom";

export type MenuItem = Item & {
    quantity: number;
}

type OutletContext = {
    addOrderItem: (item: MenuItem) => void;
}

export default function Menu(){
    const { addOrderItem } = useOutletContext<OutletContext>();

    const [categories, setCategories] = useState<Set<Category>>(new Set);
    const [menu, setMenu] = useState<Map<string, MenuItem[]>>(new Map());
    const [activeNavId, setActiveNavId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

    useEffect(() => {
        let cancelled = false;

        init();

        async function init(){
            try{
                setLoading(true);
                setError(null);

                const categoriesData = await ExtensionService.getCategories();
                if(cancelled) 
                    return;

                const allCategories = [...categoriesData, { id: "custom-item", name: "Custom" }, ];
                setCategories(new Set(allCategories));

                if(allCategories.length > 0)
                    setActiveNavId(allCategories[0].id);

                const realCategories = categoriesData;

                const results = await Promise.all(
                    realCategories.map(async (category) => {
                        const items = await ExtensionService.getMenuItems(category.id!);
                        const menuItems = items.map(item => {
                            const menuItem: MenuItem = { ...item, quantity: 0 };
                            return menuItem
                        })

                        return [category.id!, menuItems] as const;
                    })
                );

                if(cancelled) 
                    return;

                setMenu(() => {
                    const next = new Map<string, MenuItem[]>();
                    for(const [category, items] of results) 
                        next.set(category, items);

                    return next;
                });
            } catch(error){
                if(cancelled) 
                    return;
                setError("Failed to load menu");
            } finally {
                if(cancelled) 
                    return;
                setLoading(false);
            }
        }

        return () => {
            cancelled = true;
        };
    }, []);

    function categoryClicked(clickedId: string | null){
        if(!clickedId)
            return;

        setActiveNavId(clickedId);

        scrollToID(clickedId)
    }

    if(loading)
        return (
            <div className="loading-page">
                <h1>loading</h1>
            </div>
        );

    if(error)
        return (
            <div className="error-page">
                <h1>Error: {error} </h1>
            </div>
        );

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
                        <CategoryComp 
                            key={ `div-${ categoryID }` } 
                            category={ category! } 
                            items={ items } 
                            isLeft={ isLeft }
                            onPatchItem={ patchMenuItem }
                        />
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
                        
                    </div>
                </div>
            </div>
        </div>
    );
}