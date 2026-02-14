import * as customerService from "../services/customer-service.js";

export async function getAllCustomersHandler(req, res){
    try{
        const data = await customerService.getAllCutomers();

        res.status(200).json({
            success: true,
            data: data
        });
    } catch(error){
        console.error(`getAllCustomersHandler Error: ${error}`);
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
            console.log("Invalid Id passed in params");
            return res.status(400).json({
                success: false,
                error: "Invalid Id passed in params"
            });
        }

        const data = await customerService.getCustomer(id);

        res.status(200).json({
            success: true,
            data: data
        });
    } catch(error){
        console.error(`getCustomerHandler Error: ${error}`);
        res.status(500).json({
            success: false,
            error: error
        });
    }
}

export async function addCustomerHandler(req, res){
    try{
        const { name, email, phoneNumber } = req.body;

        if(!name || !email || !phoneNumber){
            console.log("Invalid body for customer");
            return res.status(400).json({
                success: false,
                error: "Invalid Body"
            });
        }

        const data = await customerService.addCustomer({ name, email, phoneNumber });

        res.status(200).json({
            success: true,
            data: data
        });
    } catch(error){
        console.error(`addCustomerHandler Error: ${error}`);
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

        if(!name || !email || !phoneNumber || !id){
            console.log("Invalid id or body for customer");
            return res.status(400).json({
                success: false,
                error: "Invalid Body or Params"
            });
        }

        const data = await customerService.updateCustomer(id, { name, email, phoneNumber });

        res.status(200).json({
            success: true,
            data: data
        });

    } catch(error){
        console.error(`updateCustomerHandler Error: ${error}`);
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
            console.error("invalid id on deleting customer handler");
            return res.status(400).json({
                success: false,
                error: 'Invalid Id in params'
            });
        }

        await customerService.deleteCustomer(id);

        res.status(200).json({
            success: true,
            data: true
        });
    } catch(error){
        console.error(`deleteCustomerHandler Error: ${error}`);
        res.status(500).json({
            success: false,
            error: error
        });
    }
}