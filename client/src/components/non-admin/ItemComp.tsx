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
                        <p><span>Vegan:</span> { item.vegan ? "Yes" : "No" }</p>
                        <p><span>Halal:</span> { item.halal ? "Yes" : "No" }</p>
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
                <div className="left-end">
                    <p className="text name">{ item.name }</p>
                    { item.vegan ? 
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="160" height="160" role="img" aria-label="Vegan">
                            <circle cx="128" cy="128" r="90" fill="none" stroke="currentColor" strokeWidth="10" />
                            <g transform="translate(48,40) scale(0.35)">
                                <path fill="currentColor" d="M459.996,8.495c-0.667-2.707-2.781-4.821-5.488-5.488c-12.167-2.997-24.935-3.758-37.956-2.255
                                c-30.703,3.54-60.875,18.755-84.961,42.84c-24.085,24.085-39.299,54.258-42.84,84.961c-1.331,11.544-0.877,22.889,1.332,33.794
                                c-0.105,0.11-0.22,0.206-0.319,0.324c-33.014,39.222-55.366,81.822-70.263,123.99c-12.788-49.63-31.862-95.286-56.904-135.998
                                C125.318,90.058,74.456,39.741,11.421,1.106C8.125-0.914,3.835-0.098,1.51,2.989c-2.325,3.087-1.924,7.435,0.927,10.044
                                C79,83.108,132.937,164.55,162.752,255.096c12.556,38.133,29.249,100.395,29.249,200.404c0,4.143,3.358,7.5,7.5,7.5h32
                                c4.142,0,7.5-3.357,7.5-7.5c0-5.437-0.029-11.003-0.059-16.688c-0.392-74.703-0.886-169.281,63.947-265.461
                                c6.104,1.096,12.338,1.648,18.663,1.648c4.262-0.001,8.567-0.25,12.897-0.75c30.703-3.54,60.875-18.755,84.96-42.84
                                c24.085-24.085,39.3-54.259,42.841-84.961C463.753,33.431,462.994,20.661,459.996,8.495z"/>
                            </g>
                        </svg>
                        : <></>
                    }
                    { item.halal ? 
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" role="img" aria-label="حلال">
                            <circle cx="128" cy="128" r="90" fill="none" stroke="currentColor" strokeWidth="10"/>
                            <text x="128" y="150" textAnchor="middle" fontFamily="'Cairo', 'Noto Kufi Arabic', 'Noto Sans Arabic', sans-serif" fontSize="72" fontWeight="900" direction="rtl" unicodeBidi="plaintext" >
                                حلال
                            </text>
                        </svg>
                        : <></>
                    }
                </div>
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