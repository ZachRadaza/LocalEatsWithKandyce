import { supabase } from "../config/supabase.js";

export const itemSelect = `
    id,
    name,
    description,
    image_link,
    price,
    contains,
    vegan,
    category (*),
    created_at,
    updated_at
`;

export async function getAllItems(){
    const { data, error } = await supabase
        .from("item")
        .select(fullObject);

    if(error)
        throw error;

    const items = data.map(({ image_link, ...rest }) => ({
        ...rest,
        imageLink: image_link
    }));

    return items;
}

export async function getItem(id){
    const { data, error } = await supabase
        .from("item")
        .select(itemSelect)
        .eq("id", id)
        .single();

    if(error)
        throw error;

    const itemRet = {
        ...data,
        imageLink: data.image_link,
        image_link: undefined
    };

    return itemRet;
}

export async function getItemsFromCategory(categoryID){
    const { data, error } = await supabase
        .from("item")
        .select(itemSelect)
        .eq("category_id", categoryID);

    if(error)
        throw error;

    const items = data.map(({ image_link, ...rest }) => ({
        ...rest,
        imageLink: image_link
    }));

    return items;
}

export async function addItem(item){
    const { data, error } = await supabase
        .from("item")
        .insert([item])
        .select(itemSelect)
        .single();

    if(error)
        throw error;

    const itemRet = {
        ...data,
        imageLink: data.image_link,
        image_link: undefined
    };

    return itemRet;
}

export async function updateItem(id, item){
    const { data, error } = await supabase
        .from("item")
        .update(item)
        .eq("id", id)
        .select(itemSelect)
        .single();

    if(error)
        throw error;

    const itemRet = {
        ...data,
        imageLink: data.image_link,
        image_link: undefined
    };

    return itemRet;
}

export async function deleteItem(id){
    const { data, error } = await supabase
        .from("item")
        .delete()
        .eq("id", id)

    if(error)
        throw error;

    return data;
}
