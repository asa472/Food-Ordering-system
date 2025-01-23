import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { baseUrl } from '../Urls';

export default function MyOrder() {
  const [orderData, setOrderData] = useState({});

  const fetchMyOrder = async () => {
    console.log(localStorage.getItem("userEmail"));
    await fetch(`${baseUrl}/api/myOrderData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    })
    .then(async (res) => {
      let response = await res.json();
      await setOrderData(response);
    })
    .catch((error) => {
      console.error("Error fetching Order Data:", error);
    });
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="container">
            <div className="row"> 
              {Object.keys(orderData).length > 0 && orderData.orderData && orderData.orderData.order_data ? (
                orderData.orderData.order_data.map((item) =>
                  item.map((arrayData) => (
                    <div key={arrayData._id}> 
                      {arrayData.order_date ? (
                        <div className="m-auto mt-5" style={{fontSize: "22px"}}>
                          {arrayData.order_date}
                          <hr />
                        </div>
                      ) : (
                        <div className="col-12 col-md-6 col-lg-3" key={arrayData._id}> 
                          <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                            <div className="card-body">
                              <h5 className="card-title">{arrayData.name}</h5>
                              <div className="container w-100 p-0" style={{ height: "38px", fontSize: "19px" }}>
                                <span className="m-1">{arrayData.qty}</span>
                                <span className="m-1">{arrayData.size}</span>
                                <span className="m-1">{arrayData.order_Date}</span>
                                <div className="d-inline ms-2 h-100 w-20 fs-5">
                                  ₹{arrayData.price}/-
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )
              ) : (
                <div className="m-5 w-100 text-center fs-3 text-danger" style={{ fontSize: "22px" }}>
                  <b>No Orders Present..!! Please Order Something.</b>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
