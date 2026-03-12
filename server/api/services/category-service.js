import { supabase } from "../config/supabase.js";

export async function getAllCategories(){
    const { data, error } = await supabase
        .from("category")
        .select("*");

    if(error)
        throw error;

    return data;
}

export async function getCategory(id){
    const {data, error } = await supabase
        .from("category")
        .select("*")
        .eq("id", id)
        .single();

    if(error)
        throw error;

    return data;
}

export async function addCategory(name, description){
    const { data, error } = await supabase
        .from("category")
        .insert([{ name, description }])
        .select()
        .single();

    if(error)
        throw error

    return data;
}

export async function updateCategory(id, newName, newDescription){
    const { data, error } = await supabase
        .from("category")
        .update({ 
            name: newName,
            description: newDescription
        }).eq("id", id)
        .select()
        .single();

    if(error)
        throw error;

    return data;
}

export async function deleteCategory(id){
    const { data, error } = await supabase
        .from("category")
        .delete()
        .eq("id", id)

    if(error)
        throw error
}