import type { Item } from "../../schemas/schemas";
import { useState, useEffect } from "react";
import "./AdminItemComp.css";

type AdminItemCompProp = {
    item: Item
};

export default function AdminItemComp({ item }: AdminItemCompProp){
    const [canEdit, setCanEdit] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<number | "">("");
    const [imageLink, setImageLink] = useState<string>("");
    const [description, setDesc] = useState<string>("");
    const [vegan, setVegan] = useState<boolean>(false);
    const [contains, setContains] = useState<string>("");

    useEffect(() => {
        
        initialize();

        function initialize(){
            let containsItem = "";

            for(let i = 0; i < item.contains.length; i++){
                containsItem += item.contains[i];

                if(i < item.contains.length - 1)
                    containsItem += ", ";
            }

            setName(item.name);
            setPrice(item.price);
            setImageLink(item.imageLink);
            setDesc(item.description);
            setVegan(item.vegan);
            setContains(containsItem);
        }
    },[]);

    return (
        <div className="admin-item-comp-cont">
            <div>
                <div className="edit-btn-cont">
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
                            value={ name }
                            type="text"
                            disabled={ !canEdit }
                            onChange={ event => { setName(event.target.value) }}
                            placeholder="Name"
                        />
                        <div className="price-cont">
                            <p>$</p>
                            <input
                                className="price"
                                value={ price }
                                type="number"
                                disabled={ !canEdit }
                                onChange={ event => { 
                                    const value = event.target.value;
                                    setPrice(value === "" ? "" : Number(value)); 
                                }}
                            />
                        </div>
                    </div>
                    <div className="image-cont">
                        <div className={ canEdit ? "image-edit editable" : "image-edit" }>
                            <input 
                                className="image-url" 
                                type="text" 
                                value={ imageLink }
                                onChange={ event => setImageLink(event.target.value) }
                                placeholder="Image URL"
                            />
                            <input className="image-file" type="file" />
                        </div>
                        <img 
                            src={ 
                                imageLink 
                                    ? imageLink 
                                    : "https://www.betterwithdairy.com/sites/default/files/2025-02/What_Does_Dairy_Cow_Eat.webp" 
                            } 
                            alt={`${item.name}-image` } 
                        />
                    </div>
                    <textarea 
                        className="description"
                        value={ description }
                        disabled={ !canEdit }
                        onChange={ event => setDesc(event.target.value) }
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
                                { vegan ? "Yes" : "No" }
                            </p>
                            <input 
                                type="checkbox"
                                checked={ vegan }
                                onChange={ event => setVegan(event.target.checked) }
                                className={ canEdit ? "vegan-checkbox visible" : "vegan-checkbox" }
                            />
                        </div>
                    </div>
                    <div className="value-cont">
                        <h6>Contains: </h6>
                        <input 
                            type="text"
                            value={ contains }
                            onChange={ event => setContains(event.target.value) }
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