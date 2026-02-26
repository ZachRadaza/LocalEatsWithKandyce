import * as customerService from "../services/customer-service.js";

export async function getAllCustomersHandler(req, res){
    try{
        const data = await customerService.getAllCutomers();

        res.status(200).json({
            success: true,
            data: data
        });
    } catch(error){
        console.error(`getAllCustomersHandler Error: `, error);
        res.status(500).json({
            success: false,
            error: error
        });
    }
}

export async function getCustomerHandler(req, res){
    try{
        const { id } = req.params;

        if(!id){
            return res.status(400).json({
                success: false,
                error: "Invalid ID is required"
            });
        }

        const data = await customerService.getCustomer(id);

        if(!data){
            return res.status(404).json({
                success: false,
                error: 'Customer not found'
            });
        }

        res.status(200).json({
            success: true,
            data: data
        });
    } catch(error){
        console.error(`getCustomerHandler Error: `, error);
        res.status(500).json({
            success: false,
            error: error
        });
    }
}

export async function addCustomerHandler(req, res){
    try{
        const { name, email, phoneNumber } = req.body;

        if(
            !name || !email || !phoneNumber ||
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof phoneNumber !== "string" ||
            !name.trim() ||
            !email.trim() ||
            !phoneNumber.trim()
        ){
            return res.status(400).json({
                success: false,
                error: "Name, email, and phone number are required."
            });
        }

        const trimmedData = {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            phoneNumber: phoneNumber.trim()
        };

        const data = await customerService.addCustomer(trimmedData);

        res.status(201).json({
            success: true,
            data: data
        });
    } catch(error){
        console.error(`addCustomerHandler Error: `, error);
        res.status(500).json({
            success: false,
            error: error
        });
    }
}

export async function updateCustomerHandler(req, res){
    try{
        const { id } = req.params;
        const { name, email, phoneNumber } = req.body;

        if(!id){
            return res.status(400).json({
                success: false,
                error: "Invalid ID is required"
            });
        }

        if(
            !name || !email || !phoneNumber ||
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof phoneNumber !== "string" ||
            !name.trim() ||
            !email.trim() ||
            !phoneNumber.trim()
        ){
            return res.status(400).json({
                success: false,
                error: "Name, email, and phone number are required."
            });
        }

        const trimmedData = {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            phoneNumber: phoneNumber.trim()
        };

        const data = await customerService.updateCustomer(id, trimmedData);

        if(!data){
            return res.status(404).json({
                success: false,
                error: 'Customer not found'
            });
        }

        res.status(200).json({
            success: true,
            data: data
        });
    } catch(error){
        console.error(`updateCustomerHandler Error: `, error);
        res.status(500).json({
            success: false,
            error: error
        });
    }
}

export async function deleteCustomerHandler(req, res){
    try{
        const { id } = req.params;

        if(!id){
            return res.status(400).json({
                success: false,
                error: 'Customer ID is required'
            });
        }

        const data = await customerService.deleteCustomer(id);

        if(!data){
            return res.status(404).json({
                success: false,
                error: "Customer not found"
            });
        }

        res.status(200).json({
            success: true,
            data: data
        });
    } catch(error){
        console.error(`deleteCustomerHandler Error: `, error);
        res.status(500).json({
            success: false,
            error: error
        });
    }
}