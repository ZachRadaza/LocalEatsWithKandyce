import "./Menu.css";
import { ExtensionService } from "../../utils/BackendExtension";
import type { Category, Item } from "../../schemas/schemas";
import { useState, useEffect } from "react";
import ItemComp from "../../components/non-admin/ItemComp";


export default function Menu(){
    const [categories, setCategories] = useState<Category[]>([]);
    const [menu, setMenu] = useState<Map<Category, Item[]>>(new Map());
    const [activeNavId, setActiveNavId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        init();

        async function init(){
            try{
                setLoading(true);
                setError(null);

                const categoriesData = await ExtensionService.fetchCategories();
                if(cancelled) 
                    return;

                const allCategories = [...categoriesData, { id: "custom", name: "Custom" }, ];
                setCategories(allCategories);

                if(allCategories.length > 0)
                    setActiveNavId(allCategories[0].id);

                const realCategories = categoriesData;

                const results = await Promise.all(
                    realCategories.map(async (category) => {
                        const items = await ExtensionService.fetchMenuItems(category);
                        return [category, items] as const;
                    })
                );

                if(cancelled) 
                    return;

                setMenu(() => {
                    const next = new Map<Category, Item[]>();
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
        setActiveNavId(clickedId);
    }

    if(loading)
        return (
            <div>
                <h1>loading</h1>
            </div>
        );

    if(error)
        return (
            <div>
                <h1>Error: {error} </h1>
            </div>
        );

    return (
        <div className="menu-cont">
            <nav>
                { categories.map(category => (
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
                { [...menu.entries()].map(([category, items], index) => {
                    const isLeft = index % 2 === 0;

                    return (
                        <div 
                            className="category"
                            key={ `div-${ category.id! }` } 
                            id={ category.id! }
                        >
                            <div className={ isLeft ? "category-name left" : "category-name right" }>
                                { [...category.name].map(c => (
                                    <h5>{ c }</h5>
                                )) }
                            </div>
                            { items.map(item => (
                                <ItemComp key={ item.id } item={ item } widthPx={ 300 } />
                            )) }
                        </div>
                    );
                })
                }
            </div>
        </div>
    );
}