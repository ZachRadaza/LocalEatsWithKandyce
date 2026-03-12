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
                <h6>Description</h6>
                <textarea
                    value={ customItem.description }
                    onChange={ (event) => onPatch({ ...customItem, description: event.target.value })}
                    rows={ 3 }
                    placeholder="Description of product, specific intrucitons, etc..."
                >
                </textarea>
            </div>
            <div className="others-cont">
                <div className="checkboxes">
                    <div className="checkbox-cont">
                        <input 
                            checked={ customItem.vegan }
                            onChange={ (event) => onPatch({ ...customItem, vegan: event.target.checked })}
                            type="checkbox"
                        />
                        <p>Vegan</p>
                    </div>
                    <div className="checkbox-cont">
                        <input 
                            checked={ customItem.vegetarian }
                            onChange={ (event) => onPatch({ ...customItem, vegetarian: event.target.checked })}
                            type="checkbox"
                        />
                        <p>Vegetarian</p>
                    </div>
                    <div className="checkbox-cont">
                        <input 
                            checked={ customItem.halal }
                            onChange={ (event) => onPatch({ ...customItem, halal: event.target.checked })}
                            type="checkbox"
                        />
                        <p>Halal</p>
                    </div>
                    <div className="checkbox-cont">
                        <input 
                            checked={ customItem.glutenFree }
                            onChange={ (event) => onPatch({ ...customItem, glutenFree: event.target.checked })}
                            type="checkbox"
                        />
                        <p>Gluten-free</p>
                    </div>
                    <div className="checkbox-cont">
                        <input 
                            checked={ customItem.dairyFree }
                            onChange={ (event) => onPatch({ ...customItem, dairyFree: event.target.checked })}
                            type="checkbox"
                        />
                        <p>Dairy-free</p>
                    </div>
                    <div className="checkbox-cont">
                        <input 
                            checked={ customItem.ketoFriendly }
                            onChange={ (event) => onPatch({ ...customItem, ketoFriendly: event.target.checked })}
                            type="checkbox"
                        />
                        <p>Keto-friendly</p>
                    </div>
                    <div className="checkbox-cont">
                        <input 
                            checked={ customItem.spicy }
                            onChange={ (event) => onPatch({ ...customItem, spicy: event.target.checked })}
                            type="checkbox"
                        />
                        <p>Spicy</p>
                    </div>
                </div>
                <div className="item-controls">
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