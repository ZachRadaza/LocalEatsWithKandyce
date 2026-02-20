import type React from "react";
import type { OrderMenuItem } from "../../components/non-admin/OrderMenuItemComp";
import type { Order, Customer } from "../../schemas/schemas";
import { useOutletContext } from "react-router-dom";
import OrderMenuItemComp from "../../components/non-admin/OrderMenuItemComp";
import { useMemo, useState } from "react";
import "./Cart.css";
import { ExtensionService } from "../../utils/ExtensionService";

type CartContextType = {
    orderItems: OrderMenuItem[];
    setOrderItems: React.Dispatch<React.SetStateAction<OrderMenuItem[]>>;
};

export default function Cart(){
    const { orderItems, setOrderItems } = useOutletContext<CartContextType>()

    const [placingOrder, setPlacingOrder] = useState<boolean>(false);
    const [isPickUp, setIsPickUp] = useState<boolean>(false);

    const [location, setLocation] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [comment, setComment] = useState<string>("");
    const [dateDue, setDateDue] = useState<string>(() => {
        const now = new Date();
        return now.toISOString().slice(0, 16); 
    });

    const totalAmount = useMemo(() => {
        return orderItems.reduce((total, oi) => {
            return total + (oi.quantity * oi.price);
        }, 0)
    }, [orderItems]);

    const validInput = (value: string) => {
        return value ? "input-cont" : "input-cont invalid";
    };

    const formatPhone = (value: string) => {
        const digits = value.replace(/\D/g, "").slice(0, 10);

        const parts = [];
        if(digits.length > 0) 
            parts.push("(" + digits.slice(0, 3));

        if(digits.length >= 4) 
            parts.push(") " + digits.slice(3, 6));

        if(digits.length >= 7) 
            parts.push("-" + digits.slice(6, 10));

        return parts.join("");
    };

    function updateOrderItem(id: string, patch: Partial<OrderMenuItem>){
        setOrderItems(oldOI => {
            const patched = oldOI.map(oi =>
                oi.id === id ? { ...oi, ...patch } : oi
            );

            return patched.filter(oi => oi.quantity !== 0);
        })
    }

    function getTomorrowString() {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        return date.toISOString().slice(0, 16);
    }

    async function placeOrder(){
        if(!orderItems.length)
            return;

        if(!validateInputs())
            return;


        setPlacingOrder(true);

        const customer: Customer = {
            id: null,
            name: name,
            phone: phoneNumber,
            email: email
        }

        const order: Order = {
            id: null,
            orderItems: orderItems,
            dateOrdered: "",
            dateDue: dateDue,
            customer: customer,
            accepted: false,
            location: location,
            finished: false,
            comment: comment
        };

        await ExtensionService.addOrder(order);
        
        setPlacingOrder(false);
    }

    function validateInputs(){
        return location && name && phoneNumber && email && dateDue;
    }

    return (
        <div className="cart-cont">
            <div className="item-display">
                <h1 className="my-order">My Order</h1>
                <div className="orders">
                    { orderItems && orderItems.map(oi => {
                        return (
                            <OrderMenuItemComp key={ oi.id } orderItem={ oi } patchOrderItem={ (patch) => updateOrderItem(oi.id!, patch) }/>
                        )
                    })}
                    <div className="input-cont">
                        <h6>Additional Information</h6>
                        <textarea 
                            value={ comment }
                            onChange={ (event) => setComment(event.target.value) }
                            placeholder="Ex. No peppers on the burgers please."
                            rows={ 3 }
                        ></textarea>
                    </div>
                </div>
            </div>
            <div className="info-display">
                <div className="customer-info-cont">
                    <h4 className="customer-info">Customer Information</h4>
                    <div className={ validInput(name) }>
                        <h6>Name</h6>
                        <input 
                            type="text"
                            value={ name }
                            onChange={ (event) => setName(event.target.value) }
                            placeholder="Bruce Wayne"
                        />
                    </div>
                    <div className={ validInput(email) }>
                        <h6>Email</h6>
                        <input 
                            type="email"
                            value={ email }
                            onChange={ (event) => setEmail(event.target.value) }
                            placeholder="notbatman@gmail.com"
                        />
                    </div>
                    <div className={ validInput(phoneNumber) }>
                        <h6>Phone Number</h6>
                        <input 
                            type="tel"
                            value={ phoneNumber }
                            onChange={ (event) => setPhoneNumber(formatPhone(event.target.value)) }
                            placeholder="(916) 707-7037"
                        />
                    </div>
                    <div className="input-cont">
                        <h6>{ isPickUp ? "Pick Up" : "Delivary" } Date</h6>
                        <input 
                            type="datetime-local"
                            min={ getTomorrowString() }
                            value={ dateDue }
                            onChange={ event => setDateDue(event.target.value) }
                        />
                    </div>
                    <div className="delivery-location">
                        <div className={ validInput(location) }>
                            <h6>{ isPickUp ? "Pick-up Location" : "Delivery Location" }</h6>
                            <input
                                type="text"
                                value={ location }
                                onChange={ (event) => setLocation(event.target.value) }
                                disabled={ isPickUp }
                                placeholder="Street, City, State, Zip"
                            />
                        </div>
                        <div className="delivery-btns">
                            <button
                                className={ isPickUp ? "active" : "" }
                                onClick={ () => { 
                                    setIsPickUp(true); 
                                    setLocation("CSUS Library add full address");
                                }}    
                            >
                                Pick Up
                            </button>
                            <button
                                className={ isPickUp ? "" : "active" }
                                onClick={ () => {
                                    setIsPickUp(false);
                                    setLocation("");
                                }}
                            >
                                Delivery
                            </button>
                        </div>
                    </div>
                </div>
                <div className="checkout-cont">
                    <div className="subtotal">
                        <h5>Subtotal: </h5>
                        <h5>${ totalAmount }</h5>
                    </div>
                    <div className="payment-info-cont">
                        <p className="payment-info">Payment done on delivary day*</p>
                        <p className="payment-info">I accept blach, blah, blah, blah</p>
                    </div>
                    <button
                        onClick={ () => placeOrder() }
                        id="place-order-btn"
                    >
                        { placingOrder ? "Placing Order..." : "Place Order" }
                    </button>
                </div>
            </div>
        </div>
    );
}