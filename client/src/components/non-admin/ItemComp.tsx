import type { Item } from "../../schemas/schemas";
import { useState } from "react";
import "./ItemComp.css";

type ItemCompProp = {
    item: Item;
    widthPx: number;
}

export default function ItemComp({ item, widthPx }: ItemCompProp){
    const [quantity, setQuantity] = useState<number>(0);

    function addPressed(){
        setQuantity(quantity + 1);

    }

    function removePressed(){
        setQuantity(quantity - 1 >= 0 ? quantity - 1 : 0);
    }

    return (
        <button 
            className="item-comp" 
            id={ item.id! } 
            style={{ maxWidth: widthPx }}
        >
            <img src={ item.imageLink }/>
            <div>
                <p className="text name">{ item.name }</p>
                <div className="right-end">
                    <p className="text">{ `$${item.price}` }</p>
                    <div className="quantity-cont">
                        <button onClick={ () => removePressed() } className="remove-btn">
                            -
                        </button>
                        <p>{ quantity }</p>
                        <button onClick={ () => addPressed() } className="add-btn">
                            +
                        </button>
                    </div>
                </div>
            </div>
        </button>
    );
}