import axios from "axios";
import * as API from "../../api/index";

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

export async function displayRazorpay(onSuc, onFai, method) {
    try {

        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );
    
        if (!res) {
            onSuc(true);
            onFai("Razorpay SDK failed to load. Are you online?");
            return;
        }
    
        const result = await API.orderCart();
    
        if (!result) {
            onSuc(true);
            onFai("Server error. Are you online?");
            return;
        }
    
        const { amount, id: order_id, currency } = result.data;
    
        const options = {
            key: "rzp_test_R8YlHYUcvcTuHn", // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: "Udemy",
            description: "Payment",
            image: "https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg",
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };
    
                const result = await API.orderSuccess(data);    
                onSuc(true)
            },
            notes: {
                address: "Udemy.com",
            },
            prefill: {
                method: method
            },
            theme: {
                color: "#A435F0",
            },
        };
    
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    } catch ( err ) {
        console.log(err);
    }
};