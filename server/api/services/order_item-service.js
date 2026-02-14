import { supabase } from "../config/supabase.js";
import { itemSelect } from "./item-service.js";

export const orderItemSelect = `
    id,
    order_id,
    item(
        ${itemSelect}
    ),
    quantity,
    price,
    created_at
`;

export async function getAllOrderItems(){
    const { data, error } = await supabase
        .from("order_items")
        .select(orderItemSelect);

    if(error)
        throw error;

    return data;
}

export async function getOrderItemsFrom(orderID){
    const { data, error } = await supabase
        .from("order_items")
        .select(orderItemSelect)
        .eq("order_id", orderID);

    if(error)
        throw error;

    return data;
}

export async function getOrderItem(id){
    const { data, error } = await supabase
        .from("order_items")
        .select(orderItemSelect)
        .eq("id", id)
        .single();

    if(error)
        throw error;

    return data;
}

export async function addOrderItem(orderItem){
    const { data, error } = await supabase
        .from("order_items")
        .insert([orderItem])
        .select(orderItemSelect)
        .single();

    if(error)
        throw error;

    return data;
}

export async function updateOrderItem(id, orderItem){
    const { data, error } = await supabase
        .from("order_items")
        .update(orderItem)
        .eq("id", id)
        .select(orderItemSelect)
        .single();

    if(error)
        throw error;

    return data;
}

export async function deleteOrderItem(id){
    const { data, error } = await supabase
        .from("order_items")
        .delete()
        .eq("id", id);

    if(error)
        throw error;

    return data;
}