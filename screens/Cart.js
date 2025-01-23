import React from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import { ReactComponent as Trash } from "../trash3.svg";
import { baseUrl } from "../Urls";

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  const totalPrice = data.reduce((total, food) => total + food.price, 0);

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    const orderData = {
      amount: totalPrice,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        email: userEmail,
      },
    };

    try {
      const response = await fetch(`${baseUrl}/api/createOrder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const order = await response.json();
      console.log("Order created: ", order);

      const options = {
        key: "rzp_test_Jlz5q9bfq8PpEh",
        amount: order.amount,
        currency: order.currency,
        name: "Foody Web",
        image:
          "https://png.pngtree.com/png-vector/20220623/ourmid/pngtree-food-logo-png-image_5297921.png",
        description: "Ordering Food Online from FoodyWeb Website",
        order_id: order.id,
        handler: async function (response) {
          console.log("Payment successful: ", response);
          const paymentResponse = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };

          try {
            const verifyResponse = await fetch(`${baseUrl}/api/verifyPayment`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(paymentResponse),
            });

            if (!verifyResponse.ok) {
              throw new Error(`HTTP error! Status: ${verifyResponse.status}`);
            }

            const result = await verifyResponse.json();
            console.log("Payment verification result: ", result);

            if (result.status === "success") {
              await fetch(`${baseUrl}/api/orderData`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  order_data: data,
                  email: userEmail,
                  order_date: new Date().toDateString(),
                }),
              });

              dispatch({ type: "DROP" });
              alert("Payment Successful and Order Placed!");
            } else {
              alert("Payment Verification Failed. Please try again.");
            }
          } catch (error) {
            console.error("Error verifying payment: ", error);
            alert("Error verifying payment. Please try again.");
          }
        },
        prefill: {
          email: localStorage.getItem("userEmail"),
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error during checkout: ", error);
      alert("Something went wrong. Please try again.");
    }
  };

  if (data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3 text-danger">
          The Cart is Empty
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
        <table className="table table-hover">
          <thead className="text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <Trash
                      className="bi bi-trash3"
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="text-success fs-2">Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          <button className="btn bg-success mt-5" onClick={handleCheckOut}>
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}
