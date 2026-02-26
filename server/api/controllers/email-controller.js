import * as emailService from "../services/email-service.js";

export async function confimationHandler(req, res){
    try{
        const { sendTo, order } = req.body;

        if(
            !sendTo || !order ||
            typeof sendTo !== "string" ||
            !sendTo.trim()
        ){
            return res.status(400).json({
                success: false,
                error: `sendTo and order are required`
            });
        }

        const trimmedSend = sendTo.trim();

        await emailService.confirmation(trimmedSend, order);

        res.status(201).json({
            success: true
        });
    } catch(error){
        console.error("confirmHandler error: ", error);
        res.status(500).json({
            success: false,
            error: error
        });
    }
}

export async function acceptHandler(req, res){
    try{
        const { sendTo, order } = req.body;

        if(
            !sendTo || !order ||
            typeof sendTo !== "string" ||
            !sendTo.trim()
        ){
            return res.status(400).json({
                success: false,
                error: `sendTo and order are required`
            });
        }

        const trimmedSend = sendTo.trim();

        await emailService.accept(trimmedSend, order);

        res.status(201).json({
            success: true
        });
    } catch(error){
        console.error("acceptHandler error: ", error);
        res.status(500).json({
            success: false,
            error: error
        });
    }
}

export async function declineHandler(req, res){
    try{
        const { sendTo, order, message } = req.body;

        if(
            !sendTo || !order || !message ||
            typeof sendTo !== "string" ||
            typeof message !== "string" ||
            !sendTo.trim() ||
            !message.trim()
        ){
            return res.status(400).json({
                success: false,
                error: `sendTo, order, and message are required`
            });
        }

        const trimmedSend = sendTo.trim();
        const trimmedMessage = message.trim()

        await emailService.decline(trimmedSend, order, trimmedMessage);

        res.status(201).json({
            success: true
        });
    } catch(error){
        console.error("declineHandler error: ", error);
        res.status(500).json({
            success: false,
            error: error
        });
    }
}

export async function reminderHandler(req, res){
    try{
        const { sendTo, order } = req.body;

        if(
            !sendTo || !order ||
            typeof sendTo !== "string" ||
            !sendTo.trim()
        ){
            return res.status(400).json({
                success: false,
                error: `sendTo and order are required`
            });
        }

        const trimmedSend = sendTo.trim();

        await emailService.confirmation(trimmedSend, order);

        res.status(201).json({
            success: true
        });
    } catch(error){
        console.error("reminderHandler error: ", error);
        res.status(500).json({
            success: false,
            error: error
        });
    }
}

export async function completeHandler(req, res){
    try{
        const { sendTo, orderID, customerName } = req.body;

        if(
            !sendTo || !orderID || !customerName ||
            typeof sendTo !== "string" ||
            typeof orderID !== "string" ||
            typeof customerName !== "string" ||
            !sendTo.trim() ||
            !orderID.trim() ||
            !customerName.trim()
        ){
            return res.status(400).json({
                success: false,
                error: `sendTo, orderID, and customerName are required`
            });
        }

        const trimmedSend = sendTo.trim();
        const trimmedOrderID = orderID.trim();
        const trimmedCustomerName = customerName.trim();

        await emailService.complete(trimmedSend, trimmedOrderID, trimmedCustomerName);

        res.status(201).json({
            success: true
        });
    } catch(error){
        console.error("completeHandler error: ", error);
        res.status(500).json({
            success: false,
            error: error
        });
    }
}