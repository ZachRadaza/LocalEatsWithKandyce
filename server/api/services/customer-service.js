import { supabase } from "../config/supabase.js"

export async function getAllCutomers(){
    const { data, error } = await supabase
        .from("customers")
        .select("*");

    if(error)
        throw error;

    return data;
}

export async function getCustomer(id){
    const { data, error } = await supabase
        .from("customers")
        .select("*")
        .eq("id", id)
        .single();

    if(error)
        throw error;

    return data;
}

export async function addCustomer({ name, email, phoneNumber }){
    const { data, error } = await supabase
        .from("customers")
        .insert([{
            name: name,
            email: email,
            phone: phoneNumber
        }])
        .select("*")
        .single();
    
    if(error)
        throw error;

    return data;
}

export async function updateCustomer(id, { name, email, phoneNumber }){
    const { data, error } = await supabase
        .from("customers")
        .update({
            name: name,
            email: email,
            phone: phoneNumber
        })
        .eq("id", id)
        .select("*")
        .single();

    if(error)
        throw error;

    return data;
}

export async function deleteCustomer(id){
    const { data, error } = await supabase
        .from("customers")
        .delete()
        .eq("id", id)

    if(error)
        throw error;

    return data;
}