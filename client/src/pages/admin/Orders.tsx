import { useState, useEffect, useMemo } from "react";
import type { OrderFull } from "../../schemas/schemas";
import { ExtensionService } from "../../utils/ExtensionService";
import "./Orders.css";
import OrderComp from "../../components/admin/OrderComp";

type Sort = "Alphabetical" | "DateOrdered" | "DateDue";
type Filter = "All" | "Accepted" | "Not Accepted";

export default function Orders(){
    const [orders, setOrders] = useState<OrderFull[]>([]);
    const [sortType, setSortType] = useState<Sort>("Alphabetical");
    const [filterType, setFilterType] = useState<Filter>("All");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const totalOrdersAccepted = useMemo(() => {
        const ordersAccepted = orders.filter(order => order.accepted);
        return ordersAccepted.length
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

    function patchOrder(orderID: string, patch: Partial<OrderFull>){
        setOrders(oldOrders =>
            oldOrders.map(order => 
                order.id === orderID
                    ? { ...order, patch }
                    : order
        ));
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
                <p>Local Eats With Kandyce</p>
                <p>Loading Menu...</p>
            </div>
        );

    if(error)
        return (
            <div className="error-page">
                <p>Local Eats With Kandyce</p>
                <p>Sorry for the inconvience</p>
                <p>Error: { error } </p>
            </div>
        );

    return (
        <div className="orders-page-cont">
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
                                    setSortType("DateDue");
                                    break;
                                case "DateDue":
                                    setSortType("DateOrdered");
                                    break;
                                case "DateOrdered":
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
                    { orders.map(order =>
                        <OrderComp key={ order.id } order={ order } patchOrder={ (patch) => patchOrder(order.id!, patch) } />
                    ) }
                </div>
            </div>
        </div>
    );
}