import { useState, useEffect, useMemo } from "react";
import type { OrderFull, Filter, Sort } from "../../schemas/schemas";
import { ExtensionService } from "../../utils/ExtensionService";
import OrderComp from "../../components/admin/OrderComp";
import DeclinePopup from "../../components/popups/DeclinePopup";
import Popup from "../../components/popups/Popup";
import "./Orders.css";

export default function Orders(){
    const [orders, setOrders] = useState<OrderFull[]>([]);
    const [sortType, setSortType] = useState<Sort>("Alphabetical");
    const [filterType, setFilterType] = useState<Filter>("All");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const [openedDecline, setOpenedDecline] = useState<boolean>(false);
    const [orderIDDecline, setOrderIDDecline] = useState<string>("");
    const [openedPopup, setOpenedPopup] = useState<boolean>(false);
    const [messagePopup, setMessagePopup] = useState<string>("");
    const [titlePopup, setTitlePopup] = useState<string>("");

    const totalOrdersAccepted = useMemo(() => {
        const ordersAccepted = orders.filter(order => order.accepted);
        return ordersAccepted.length;
    }, [orders]);

    const totalMoney = useMemo(() => {
        return orders.reduce((orderSum, o) => {
            return orderSum + o.price;
        }, 0);
    }, [orders]);

    const soonestOrder = useMemo(() => {
        if(orders.length === 0)
            return null;

        const soonest = orders.reduce((soonest, order) =>
            new Date(order.dateDue) < new Date(soonest)
                ? order.dateDue
                : soonest
        , orders[0].dateDue);

        return new Date(soonest).toLocaleString();
    }, [orders]);

    const numItems = useMemo(() => {
        return orders.reduce((sumItems, o) => {
            return sumItems + o.orderItems.length
        }, 0);
    }, [orders]);

    const numDelivaries = useMemo(() => {
        const ordersDeliver = orders.filter(order => !order.location.includes('CSUS Library'));

        return ordersDeliver.length;
    }, [orders]);

    const displayOrders = useMemo(() => {
        let result = [...orders];

        switch(filterType){
            case "Accepted":
                result = result.filter(o => o.accepted);
                break;
            case "Not Accepted":
                result = result.filter(o => !o.accepted);
                break;
            case "All":
            default:
                break;
        }

        switch(sortType){
            case "Alphabetical":
                result.sort((a, b) => a.customers.name.localeCompare(b.customers.name));
                break;
            case "Date Ordered":
                result.sort((a, b) => new Date(a.dateOrdered).getTime() - new Date(b.dateOrdered).getTime());
                break;
            case "Date Due":
            default:
                result.sort((a, b) => new Date(a.dateDue).getTime() - new Date(b.dateDue).getTime());
                break;
        }

        return result;
    }, [orders, sortType, filterType]);

    async function acceptOrder(orderID: string){
        try{
            const matchingOrder = orders.find(order => order.id === orderID)
            if(!matchingOrder)
                return;

            setOrders(oldOrders =>
                oldOrders.map(order =>
                    order.id === orderID
                        ? { ...order, accepted: true }
                        : order
                )
            )

            ExtensionService.updateOrder({ ...matchingOrder, accepted: true });
            ExtensionService.sendAcceptEmail(matchingOrder.customers.email, matchingOrder);
        } catch(error){
            console.error("Error in Accepting Order: ", error);
            openPopupMessage("Accepting Order");
        }
    }
    
    async function declineOrder(orderID: string, message: string){
        try{
            const matchingOrder = orders.find(order => order.id === orderID);

            setOrders(oldOrders => 
                oldOrders.filter(order => order.id !== orderID)
            );

            ExtensionService.deleteOrder(orderID);
            ExtensionService.sendDeclineEmail(matchingOrder?.customers.email!, matchingOrder!, message);
        } catch(error){
            console.error("Error in Declining Order: ", error);
            openPopupMessage("Declining Order");
        }
    }

    async function completeOrder(orderID: string){
        try{
            const matchingOrder = orders.find(order => order.id === orderID);
            const customer = matchingOrder?.customers;
            
            setOrders(oldOrders => 
                oldOrders.filter(order => order.id !== orderID)
            );

            ExtensionService.deleteOrder(orderID);
            ExtensionService.sendCompleteEmail(customer?.email!, matchingOrder?.id!, customer?.name!);
        } catch(error){
            console.error("Error in Completing Order", error);
            openPopupMessage("Completing Order");
        }
    }

    function openPopupMessage(type: string){
        setTitlePopup(`Error in ${type}`);
        setMessagePopup(`Error has occured in ${type.toLowerCase()}. Please contact the GOAT Zach for issues.`);

        setOpenedPopup(true);
    }

    useEffect(() => {
        let cancelled = false;

        init();

        async function init(){
            try{
                setLoading(false);
                setError(null);

                const ordersRaw = await ExtensionService.getOrders();
                if(cancelled)
                    return;

                const ordersData = ordersRaw.map(order => {
                    const price = order.orderItems.reduce((itemSum, oi) => {
                        return itemSum + oi.price;    
                    }, 0);

                    return { ...order, price: price };
                });

                setOrders(ordersData);
            } catch(error){
                if(cancelled)
                    return;

                setError("Failed to open Orders Page");
            } finally {
                if(cancelled)
                    return;

                setLoading(false);
            }
        }
    }, []);

    if(loading)
        return (
            <div className="loading-page">
                <h5>Local Eats With Kandyce</h5>
                <p>Loading Menu...</p>
            </div>
        );

    if(error)
        return (
            <div className="error-page">
                <h5>Local Eats With Kandyce</h5>
                <p>Sorry for the inconvience</p>
                <p>Error: { error } </p>
            </div>
        );

    return (
        <div className="orders-page-cont">
            <div className="popups">
                <DeclinePopup 
                    isOpened={ openedDecline }
                    showPopup={ (proceed, message) => { 
                        setOpenedDecline(false);
                        if(proceed){
                            declineOrder(orderIDDecline, message);
                        }
                    } }
                />
                <Popup
                    isOpened={ openedPopup }
                    title={ titlePopup }
                    message={ messagePopup }
                    positiveMessage={ false }
                    closePopup={ () => setOpenedPopup(false) }
                />
            </div>
            <div className="dashboard">
                <div className="total-num-orders">
                    <h2 className="total-num-orders-num">{ orders.length }</h2>
                    <p>Orders</p>
                </div>
                <div className="total-accepted-orders">
                    <h1>{ totalOrdersAccepted }</h1>
                    <p>Accepted Orders</p>
                </div>
                <div className="total-num-items">
                    <h1>{ numItems }</h1>
                    <p>Items to Make</p>
                </div>
                <div className="total-money">
                    <h1>${ totalMoney }</h1>
                    <p>Potential Money</p>
                </div>

                <div className="total-unaccepted-orders">
                    <h1>{ orders.length - totalOrdersAccepted }</h1>
                    <p>Unaccepted Orders</p>
                </div>
                <div className="soonest-date">
                    <h2>{ soonestOrder ?? ""}</h2>
                    <p>Soonest Order</p>
                </div>
                <div className="total-num-libraries">
                    <h1>{ orders.length - numDelivaries }</h1>
                    <p>Library Drop-Offs</p>
                </div>
            </div>
            <div className="all-orders">
                <div className="options">
                    <button
                        onClick={ () => {
                            switch(sortType){
                                case "Alphabetical":
                                    setSortType("Date Due");
                                    break;
                                case "Date Due":
                                    setSortType("Date Ordered");
                                    break;
                                case "Date Ordered":
                                    setSortType("Alphabetical");
                                    break;
                            }
                        }}
                    >
                        Sort: { sortType }
                    </button>
                    <button
                        onClick={ () => {
                            switch(filterType){
                                case "All":
                                    setFilterType("Accepted");
                                    break;
                                case "Accepted":
                                    setFilterType("Not Accepted");
                                    break;
                                case "Not Accepted":
                                    setFilterType("All");
                                    break;
                            }
                        }}
                    >
                        Filter: { filterType }
                    </button>
                </div>
                <div className="orders">
                    { displayOrders.map(order =>
                        <OrderComp 
                            key={ order.id } 
                            order={ order } 
                            acceptOrder={ () => acceptOrder(order.id!) } 
                            declineOrder={ () => {
                                setOpenedDecline(true);
                                setOrderIDDecline(order.id!);
                            } }
                            completeOrder={ () => completeOrder(order.id!) }
                        />
                    ) }
                </div>
            </div>
        </div>
    );
}