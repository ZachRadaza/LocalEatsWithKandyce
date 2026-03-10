import type { MenuItem } from "../../schemas/schemas";
import "./CustomItemComp.css";

type CustomItemCompProp = {
    customItem: MenuItem;
    onPatch: (patch: Partial<MenuItem>) => void;
    deleteCustomItem: () => void;
}

export default function CustomItemComp({ customItem, onPatch, deleteCustomItem }: CustomItemCompProp){
    const validInput = (value: string) => {
        return value ? "input-pair" : "input-pair invalid";
    };

    return (
        <div className="custom-item-cont">
            <h5>Custom Item</h5>
            <div className={ validInput(customItem.name) }>
                <h6>Name</h6>
                <input 
                    value={ customItem.name }
                    onChange={ (event) => onPatch({ ...customItem, name: event.target.value })}
                    type="text"
                    placeholder="Cool bread"
                />
            </div>
            <div className={ validInput(customItem.description) }>
                <h6>Desciption</h6>
                <textarea
                    value={ customItem.description }
                    onChange={ (event) => onPatch({ ...customItem, description: event.target.value })}
                    rows={ 3 }
                    placeholder="Description of product, specific intrucitons, etc..."
                >
                </textarea>
            </div>
            <div className="others-cont">
                <div>
                    <div className="checkbox-cont">
                        <h6>Vegan</h6>
                        <input 
                            checked={ customItem.vegan }
                            onChange={ (event) => onPatch({ ...customItem, vegan: event.target.checked })}
                            type="checkbox"
                        />
                    </div>
                    <div className="checkbox-cont">
                        <h6>Halal</h6>
                        <input 
                            checked={ customItem.halal }
                            onChange={ (event) => onPatch({ ...customItem, halal: event.target.checked })}
                            type="checkbox"
                        />
                    </div>
                </div>
                <div>
                    <div className="quantity-cont">
                        <button
                            onClick={ () => { 
                                const quantity = Math.max(customItem.quantity - 1, 0);

                                quantity 
                                    ? onPatch({ ...customItem, quantity: quantity }) 
                                    : deleteCustomItem();
                            }}
                        >
                            -
                        </button>
                        <p>{ customItem.quantity }</p>
                        <button
                            onClick={ () => onPatch({ ...customItem, quantity: customItem.quantity + 1 })}
                        >
                            +
                        </button>
                    </div>
                    <button 
                        className="delete-btn red"
                        onClick={ () => deleteCustomItem() }
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}