import { supabase } from "../config/supabase.js";

export const itemSelect = `
    id,
    name,
    description,
    image_link,
    price,
    contains,
    category (*),
    created_at,
    updated_at,
    custom,
    vegan,
    halal,
    vegetarian,
    keto_friendly,
    gluten_free,
    dairy_free,
    spicy
`;

export async function getAllItems(){
    const { data, error } = await supabase
        .from("item")
        .select(fullObject)
        .eq("custom", false);

    if(error)
        throw error;

    const items = toFrontEndAllItems(data);

    return items;
}

export async function getItem(id){
    const { data, error } = await supabase
        .from("item")
        .select(itemSelect)
        .eq("custom", false)
        .eq("id", id)
        .single();

    if(error)
        throw error;

    const itemRet = toFrontEndItem(data);

    return itemRet;
}

export async function getItemsFromCategory(categoryID){
    const { data, error } = await supabase
        .from("item")
        .select(itemSelect)
        .eq("custom", false)
        .eq("category_id", categoryID);

    if(error)
        throw error;

    const items = toFrontEndAllItems(data);

    return items;
}

export async function getAllItemsCustom(){
    const { data, error } = await supabase
        .from("item")
        .select(fullObject)
        .eq("custom", true);

    if(error)
        throw error;

    const items = toFrontEndAllItems(data);

    return items;
}

export async function getAllItemsWithCustom(){
    const { data, error } = await supabase
        .from("item")
        .select(fullObject)

    if(error)
        throw error;

    const items = toFrontEndAllItems(data);

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

    const itemRet = toFrontEndItem(data);

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

    const itemRet = toFrontEndItem(data);

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


function toFrontEndAllItems(data){
    const items = data.map(({ image_link, keto_friendly, gluten_free, dairy_free, ...rest }) => ({
        ...rest,
        imageLink: image_link,
        glutenFree: gluten_free,
        dairyFree: dairy_free,
        ketoFriendly: keto_friendly
    }));

    return items;
}

function toFrontEndItem(data){
    const itemRet = {
        ...data,
        imageLink: data.image_link,
        image_link: undefined,
        dairyFree: data.dairy_free,
        dairy_free: undefined,
        glutenFree: data.gluten_free,
        gluten_free: undefined,
        ketoFriendly: data.keto_friendly,
        keto_friendly: undefined
    };

    return itemRet;
}

// Image Upload to Bucket

export async function uploadImageToBucket({
    buffer,
    mimetype,
    originalName,
    bucket = "menu_images",
    filename,
    upsert = false,
}){
    if(!buffer || !mimetype)
        throw new Error("buffer and mimetype are required");

    const ext = (originalName?.split(".").pop() || "png").toLowerCase();
    const finalName =
        filename && filename.includes(".")
        ? filename
        : `${crypto.randomUUID()}.${ext}`;

    const path = finalName;

    const { error } = await supabase.storage
        .from(bucket)
        .upload(path, buffer, {
            contentType: mimetype,
            upsert,
        });

    if(error) 
        throw new Error(error.message);

    const { data } = supabase.storage.from(bucket).getPublicUrl(path);

    return {
        path,
        publicUrl: data.publicUrl,
    };
}

export async function deleteImagesFromBucket({ paths, bucket = "menu_images" }) {
    const arr = Array.isArray(paths) ? paths : [paths];
    const cleaned = arr.filter(Boolean);

    if(cleaned.length === 0) 
        throw new Error("deleteImagesFromBucket: paths required");

    const { error } = await supabase.storage.from(bucket).remove(cleaned);

    if(error) 
        throw new Error(error.message);

    return { ok: true, removed: cleaned };
}