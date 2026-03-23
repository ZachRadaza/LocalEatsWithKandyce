import type { OrderFull } from "../../schemas/schemas";
import { useState } from "react";
import OrderItemComp from "../non-admin/OrderItemComp";
import "./OrderComp.css";
import IndicatorComp from "../non-admin/IndicatorComp";

type OrderCompProp = {
    order: OrderFull;
    acceptOrder: () => void;
    declineOrder: () => void;
    completeOrder: () => void;
}

export default function OrderComp({ order, acceptOrder, declineOrder, completeOrder }: OrderCompProp){
    const [extended, setExtended] = useState<boolean>(false);

    return (
        <div className="order-comp-cont"
            onClick={ () => setExtended(!extended) }
        >
            <div className="header">
                <div className="title pair">
                    <h5 className="customer-name">{ order.customers.name ?? "Customer" }</h5>
                    <p className="order-id">ID: { order.id }</p>
                </div>
                <div className="header-middle">
                    <div className="logistics pair">
                        <h6>${ order.price }</h6>
                        <p>{ order.orderItems.length } items</p>
                    </div>
                    <h6>Deliver on { new Date(order.dateDue).toLocaleDateString() }</h6>
                </div>
                <div className="btns-cont">
                    <button
                        className="accept green"
                        onClick={ (event) => {
                            event.stopPropagation();
                            acceptOrder();
                        } }
                        disabled={ order.accepted }
                    >
                        { order.accepted ? "Accepted" : "Accept" }
                    </button>
                    <button
                        className="decline red"
                        onClick={(event) => {
                            event.stopPropagation();
                            declineOrder();
                        }}
                    >
                        Decline
                    </button>
                </div>
            </div>
            <div className={ extended ? "extension extended" : "extension" }>
                <div>
                    <div className="order-items">
                        { order.orderItems.map(orderItem => 
                            <OrderItemComp 
                                key={ orderItem.id }
                                orderItem={ orderItem }
                                patchOrderItem={ () => null }
                                enableBtns={ false }
                            />
                        ) }
                        { order.customItems.map(customItems =>
                            <div 
                                key={ customItems.id }
                                className="custom-order"
                            >
                                <div className="custom-top-cont">
                                    <h5>{ customItems.name } <span>Custom Order</span></h5>
                                    <IndicatorComp item={ customItems } />
                                </div>
                                <p>{ customItems.description }</p>
                            </div>
                        )}
                        <div className="total">
                            <h6>Total</h6>
                            <p>${ order.price }</p>
                        </div>
                        <div className="comment">
                            <h6>Comment: </h6>
                            <p>{ order.comment }</p>
                        </div>
                    </div>
                    <div className="information-cont">
                        <div>
                            <div className="customer-info">
                                <p>{ order.customers.name }</p>
                                <p>{ order.customers.email } { order.customers.phonePreffered ? "" : "(Preffered)"}</p>
                                <p>{ order.customers.phone } { order.customers.phonePreffered ? "(Preferred)" : ""}</p>
                            </div>
                            <div className="order-info">
                                <div>
                                    <h6>Ordered At: </h6>
                                    <h6>Due At: </h6>
                                    <h6>Deliver At: </h6>
                                </div>
                                <div>
                                    <p>{ new Date(order.dateOrdered).toLocaleDateString() }</p>
                                    <p>{ new Date(order.dateDue).toLocaleDateString() }</p>
                                    <p>{ order.location }</p>
                                </div>
                            </div>
                            <div className="complete-cont">
                                { order.accepted && 
                                    <button
                                        className="yellow"
                                        onClick={ () => completeOrder() }
                                    >
                                        Order Complete
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}