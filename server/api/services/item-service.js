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