import type { MenuItem, OrderItem } from "../../schemas/schemas";
import "./IndicatorComp.css";

type IndicatorProp = {
    item: MenuItem | OrderItem;
}

export default function IndicatorComp({ item }: IndicatorProp){
    return (
        <div className="indicator-comp-cont">
            { item.vegan ? 
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" role="img" aria-label="Vegan">
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
            { item.vegetarian ? 
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" role="img" aria-label="Vegetarian">
                    <circle cx="128" cy="128" r="90" fill="none" stroke="currentColor" strokeWidth="10" />
                    <g transform="translate(38,36) scale(0.32)">
                        <path fill="currentColor" d="m140 120h44l72 225 72-225h44l-90 265h-52z"/>
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
            { item.glutenFree ?
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" role="img" aria-label="Gluten Free">
                    <circle cx="128" cy="128" r="90" fill="none" stroke="currentColor" strokeWidth="10" />
                    <g transform="translate(32,28) scale(8)">
                        <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M13 3C13 2.44772 12.5523 2 12 2C11.4477 2 11 2.44772 11 3V6.52779C10.1738 5.78835 9.14158 5.27448 8 5.08296V5C8 4.44772 7.55229 4 7 4C6.44772 4 6 4.44772 6 5V7V10V12V13C6 13.7083 6.12275 14.388 6.34813 15.0189L8.02624 13.4606C8.00891 13.3095 8 13.1558 8 13V12.126C8.36017 12.2187 8.70071 12.3603 9.01411 12.5433L10.5227 11.1425C9.78956 10.6099 8.93115 10.2392 8 10.083V7.12602C9.63464 7.54674 10.8649 8.97478 10.9896 10.709L17.6391 4.53441C17.6909 4.48628 17.7446 4.44143 17.8 4.39984C17.6175 4.15704 17.3271 4 17 4C16.4477 4 16 4.44772 16 5V5.08296C14.8584 5.27448 13.8262 5.78835 13 6.52779V3ZM11 18.917C10.2346 18.7886 9.51825 18.5153 8.88027 18.1262L10.4352 16.6823C10.617 16.7597 10.8056 16.824 11 16.874V16.1579L13.9245 13.4423C13.3472 14.1356 13 15.0273 13 16V16.874C14.7252 16.4299 16 14.8638 16 13V12.126C15.5182 12.25 15.0715 12.4615 14.678 12.7426L18 9.65785V10V12V13C18 15.973 15.8377 18.441 13 18.917V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V18.917ZM19.6805 6.73279C20.0852 6.35699 20.1086 5.72426 19.7328 5.31955C19.357 4.91484 18.7243 4.8914 18.3196 5.26721L4.31955 18.2672C3.91484 18.643 3.89141 19.2757 4.26721 19.6805C4.64301 20.0852 5.27574 20.1086 5.68046 19.7328L19.6805 6.73279Z"/>
                    </g>
                </svg>
                : <></>
            }
            { item.dairyFree ?
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" role="img" aria-label="Dairy Free">
                    <circle cx="128" cy="128" r="90" fill="none" stroke="currentColor" strokeWidth="10"/>
                    <g transform="translate(32,28) scale(8)">
                        <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M9 2C8.44771 2 8 2.44772 8 3C8 3.55228 8.44771 4 9 4V6.58579L7.17157 8.41421C6.42142 9.16436 6 10.1818 6 11.2426V15.3421L8 13.485V11.2426C8 10.7122 8.21071 10.2035 8.58578 9.82843L10.4142 8C10.7893 7.62493 11 7.11622 11 6.58579V4H13V6.58579C13 7.11622 13.2107 7.62493 13.5858 8L13.7404 8.15462L15.207 6.79279L15 6.58579V4C15.5523 4 16 3.55228 16 3C16 2.44772 15.5523 2 15 2H9ZM10 22C8.60065 22 7.36913 21.2814 6.6543 20.1931L8.16302 18.7922C8.46985 19.5027 9.17685 20 10 20H14C15.1046 20 16 19.1046 16 18V11.515L17.7607 9.88001C17.9176 10.3128 18 10.7735 18 11.2426V18C18 20.2091 16.2091 22 14 22H10ZM19.6804 6.73279C20.0852 6.35699 20.1086 5.72426 19.7328 5.31955C19.357 4.91484 18.7243 4.8914 18.3195 5.26721L4.31955 18.2672C3.91483 18.643 3.8914 19.2757 4.2672 19.6805C4.64301 20.0852 5.27574 20.1086 5.68045 19.7328L19.6804 6.73279Z"/>
                    </g>
                </svg>
                : <></>
            }
            { item.ketoFriendly ?
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" role="img" aria-label="Keto Friendly">
                    <circle cx="128" cy="128" r="90" fill="none" stroke="currentColor" strokeWidth="10"/>
                    <path fill="currentColor" d="M96 76h20v52l44-52h24l-46 54 50 60h-26l-46-56v56H96z"/>
                </svg>
                : <></>
            }
            { item.spicy?
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" role="img" aria-label="Halal">
                    <circle cx="128" cy="128" r="90" fill="none" stroke="currentColor" strokeWidth="10"/>
                    <g transform="translate(40,40) scale(6)">
                        <path fill="currentColor" d="M14.1,14.7L14.1,14.7c0,4.8-2.1,9.3-5.8,12.2l-1.7,1.3c-0.4,0.3-0.5,0.8-0.2,1.3C6.6,29.8,6.9,30,7.3,30c0.1,0,0.2,0,0.3-0.1l4.1-1.5c5.9-2.2,10.1-7.5,11.1-13.8C19.9,13.8,17,13.8,14.1,14.7z"/>
                        <path fill="currentColor" d="M20,7.7c0.1-1.5,1-2.9,2.3-3.9c0.4-0.3,0.5-1,0.2-1.4c-0.3-0.4-1-0.5-1.4-0.2c-1.8,1.3-3,3.2-3.1,5.3c-2.2,0.3-4,2.2-4,4.5v0.6c2.9-0.8,6-0.8,8.9,0c0-0.2,0-0.4,0-0.6C23,10,21.8,8.3,20,7.7z"/>
                    </g>
                </svg>
                : <></>
            }
        </div>
    );
}