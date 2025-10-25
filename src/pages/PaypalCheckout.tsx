import { useCart } from "../CartContext";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const shippingCost = +8.99; // Flat shipping cost, you can modify this as needed

function PaypalCheckoutNoReact({ addressInfo }: { addressInfo: any }) {
  const { cart, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  //const taxAmount = subTotal * taxRate;
  //const totalAmount = +subTotal + +shippingCost; //+ taxAmount;

  const [{ isPending }] = usePayPalScriptReducer();
  /*
  cart.forEach((item) => {
    console.log(
      `Item: ${item.name}, Price: ${item.price}, Quantity: ${item.quantity}`
    );
  });

  console.log("Address info for PayPal checkout:", addressInfo);
  console.log("Cart contents in PaypalCheckoutNoReact:", cart);
  */

  const createOrder = (data: any, actions: any) => {
    // Transform cart items to PayPal items format
    const items = cart.map((item) => ({
      name: item.name,
      unit_amount: {
        currency_code: "USD",
        value: item.price.toFixed(2),
      },
      quantity: item.quantity.toString(),
      category: "PHYSICAL_GOODS", // Default category, you can modify this based on your product types
      sku: `sku_${item.id}`, // Using item ID as SKU
    }));

    const orderTransaction = {
      intent: "CAPTURE",
      payment_source: {
        paypal: {
          experience_context: {
            user_action: "PAY_NOW",
            shipping_preference: "SET_PROVIDED_ADDRESS",
            brand_name: "E-MX Customs",
          },
        },
      },
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: (+total + +shippingCost).toFixed(2),
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: total.toFixed(2),
              },
              shipping: {
                currency_code: "USD",
                value: shippingCost.toFixed(2),
              },
              discount: null, // You can calculate and set discount here if needed
              handling: null, // You can calculate and set handling fee here if needed
              insurance: null, // You can calculate and set insurance fee here if needed
              shipping_discount: null, // You can calculate and set shipping discount here if needed
              tax_total: null, // You can calculate and set tax total here if needed
            },
          },
          shipping: {
            currency_code: "USD",
            value: shippingCost.toFixed(2),
            name: {
              full_name: addressInfo.name,
            },
            address: {
              address_name: addressInfo.name,
              address_line_1: addressInfo.street,
              address_line_2: "",
              admin_area_2: addressInfo.city,
              admin_area_1: addressInfo.state,
              postal_code: "60130",
              country_code: addressInfo.country || "US", // Default to US if country is not provided
            },
          },
          items: items,
        },
      ],
      payer: {
        name: {
          given_name: addressInfo.name.split(" ")[0],
          surname: addressInfo.name.split(" ").slice(1).join(" "),
        },
        email_address: addressInfo.email,
      },
    };

    console.log("Order transaction object in createOrder:", orderTransaction);
    return actions.order.create(orderTransaction);
  };
  const onApprove = (data: any, actions: any) => {
    return actions.order.capture().then(async function (details: any) {
      // console.log("Transaction details in onApprove:", details);
      console.log(
        "Transaction completed by " +
          details.payer.name.given_name +
          ". Transaction ID: " +
          details.id +
          ". Payer ID: " +
          details.payer.payer_id +
          ". Payer Email: " +
          details.payer.email_address +
          ". Shipping Address: " +
          details.purchase_units[0].shipping.address.address_line_1 +
          ", " +
          details.purchase_units[0].shipping.address.admin_area_2 +
          ", " +
          details.purchase_units[0].shipping.address.admin_area_1 +
          ", " +
          details.purchase_units[0].shipping.address.postal_code +
          ", " +
          details.purchase_units[0].shipping.address.country_code
      );

      clearCart();

      try {
        const response = await fetch("https://formspree.io/f/mqagzpzj", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(details),
        });
        await response.json();
        if (!response.ok) {
          alert("❌ There was an error sending your information.");
        }
      } catch (error) {
        alert("⚠️ Network error. Please try again later.");
      }
    });
  };

  const onError = (err: any) => {
    console.error("PayPal Checkout onError", err);
    //alert("An error occurred during the transaction. Please try again.");
    alert(
      err.message ||
        "⚠️An error occurred during the transaction. Please try again."
    );
  };

  const onCancel = (data: any, actions: any) => {
    console.log("PayPal Checkout cancelled" + data);
    //TODO: send to order cancel page
  };

  return (
    <div id="payment_options" className="mt-4">
      {isPending ? (
        <div id="loading">Loading PayPal Buttons...</div>
      ) : (
        <div id="loaded"></div>
      )}
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
        onCancel={onCancel}
      />
    </div>
  );
}
export default PaypalCheckoutNoReact;
