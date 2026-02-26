import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

async function sendOrderEmail({ transporter, to, bcc, type, order }) {
    const { subject, html } = buildOrderEmail(type, order);

    await transporter.sendMail({
        from: `"Local Eats With Kandyce" <${process.env.EMAIL_USER}>`,
        to,
        bcc,
        subject,
        html
    });

    return { success: true };
}

export async function confirmation(sentTo, order){
    try {
        return await sendOrderEmail({
            transporter,
            to: sentTo,
            bcc: process.env.EMAIL_USER,
            type: "confirmation",
            order
        });
    } catch(error){
        console.error("Email failed: ", error);
    }
}

export async function accept(sentTo, order) {
    try {
        return await sendOrderEmail({
            transporter,
            to: sentTo,
            bcc: process.env.EMAIL_USER,
            type: "accepted",
            order
        });
    } catch (error) {
        console.error("Email failed: ", error);
        return { success: false, error };
    }
}

export async function decline(sentTo, order, message){
    try{
        const { subject, html } = buildOrderEmail("declined", order);

        const reasonBlock = message ? `
            <div style="background: #fff4f4; border: 1px solid #ffc9c9; border-radius: 8px; padding: 12px; margin: 0 0 16px;">
                <strong>Reason for Decline:</strong>
                <p style="margin: 6px 0 0; white-space: pre-wrap;">
                    ${message}
                </p>
            </div>
        ` : "";

        const updatedHtml = html.replace(
            '<div style="font-size: 12px; color: #555;">',
            `${reasonBlock}<div style="font-size: 12px; color: #555;">`
        );

        await transporter.sendMail({
            from: `"Local Eats With Kandyce" <${process.env.EMAIL_USER}>`,
            to: sentTo,
            bcc: process.env.EMAIL_USER,
            subject,
            html: updatedHtml
        });

        return { success: true };
    } catch(error){
        console.error("Email failed: ", error);
    }
}

export async function reminder(sentTo, order){
    try{
        return await sendOrderEmail({
            transporter,
            to: sentTo,
            bcc: process.env.EMAIL_USER,
            type: "reminder",
            order
        });
    } catch(error){
        console.error("Email failed: ", error);
    }
}

export async function complete(sentTo, orderID, customerName){
    try{
        const html = `
            <div style="font-family: Arial, sans-serif; line-height: 1.45; color: #111;">
                <h1>Order Completed</h1>

                <p>
                    Hi ${customerName ?? "there"},
                </p>

                <p>
                    Your order has been marked as completed.
                </p>

                <div style="border: 1px solid #e5e5e5; border-radius: 10px; padding: 16px; margin: 16px 0;">
                    <p style="margin: 0;"><strong>Order ID:</strong> ${orderID ?? ""}</p>
                </div>

                <p>
                    Thank you so much for choosing us. We truly appreciate your support!
                </p>

                <p>
                    We hope to serve you again soon.<br/>
                    <strong>Local Eats With Kandyce</strong>
                </p>
            </div>
        `;

        await transporter.sendMail({
            from: `"Local Eats With Kandyce" <${process.env.EMAIL_USER}>`,
            to: sentTo,
            subject: `Order Completed — ${orderID ?? ""}`,
            html
        });

        return { success: true };
    } catch(error){
        console.error("Email failed: ", error);
    }
}

// Helper Funcitons to build email, vibe coded

function buildOrderEmail(type, order) {
    if (type === "confirmation") {
        return {
            subject: `Order Confirmation — ${order?.id ?? ""}`,
            html: buildOrderBlock(order, {
                headline: "Thank you for your order!",
                intro: "We've received your order and will keep you updated.",
                statusText: "Pending Acceptance"
            })
        };
    }

    if (type === "accepted") {
        return {
            subject: `Order Accepted — ${order?.id ?? ""}`,
            html: buildOrderBlock(order, {
                headline: "Your Order Has Been Accepted!",
                intro: "Great news! We've started preparing your order.",
                statusText: "Accepted / In Progress"
            })
        };
    }

    if (type === "declined") {
        return {
            subject: `Order Update — ${order?.id ?? ""}`,
            html: buildOrderBlock(order, {
                headline: "Order Update",
                intro: "We're sorry — your order could not be accepted at this time.",
                statusText: "Declined"
            })
        };
    }

    if (type === "reminder") {
        return {
            subject: `Order Reminder — ${order?.id ?? ""}`,
            html: buildOrderBlock(order, {
                headline: "Order Reminder",
                intro: "Quick Reminder on Order Due",
                statusText: "Reminder"
            })
        };
    }

    return {
        subject: `Order Update — ${order?.id ?? ""}`,
        html: buildOrderBlock(order, {
            headline: "Order Update",
            intro: "Here's an update on your order."
        })
    };
}

function money(n) {
    return Number(n || 0).toFixed(2);
}

function safeDate(value) {
    if (!value) return "";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return String(value);
    return d.toLocaleString();
}

function calcTotal(orderItems) {
    return (orderItems ?? []).reduce((sum, oi) => {
        return sum + Number(oi.price) * Number(oi.quantity);
    }, 0);
}

function buildItemsTable(orderItems) {
    const items = orderItems ?? [];

    const rows = items.map((oi) => {
        const lineTotal = Number(oi.price) * Number(oi.quantity);
        return `
            <tr>
                <td style="padding: 8px 0;">${oi.name}</td>
                <td style="padding: 8px 0; text-align: center;">${oi.quantity}</td>
                <td style="padding: 8px 0; text-align: right;">$${money(oi.price)}</td>
                <td style="padding: 8px 0; text-align: right;"><strong>$${money(lineTotal)}</strong></td>
            </tr>
        `;
    }).join("");

    return `
        <table style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr>
                    <th style="text-align: left; padding-bottom: 8px; border-bottom: 1px solid #eee;">Item</th>
                    <th style="text-align: center; padding-bottom: 8px; border-bottom: 1px solid #eee;">Qty</th>
                    <th style="text-align: right; padding-bottom: 8px; border-bottom: 1px solid #eee;">Unit</th>
                    <th style="text-align: right; padding-bottom: 8px; border-bottom: 1px solid #eee;">Line Total</th>
                </tr>
            </thead>
            <tbody>
                ${rows || `<tr><td colspan="4" style="padding: 10px 0;">(No items found)</td></tr>`}
            </tbody>
        </table>
    `;
}

function buildOrderBlock(order, options = {}) {
    const orderItems = order?.orderItems ?? [];
    const customer = order?.customers ?? {};
    const comment = (order?.comment ?? "").trim();
    const location = order?.location ?? "";

    const total = calcTotal(orderItems);
    const orderedAt = safeDate(order?.dateOrdered);
    const dueAt = safeDate(order?.dateDue);

    const statusText = options.statusText ?? (
        order?.finished
            ? "Completed"
            : (order?.accepted ? "Accepted / In Progress" : "Pending Acceptance")
    );

    const headline = options.headline ?? "Order Update";
    const intro = options.intro ?? "Here are your order details.";

    const showOrderSummary = options.showOrderSummary ?? true;
    const showCustomer = options.showCustomer ?? true;
    const showNotes = options.showNotes ?? true;

    return `
        <div style="font-family: Arial, sans-serif; line-height: 1.45; color: #111;">
            <h1 style="margin: 0 0 8px;">${headline}</h1>
            <p style="margin: 0 0 16px;">
                ${intro}
            </p>

            <div style="border: 1px solid #e5e5e5; border-radius: 10px; padding: 16px; margin: 0 0 16px;">
                <h2 style="margin: 0 0 12px; font-size: 18px;">Order Details</h2>
                <p style="margin: 0;"><strong>Order ID:</strong> ${order?.id ?? ""}</p>
                ${orderedAt ? `<p style="margin: 6px 0 0;"><strong>Ordered:</strong> ${orderedAt}</p>` : ""}
                ${dueAt ? `<p style="margin: 6px 0 0;"><strong>Due:</strong> ${dueAt}</p>` : ""}
                ${location ? `<p style="margin: 6px 0 0;"><strong>Delivery At:</strong> ${location}</p>` : ""}
                <p style="margin: 6px 0 0;"><strong>Status:</strong> ${statusText}</p>
            </div>

            ${showCustomer ? `
                <div style="border: 1px solid #e5e5e5; border-radius: 10px; padding: 16px; margin: 0 0 16px;">
                    <h2 style="margin: 0 0 12px; font-size: 18px;">Customer</h2>
                    ${customer?.name ? `<p style="margin: 0;"><strong>Name:</strong> ${customer.name}</p>` : ""}
                    ${customer?.email ? `<p style="margin: 6px 0 0;"><strong>Email:</strong> ${customer.email}</p>` : ""}
                    ${customer?.phone ? `<p style="margin: 6px 0 0;"><strong>Phone:</strong> ${customer.phone}</p>` : ""}
                </div>
            ` : ""}

            ${showOrderSummary ? `
                <div style="border: 1px solid #e5e5e5; border-radius: 10px; padding: 16px; margin: 0 0 16px;">
                    <h2 style="margin: 0 0 12px; font-size: 18px;">Items</h2>

                    ${buildItemsTable(orderItems)}

                    <div style="margin-top: 12px; display: flex; justify-content: flex-end;">
                        <div style="min-width: 220px;">
                            <div style="display: flex; justify-content: space-between; padding: 6px 0;">
                                <span><strong>Total </strong></span>
                                <span><strong>$${money(total)}</strong></span>
                            </div>
                            <div style="font-size: 12px; color: #555; margin-top: 6px;">
                                Payment is done at delivery. Zelle, Cashapp, Venmo, PayPal, and Cash are accepted
                            </div>
                        </div>
                    </div>
                </div>
            ` : ""}

            ${(showNotes && comment) ? `
                <div style="border: 1px solid #e5e5e5; border-radius: 10px; padding: 16px; margin: 0 0 16px;">
                    <h2 style="margin: 0 0 12px; font-size: 18px;">Notes</h2>
                    <p style="margin: 0; white-space: pre-wrap;">${comment}</p>
                </div>
            ` : ""}

            <div style="font-size: 12px; color: #555;">
                <p style="margin: 0 0 6px;">
                    If anything looks wrong, reply to this email with your Order ID and we'll help.
                </p>
                <p style="margin: 0;">
                    Thank you!<br/>
                    <strong>Local Eats With Kandyce</strong>
                </p>
            </div>
        </div>
    `;
}