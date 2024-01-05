import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layout/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useToasts } from "react-toast-notifications";
import RazorpayScript from "../utils/Razorpay";

const Checkout = () => {
  const router = useRouter();
  const { addToast } = useToasts();

  const [cartData, setCartData] = useState([]);
  const [vat, setVat] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  if (typeof window !== "undefined") {
    var localStorageDatas = JSON.parse(localStorage.getItem("munfirm"));
    var product_id = JSON.parse(localStorage.getItem("product_id"));
  }

  useEffect(() => {
    let localStorageData = JSON.parse(localStorage.getItem("munfirm"));
    setTotalPrice(localStorageData.totalPrice);
    setShipping(localStorageData.shipping);
    setVat(localStorageData.vat);
    setCartData(localStorageData.cartData);
  }, []);

  if (typeof window !== "undefined") {
    var id;
    var session;
    const user = JSON.parse(localStorage.getItem("user")) || {};
    const storedSessionId = localStorage.getItem("cart_session") || null;

    if (!user.id) {
      session = storedSessionId;
    } else {
      id = user.id;
    }
  }

  const quantityString = localStorageDatas?.cartData
    .map((item) => item.quantity)
    .join(", ");

  console.log("Quantity string:", quantityString);

  const [formData, setFormData] = useState({
    user_id: id ? id : null,
    session_id: session ? session : null,
    first_name: "",
    last_name: "",
    number: "",
    email: "",
    company_name: "",
    address: "",
    city: "",
    state: "",
    postcode: "",
    streetName: "",
    apartment: "",
    order_notes: "",
    quantity: quantityString ? quantityString : "0",
    subtotal: localStorageDatas && localStorageDatas.totalPrice,
    product_id,
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    try {
      const response = await axios.post(`${baseUrl}/place-order`, formData);

      console.log("res", response.data.data.prefill.name);
      const orderId = response.data.order_id;

      var options = {
        key: response.data.data.key,
        amount: response.data.data.amount,
        name: response.data.data.name,
        description: response.data.data.description,
        image: response.data.data.image,
        handler: function (response) {
          if (
            typeof response.razorpay_payment_id == "undefined" ||
            response.razorpay_payment_id < 1
          ) {
            console.log("not done");
          } else {
            axios
              .post(`${baseUrl}/payment/store`, {
                razorpay_payment_id: response.razorpay_payment_id,
                order_id: orderId,
              })
              .then((paymentResponse) => {
                router.push("/");
                addToast(paymentResponse.data.data, {
                  appearance: "success",
                  autoDismiss: true,
                });
                console.log("Payment stored:", paymentResponse.data.data);
              })
              .catch((error) => {
                console.error(
                  "Error storing payment on the backend:",
                  error.response ? error.response.data : error.message
                );
              });
          }
        },
        prefill: {
          name: response.data.data.prefill.name,
          email: response.data.data.prefill.email,
          contact: response.data.data.prefill.contact,
        },
        notes: {
          address: response.data.data.notes.address,
          city: response.data.data.notes.city,
        },
        theme: {
          color: response.data.data.theme.color,
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.error(
        "Error placing order:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <Layout footer={3}>
      <RazorpayScript />
      <PageBanner pageName={"Checkout"} />
      <div className="checkout-form-area py-130 rpy-100">
        <div className="container">
          <h4 className="form-title mt-50 mb-25">Billing Details</h4>
          <form
            onSubmit={handleSubmit}
            id="checkout-form"
            className="checkout-form wow fadeInUp delay-0-2s"
            name="checkout-form"
            action="#"
            method="post"
          >
            <div className="row">
              <div className="col-lg-12">
                <h6>Personal Information</h6>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    className="form-control"
                    defaultValue=""
                    // value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    required=""
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    className="form-control"
                    defaultValue=""
                    // value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required=""
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    id="number"
                    name="number"
                    className="form-control"
                    defaultValue=""
                    value={formData.number}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required=""
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    defaultValue=""
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required=""
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    id="company_name"
                    name="company_name"
                    className="form-control"
                    defaultValue=""
                    value={formData.company_name}
                    onChange={handleChange}
                    placeholder="Company name (optional)"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="form-control"
                    defaultValue=""
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Address"
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <h6>Your Address</h6>
              </div>
              {/* <div className="col-md-6 mb-30">
                <div className="form-group">
                  <select name="country" id="country">
                    <option value="value1">Select Country</option>
                    <option value="value2">India</option>
                    <option value="value2">Australia</option>
                    <option value="value3">Canada</option>
                    <option value="value4">China</option>
                    <option value="value5">Morocco</option>
                    <option value="value6">Saudi Arabia</option>
                    <option value="value7">United Kingdom (UK)</option>
                    <option value="value8">United States (US)</option>
                  </select>
                </div>
              </div> */}
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="form-control"
                    defaultValue=""
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    required=""
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    id="state"
                    name="state"
                    className="form-control"
                    defaultValue=""
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    required=""
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    id="postcode"
                    name="postcode"
                    className="form-control"
                    defaultValue=""
                    value={formData.postcode}
                    onChange={handleChange}
                    placeholder="Zip"
                    required=""
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    id="streetName"
                    name="streetName"
                    className="form-control"
                    defaultValue=""
                    value={formData.streetName}
                    onChange={handleChange}
                    placeholder="House, street name"
                    required=""
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    id="apartment"
                    name="apartment"
                    className="form-control"
                    defaultValue=""
                    value={formData.apartment}
                    onChange={handleChange}
                    placeholder="Apartment, suite, unit etc. (optional)"
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <h6>Order Notes (optional)</h6>
              </div>
              <div className="col-md-12">
                <div className="form-group mb-0">
                  <textarea
                    name="order_notes"
                    id="order_notes"
                    className="form-control"
                    rows={5}
                    value={formData.order_notes}
                    onChange={handleChange}
                    placeholder="Notes about your order, e.g. special notes for delivery."
                    defaultValue={""}
                  />
                </div>
              </div>
            </div>
          </form>
          <div className="payment-cart-total pt-25">
            <div className="row justify-content-between">
              <div className="col-lg-6">
                <div className="payment-method mt-45 wow fadeInUp delay-0-2s">
                  <h4 className="form-title my-25">Payment Method</h4>
                  <Accordion
                    defaultActiveKey="collapseOne"
                    as="ul"
                    id="paymentMethod"
                    className="mb-30"
                  >
                    {/* Default unchecked */}
                    <li className="custom-control custom-radio">
                      <input
                        type="radio"
                        className="custom-control-input"
                        id="methodone"
                        name="defaultExampleRadios"
                        defaultChecked
                      />
                      <Accordion.Toggle
                        as="label"
                        className="custom-control-label"
                        htmlFor="methodone"
                        data-toggle="collapse"
                        data-target="#collapseOne"
                        eventKey="collapseOne"
                      >
                        Direct Bank Transfer{" "}
                        <i className="fas fa-money-check" />
                      </Accordion.Toggle>
                      <Accordion.Collapse
                        eventKey="collapseOne"
                        data-parent="#paymentMethod"
                        style={{}}
                      >
                        <p>
                          Make your payment directly into our bank account.
                          Please use your Order ID as the payment reference.
                          Your order will not be shipped our account.
                        </p>
                      </Accordion.Collapse>
                    </li>
                    {/* Default unchecked */}
                    <li className="custom-control custom-radio">
                      <input
                        type="radio"
                        className="custom-control-input"
                        id="methodtwo"
                        name="defaultExampleRadios"
                      />
                      <Accordion.Toggle
                        as="label"
                        className="custom-control-label collapsed"
                        htmlFor="methodtwo"
                        data-toggle="collapse"
                        data-target="#collapseTwo"
                        eventKey="collapseTwo"
                      >
                        Cash On Delivery <i className="fas fa-truck" />
                      </Accordion.Toggle>
                      <Accordion.Collapse
                        eventKey="collapseTwo"
                        data-parent="#paymentMethod"
                        style={{}}
                      >
                        <p>Pay with cash upon delivery.</p>
                      </Accordion.Collapse>
                    </li>
                    {/* Default unchecked */}
                    <li className="custom-control custom-radio">
                      <input
                        type="radio"
                        className="custom-control-input"
                        id="methodthree"
                        name="defaultExampleRadios"
                      />
                      <Accordion.Toggle
                        as="label"
                        className="custom-control-label collapsed"
                        htmlFor="methodthree"
                        data-toggle="collapse"
                        data-target="#collapsethree"
                        eventKey="collapsethree"
                      >
                        Paypal <i className="fab fa-cc-paypal" />
                      </Accordion.Toggle>
                      <Accordion.Collapse
                        eventKey="collapsethree"
                        data-parent="#paymentMethod"
                        style={{}}
                      >
                        <p>
                          Pay via PayPal; you can pay with your credit card if
                          you don’t have a PayPal account.
                        </p>
                      </Accordion.Collapse>
                    </li>
                  </Accordion>
                  <p>
                    Your personal data will be used to process your order,
                    support your experience throughout this website, and for
                    other purposes described in our privacy policy.
                  </p>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="theme-btn mt-15"
                  >
                    Place order
                  </button>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="shoping-cart-total mt-45 wow fadeInUp delay-0-4s">
                  <h4 className="form-title m-25">Cart Totals</h4>
                  <table>
                    <tbody>
                      {cartData.map((card) => (
                        <tr key={card.id}>
                          <td>
                            {card.title} <strong>× {card.quantity}</strong>
                          </td>
                          <td>${(card.quantity * card.price).toFixed(2)}</td>
                        </tr>
                      ))}

                      <tr>
                        <td>Shipping Fee</td>
                        <td>${shipping.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Order Total</strong>
                        </td>
                        <td>
                          <strong>₹{Number(totalPrice).toFixed(2)}</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Checkout;
