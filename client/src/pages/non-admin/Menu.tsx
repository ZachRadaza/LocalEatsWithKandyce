import type { Category, MenuItem } from "../../schemas/schemas";
import { useState } from "react";
import CategoryComp from "../../components/non-admin/CategoryComp";
import { scrollToID } from "../../utils/RandomFunctions";
import { useOutletContext } from "react-router-dom";
import "./Menu.css";

type MenuContext = {
    addOrderItem: (item: MenuItem) => void;
    categories: Set<Category>;
    menu: Map<string, MenuItem[]>;
    setMenu: React.Dispatch<React.SetStateAction<Map<string, MenuItem[]>>>;
}

export default function Menu(){
    const { addOrderItem, categories, menu, setMenu } = useOutletContext<MenuContext>();

    const [activeNavId, setActiveNavId] = useState<string | null>([...categories][0].id ?? null);

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