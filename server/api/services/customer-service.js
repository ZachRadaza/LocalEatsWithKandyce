import { supabase } from "../config/supabase.js"

export async function getAllCutomers(){
    const { data, error } = await supabase
        .from("customers")
        .select("*");

    if(error)
        throw error;

    const customers = toFrontEndCustomerAll(data);

    return customers;
}

export async function getCustomer(id){
    const { data, error } = await supabase
        .from("customers")
        .select("*")
        .eq("id", id)
        .single();

    if(error)
        throw error;

    const customerRet = toFrontEndCustomer(data);

    console.log(customerRet);

    return customerRet;
}

export async function addCustomer({ name, email, phone, phone_preffered }){
    const { data, error } = await supabase
        .from("customers")
        .insert([{
            name: name,
            email: email,
            phone: phone,
            phone_preffered: phone_preffered
        }])
        .select("*")
        .single();
    
    if(error)
        throw error;

    const customerRet = toFrontEndCustomer(data);

    return customerRet;
}

export async function updateCustomer(id, { name, email, phoneNumber, phone_preffered }){
    const { data, error } = await supabase
        .from("customers")
        .update({
            name: name,
            email: email,
            phone: phoneNumber,
            phone_preffered: phone_preffered
        })
        .eq("id", id)
        .select("*")
        .single();

    if(error)
        throw error;

    const customerRet = toFrontEndCustomer(data);

    return customerRet;
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

 export function toFrontEndCustomer(customer){
    const customerRet = {
        ...customer,
        phonePreffered: customer.phone_preffered,
        phone_preffered: undefined
    };

    return customerRet;
}
export function toFrontEndCustomerAll(data){
    const customers = data.map(({ phone_preffered, ...rest }) => ({
        ...rest,
        phonePreffered: phone_preffered,
        preffered_phone: undefined
    }));

    return customers;
}