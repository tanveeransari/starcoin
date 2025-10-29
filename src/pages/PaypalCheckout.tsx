import { calculateCartTotals } from "../CartCalculation";
import { useCart } from "../CartContext";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

function PaypalCheckout({ addressInfo, showPayPal }: { addressInfo: any; showPayPal: boolean }) {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [subtotal, totalAmount, taxAmount, shippingCost] = calculateCartTotals(cart);

  const [{ isPending }] = usePayPalScriptReducer();
  /*
  cart.forEach((item) => {
    console.log(
      `Item: ${item.name}, Price: ${item.price}, Quantity: ${item.quantity}`
    );
  });
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
            value: totalAmount.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: subtotal.toFixed(2),
              },
              shipping: {
                currency_code: "USD",
                value: shippingCost.toFixed(2),
              },
              discount: null, // You can calculate and set discount here if needed
              handling: null, // You can calculate and set handling fee here if needed
              insurance: null, // You can calculate and set insurance fee here if needed
              shipping_discount: null, // You can calculate and set shipping discount here if needed
              tax_total: {
                currency_code: "USD",
                value: taxAmount.toFixed(2),
              }, // You can calculate and set tax total here if needed
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
              address_line_2: addressInfo.apartment || "",
              admin_area_2: addressInfo.city,
              admin_area_1: addressInfo.state,
              postal_code: addressInfo.zip,
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
      // Clear cart and navigate to success page with details
      clearCart();
      // send details to formspree (fire-and-forget)
      (async () => {
        try {
          const response = await fetch("https://formspree.io/f/mqagzpzj", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(details),
          });
          if (!response.ok) {
            console.warn("Formspree returned non-ok status:", response.statusText);
          }
        } catch (err) {
          console.warn("Failed to send order details to Formspree:", err);
        }
      })();

      // Navigate to order success page and pass details via state
      navigate("/order-success", { state: { details } });
    });
  };

  const onError = (err: any) => {
    console.error("PayPal Checkout onError", err);
    alert(err.message || "⚠️An error occurred during the transaction. Please try again.");
  };

  const onCancel = (data: any, actions: any) => {
    console.log("PayPal Checkout cancelled" + data);
    alert("⚠️ The transaction was cancelled.");
  };

  return (
    <div id="paypal-button-container" className="d-flex gap-2 mt-4">
      {showPayPal && (
        <div id="payment_options" className="mt-4">
          {isPending ? <div id="loading">Loading PayPal Buttons...</div> : <div id="loaded"></div>}
          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
            onCancel={onCancel}
          />
        </div>
      )}
    </div>
  );
}
export default PaypalCheckout;
