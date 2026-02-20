import { supabase } from "../config/supabase.js";

const orderItem = `
    id,
    customers (*),
    date_ordered,
    date_due,
    accepted,
    location,
    comment
`;

export async function getAllOrders(){
    const { data, error } = await supabase
        .from("orders")
        .select(orderItem);

    if(error)
        return error;

    return data;
}       

export async function getOrder(id){
    const { data, error } = await supabase
        .from("orders")
        .select(orderItem)
        .eq("id", id)
        .single();

    if(error)
        throw error;

    return data;
}

export async function addOrder(order){
    const { data, error } = await supabase
        .from("orders")
        .insert([order])
        .select(orderItem)
        .single();

        if(error)
            throw error;

        return data;
}

export async function updateOrder(id, order){
    const { data, error } = await supabase
        .from("orders")
        .update(order)
        .eq("id", id)
        .select(orderItem)
        .single();

    if(error)
        throw error;

    return data;
}

export async function removeOrder(id){
    const { data, error } = await supabase
        .from("orders")
        .delete()
        .eq("id", id);

    if(error)
        throw error;

    return data;
}