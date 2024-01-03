import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import { myOrder } from "../utils/api";
import Layout from "../src/layout/Layout";
import PageBanner from "../src/components/PageBanner";


// const orders = [
//   { id: 1, productName: "Product A", status: "Shipped" },
//   { id: 2, productName: "Product B", status: "Pending" },
//   { id: 3, productName: "Product C", status: "Delivered" },
// ];

const OrderList = () => {

  const [orders, setOrders] = useState([]);

const my_order = async () => {
  try {
    const user = localStorage.getItem('user')
    const user_id = JSON.parse(user)
    const data = await myOrder(user_id.id)
    setOrders(data)
  } catch (error) {
    console.log("Error: ", error);

  }

}

console.log("data", orders)

useEffect(() => {
  my_order()
}, []);

  return (
    <Fragment>
      <Layout>
      <PageBanner pageName={"My Orders"} />
      <div className="container" style={{ marginBottom: "200px", marginTop: "100px" }}>
        <h2>My Orders</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Order ID</th>
              <th scope="col">Product Name</th>
              <th scope="col">Order Status</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order,index) => (
              <tr key={index + 1}>
              <th scope="row">{index + 1}</th>
                <td>{order.name}</td>
                <td>{order.order_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      </Layout>
    </Fragment>
  );
};

export default OrderList;
