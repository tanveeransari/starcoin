import { useCart } from "../CartContext";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

function PaypalCheckoutNoReact() {
  const { cart, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [{ isPending }] = usePayPalScriptReducer();

  cart.forEach((item) => {
    console.log(
      `Item: ${item.name}, Price: ${item.price}, Quantity: ${item.quantity}`
    );
  });
  console.log("Total amount in PaypalCheckoutNoReact:", total);
  console.log("Cart contents in PaypalCheckoutNoReact:", cart);

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
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: (+total + +10.0).toFixed(2),
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: total.toFixed(2),
              },
              shipping: {
                currency_code: "USD",
                value: "10.00",
              },
            },
          },
          items: items,
        },
      ],
    };
    console.log("Order transaction object in createOrder:", orderTransaction);
    return actions.order.create(orderTransaction);
  };
  const onApprove = (data: any, actions: any) => {
    return actions.order.capture().then(function (details: any) {
      alert("Transaction completed by " + details.payer.name.given_name);
      clearCart();
    });
  };

  const onError = (err: any) => {
    console.error("PayPal Checkout onError", err);
    alert("An error occurred during the transaction. Please try again.");
    //TODO: redirect to error page
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
