import type { MenuItem } from "../../schemas/schemas";
import { useState } from "react";
import "./ItemComp.css";

type ItemCompProp = {
    item: MenuItem;
    onPatch: (patch: Partial<MenuItem>) => void;
}

export default function ItemComp({ item, onPatch }: ItemCompProp){
    const [activeOverlay, setActiveOverlay] = useState<boolean>(false);
    
    return (
        <div className="item-comp">
            <div className="lay-cont"
                onClick={ () => setActiveOverlay(!activeOverlay) }
            >
                <img src={ item.imageLink } />
                <div className={ activeOverlay ? "overlay active" : "overlay"}>
                    <p className="desc">{ item.description }</p>
                    <div className="non-desc">
                        <p><span>Vegan:</span> { item.vegan ? "Yes" : "No"}</p>
                        <p><span>Contains:</span> { item.contains.map((ing, i) => {
                            let list = "";
                            list += ing;
                            list += i < item.contains.length - 1 ? "," : "";
                            return list;
                        }) }</p>
                    </div>
                </div>
            </div>
            <div className="bot-cont">
                <p className="text name">{ item.name }</p>
                <div className="right-end">
                    <p className="text">{ `$${item.price}` }</p>
                    <div className="quantity-cont">
                        <button 
                            onClick={ () => onPatch({ 
                                quantity: Math.max(item.quantity - 1, 0)
                            }) } 
                            className="remove-btn"
                        >
                            -
                        </button>
                        <p>{ item.quantity }</p>
                        <button 
                            onClick={ () => onPatch({
                                quantity: item.quantity + 1
                            }) } 
                            className="add-btn"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}