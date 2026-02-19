import type { MenuItem } from "../../pages/non-admin/Menu";
import "./ItemComp.css";

type ItemCompProp = {
    item: MenuItem;
    onPatch: (patch: Partial<MenuItem>) => void;
}

export default function ItemComp({ item, onPatch }: ItemCompProp){
    return (
        <div 
            className="item-comp" 
            id={ item.id! } 
        >
            <img src={ item.imageLink }/>
            <div>
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