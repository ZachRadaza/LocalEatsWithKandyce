import type { OrderMenuItem } from "../../schemas/schemas";
import "./OrderMenuItemComp.css";

type OrderMenuItemProp = {
    orderItem: OrderMenuItem;
    patchOrderItem: (patch: Partial<OrderMenuItem>) => void;
}

export default function OrderMenuItemComp({ orderItem, patchOrderItem }: OrderMenuItemProp){
    return (
        <div className="order-menu-item">
            <div className="info-cont">
                <img 
                    className="item-image"
                    src={ orderItem.imageLink }
                />
                <div className="text-cont">
                    <h5 className="name">{ orderItem.name }</h5>
                    <div className="btns-cont">
                        <button
                            onClick={ () => patchOrderItem({ quantity: Math.max(orderItem.quantity - 1, 0) })}
                        >
                            -
                        </button>
                        <p>{ orderItem.quantity }</p>
                        <button
                            onClick={ () => patchOrderItem({ quantity: orderItem.quantity + 1 }) }
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
            <div className="price-cont">
                <p className="price">${ orderItem.price }</p>
            </div>
        </div>
    );
}