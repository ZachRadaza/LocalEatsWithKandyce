import type { Item } from "../../schemas/schemas";
import { useState } from "react";
import "./AdminItemComp.css";

type AdminItemCompProp = {
    item: Item;
    onPatch: (patch: Partial<Item>) => void
};

export default function AdminItemComp({ item, onPatch }: AdminItemCompProp){
    const [canEdit, setCanEdit] = useState<boolean>(false);

    return (
        <div className="admin-item-comp-cont">
            <div>
                <div className="edit-btn-cont">
                    <p className="id">{`ID: ${item.id}`}</p>
                    <button
                        className="edit-btn"
                        onClick={ () => setCanEdit(!canEdit) }
                    >
                        { canEdit ? "Save" : "Edit" }
                    </button>
                </div>
                <div className="top-cont">
                    <div className="headers">
                        <input
                            className="name"
                            value={ item.name }
                            type="text"
                            disabled={ !canEdit }
                            onChange={ event => onPatch({ name: event.target.value })}
                            placeholder="Name"
                        />
                        <div className="price-cont">
                            <p>$</p>
                            <input
                                className="price"
                                value={ item.price }
                                type="number"
                                disabled={ !canEdit }
                                onChange={ event => { 
                                    const price = event.target.value === "" ? "" : Number(event.target.value);
                                    onPatch({ price: price })
                                }}
                            />
                        </div>
                    </div>
                    <div className="image-cont">
                        <div className={ canEdit ? "image-edit editable" : "image-edit" }>
                            <input 
                                className="image-url" 
                                type="text" 
                                value={ item.imageLink }
                                onChange={ event => onPatch({ imageLink: event.target.value }) }
                                placeholder="Image URL"
                            />
                            <input className="image-file" type="file" />
                        </div>
                        <img 
                            src={ 
                                item.imageLink 
                                    ? item.imageLink 
                                    : "https://www.betterwithdairy.com/sites/default/files/2025-02/What_Does_Dairy_Cow_Eat.webp" 
                            } 
                            alt={`${item.name}-image` } 
                        />
                    </div>
                    <textarea 
                        className="description"
                        value={ item.description }
                        disabled={ !canEdit }
                        onChange={ event => onPatch({ description: event.target.value }) }
                        placeholder="Description"
                        rows={ 3 }
                    ></textarea>
                </div>
                <div className="bottom-cont">
                    <div className="value-cont">
                        <h6>Vegan: </h6>
                        <div className="vegan">
                            <p 
                                className={ canEdit ? "value" : "value visible" }
                            >
                                { item.vegan ? "Yes" : "No" }
                            </p>
                            <input 
                                type="checkbox"
                                checked={ item.vegan }
                                onChange={ event => onPatch({ vegan: event.target.checked }) }
                                className={ canEdit ? "vegan-checkbox visible" : "vegan-checkbox" }
                            />
                        </div>
                    </div>
                    <div className="value-cont">
                        <h6>Contains: </h6>
                        <input 
                            type="text"
                            value={ item.contains }
                            onChange={ event => {
                                const value = event.target.value;
                                const list = value.split(",");

                                onPatch({ contains: list }) 
                            }}
                            placeholder="Bad Stuff, eggs, milk"
                            className="contains"
                            disabled={ !canEdit }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}