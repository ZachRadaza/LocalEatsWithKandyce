import type React from "react";
import type { Order, Customer, MenuItem, OrderMenuItem } from "../../schemas/schemas";
import { useOutletContext, useNavigate } from "react-router-dom";
import OrderItemComp from "../../components/non-admin/OrderItemComp";
import { useMemo, useState } from "react";
import { ExtensionService } from "../../utils/ExtensionService";
import { wait } from "../../utils/RandomFunctions";
import "./Cart.css";

type CartContext = {
    orderItems: OrderMenuItem[];
    setOrderItems: React.Dispatch<React.SetStateAction<OrderMenuItem[]>>;
    setMenu: React.Dispatch<React.SetStateAction<Map<string, MenuItem[]>>>;
};

export default function Cart(){
    const { orderItems, setOrderItems, setMenu } = useOutletContext<CartContext>()

    const [placingOrder, setPlacingOrder] = useState<boolean>(false);
    const [isPickUp, setIsPickUp] = useState<boolean>(false);
    const [orderSuccess, setOrderSuccess] = useState<boolean>(false);

    const navigate = useNavigate();
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

    function updateOrderItem(id: string, patch: Partial<OrderMenuItem>) {
        setOrderItems(prevOI => {
            const next = prevOI
                .map(oi => (oi.id === id ? { ...oi, ...patch } : oi))
                .filter(oi => oi.quantity !== 0);

            const qtyByItemID = new Map<string, number>();

            for(const oi of next)
                qtyByItemID.set(oi.itemID, oi.quantity);

            setMenu(prevMenu => {
                const newMenu = new Map(prevMenu);

                for(const [category, items] of newMenu.entries()){
                    newMenu.set(category, items.map(item => ({
                            ...item,
                            quantity: qtyByItemID.get(item.id!) ?? 0,
                    })));
                }

                return newMenu;
            });

            return next;
        });
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
            customers: customer,
            accepted: false,
            location: location,
            finished: false,
            comment: comment
        };

        const success = await ExtensionService.addOrder(order);
        
        setPlacingOrder(false);

        if(success){
            setOrderSuccess(true);
            await wait(4000)
            clearCart();
        } else {
            setOrderSuccess(false);
        }
    }

    function validateInputs(){
        return location && name && phoneNumber && email && dateDue;
    }

    function clearCart(){
        setOrderItems([]);
        setMenu(oldMenu => {
            const newMenu = new Map(
                [...oldMenu].map(([category, items]) => {
                    const newItems = items.map(item => ({
                        ...item,
                        quantity: 0
                    }));

                    return [category, newItems];
                })
            );

            return newMenu;
        });

        navigate('/');
    }

    return (
        <div className="cart-cont">
            <div className="item-display">
                <h1 className="my-order">My Order</h1>
                <div className="orders">
                    { totalAmount > 0 ? ( 
                        <>
                            { orderItems.map(oi => (
                                <OrderItemComp 
                                    key={ oi.id } 
                                    orderItem={ oi } 
                                    patchOrderItem={ (patch) => updateOrderItem(oi.id!, patch) }
                                    enableBtns={ true }
                                />
                            )) }
                            <div className="input-cont">
                                <h6>Additional Information</h6>
                                <textarea 
                                    value={ comment }
                                    onChange={ (event) => setComment(event.target.value) }
                                    placeholder="Ex. No peppers on the burgers please."
                                    rows={ 3 }
                                ></textarea>
                            </div>
                        </>
                    ) : (
                        <div className="empty-order">
                            <p>{ !orderSuccess ? "No items on order" : "Order Successful! Please check you emails" }</p>
                        </div>
                    )}
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
                        { placingOrder 
                            ? "Placing Order..." 
                            : ( orderSuccess ? "Successfully Ordered" : "Place Order") 
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}