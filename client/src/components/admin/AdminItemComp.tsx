import { useState } from "react";
import type { AdminItem } from "../../schemas/schemas";
import "./AdminItemComp.css";

type AdminItemCompProp = {
    item: AdminItem;
    onPatch: (patch: Partial<AdminItem>) => void
};

export default function AdminItemComp({ item, onPatch }: AdminItemCompProp){
    const [canEdit, setCanEdit] = useState<boolean>(false);
    const [deleted, setDeleted] = useState<boolean>(false);
    const [unfilledName, setUnfilledName] = useState<boolean>(false);
    const [unfilledPrice, setUnfilledPrice] = useState<boolean>(false);
    const [unfilledDesc, setUnfilledDesc] = useState<boolean>(false);

    function verifyFilled(){
        return (
            !item.name || !item.description ||
            !item.name.trim() ||
            !item.description.trim() ||
            !item.price
        )
    }

    function markUnfilled(){
        !item.name || !item.name.trim()
            ? setUnfilledName(true)
            : setUnfilledName(false);

        !item.description || !item.description.trim()
            ? setUnfilledDesc(true)
            : setUnfilledDesc(false);

        !item.price ? setUnfilledPrice(true) : setUnfilledPrice(false);
    }

    return (
        <div className={ !deleted ? "admin-item-comp-cont" : "admin-item-comp-cont deleted" }>
            <div className="top-part-item">
                <div className="edit-btns-cont">
                    <p className="id">{`ID: ${item.id}`}</p>
                    <div className="btns-cont">
                        <button
                            className={ !canEdit ? "edit-btn blue" : "edit-btn green" }
                            onClick={ () => {
                                if(canEdit){
                                    !verifyFilled()
                                        ? setCanEdit(!canEdit)
                                        : null;

                                    markUnfilled()
                                } else
                                    setCanEdit(!canEdit);

                                item.edited = true;
                            }}
                        >
                            { canEdit ? "Save" : "Edit" }
                        </button>
                        <button
                            className={ !deleted ? "delete-btn red" : "delete-btn red deleted" }
                            onClick={ () => {
                                setDeleted(!deleted);
                                item.deleted = !item.deleted;
                            } }
                        >
                            Delete
                        </button>
                    </div>
                </div>
                <div className="top-cont">
                    <div className="headers">
                        <input
                            className={ !unfilledName ? "name" : "name unfilled" }
                            value={ item.name }
                            type="text"
                            disabled={ !canEdit }
                            onChange={ event => onPatch({ name: event.target.value })}
                            placeholder="Name"
                        />
                        <div className="price-cont">
                            <p>$</p>
                            <input
                                className={ !unfilledPrice ? "price" : "price unfilled" }
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
                            <input 
                                className="image-file" 
                                type="file" 
                                onChange={ event => {
                                    const file = event.target.files?.[0] ?? null;
                                    item.file = file;
                                }}
                            />
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
                        className={ !unfilledDesc ? "description" : "description unfilled" }
                        value={ item.description }
                        disabled={ !canEdit }
                        onChange={ event => onPatch({ description: event.target.value }) }
                        placeholder="Description"
                        rows={ 3 }
                    ></textarea>
                </div>
            </div>
            <div className="bot-part-item">
                <div className="bottom-cont">
                    <div className="checkboxes">
                        <div className="value-cont">
                            <p>Vegan: </p>
                            <div className="checkbox-cont">
                                { !canEdit
                                    ? <p className="value">
                                        { item.vegan ? "Yes" : "No" }
                                    </p>
                                    : <input 
                                        type="checkbox"
                                        checked={ item.vegan }
                                        onChange={ event => onPatch({ vegan: event.target.checked }) }
                                        className="checkbox"
                                    />
                                }
                            </div>
                        </div>
                        <div className="value-cont">
                            <p>Vegetarian: </p>
                            <div className="checkbox-cont">
                                { !canEdit
                                    ? <p className="value">
                                        { item.vegetarian ? "Yes" : "No" }
                                    </p>
                                    : <input 
                                        type="checkbox"
                                        checked={ item.vegetarian }
                                        onChange={ event => onPatch({ vegetarian: event.target.checked }) }
                                        className="checkbox"
                                    />
                                }
                            </div>
                        </div>
                        <div className="value-cont">
                            <p>Halal: </p>
                            <div className="checkbox-cont">
                                { !canEdit
                                    ? <p className="value">
                                        { item.halal ? "Yes" : "No" }
                                    </p>
                                    : <input 
                                        type="checkbox"
                                        checked={ item.halal }
                                        onChange={ event => onPatch({ halal: event.target.checked }) }
                                        className="checkbox"
                                    />
                                }
                            </div>
                        </div>
                        <div className="value-cont">
                            <p>Gluten-free: </p>
                            <div className="checkbox-cont">
                                { !canEdit
                                    ? <p className="value">
                                        { item.glutenFree ? "Yes" : "No" }
                                    </p>
                                    : <input 
                                        type="checkbox"
                                        checked={ item.glutenFree }
                                        onChange={ event => onPatch({ glutenFree: event.target.checked }) }
                                        className="checkbox"
                                    />
                                }
                            </div>
                        </div>
                        <div className="value-cont">
                            <p>Dairy-free: </p>
                            <div className="checkbox-cont">
                                { !canEdit
                                    ? <p className="value">
                                        { item.dairyFree ? "Yes" : "No" }
                                    </p>
                                    : <input 
                                        type="checkbox"
                                        checked={ item.dairyFree }
                                        onChange={ event => onPatch({ dairyFree: event.target.checked }) }
                                        className="checkbox"
                                    />
                                }
                            </div>
                        </div>
                        <div className="value-cont">
                            <p>Keto-friendly: </p>
                            <div className="checkbox-cont">
                                { !canEdit
                                    ? <p className="value">
                                        { item.ketoFriendly ? "Yes" : "No" }
                                    </p>
                                    : <input 
                                        type="checkbox"
                                        checked={ item.ketoFriendly }
                                        onChange={ event => onPatch({ ketoFriendly: event.target.checked }) }
                                        className="checkbox"
                                    />
                                }
                            </div>
                        </div>
                        <div className="value-cont">
                            <p>Spicy: </p>
                            <div className="checkbox-cont">
                                { !canEdit
                                    ? <p className="value">
                                        { item.spicy ? "Yes" : "No" }
                                    </p>
                                    : <input 
                                        type="checkbox"
                                        checked={ item.spicy }
                                        onChange={ event => onPatch({ spicy: event.target.checked }) }
                                        className="checkbox"
                                    />
                                }
                            </div>
                        </div>
                    </div>
                    <div className="value-cont">
                        <p>Contains: </p>
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