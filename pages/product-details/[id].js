import Link from "next/link";
import { Nav, Tab } from "react-bootstrap";
import Slider from "react-slick";
import PageBanner from "../../src/components/PageBanner";
import Layout from "../../src/layout/Layout";
import { productActiveTwo } from "../../src/sliderProps";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { fetchData, addToCart } from "../../utils/api";
import { useToasts } from "react-toast-notifications";
import { v4 as uuidv4 } from "uuid";

const ProductDetails = () => {
  const { addToast } = useToasts();
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const [quantity, setQuantity] = useState();
  const [totalPrice, setTotalPrice] = useState();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const apiUrl = `${baseUrl}/products`;

    // Fetch data when the component mounts
    fetchData(apiUrl)
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error setting products:", error));
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${baseUrl}/products/${id}`);
        setProduct(response.data);
        setTotalPrice(Number(response.data.price));
      } catch (error) {
        toast.error(error.response.data.error, {
          duration: 3000, // Adjust the duration as needed
        });
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10) || 1;
    setQuantity(newQuantity);
    if (product) {
      setTotalPrice(newQuantity * product.price);
    }
  };

  const handleAddToCart = async () => {
    let user = JSON.parse(localStorage.getItem("user")) || {};
    let storedSessionId = localStorage.getItem("cart_session") || {};

    if (!storedSessionId) {
      storedSessionId = uuidv4();
      localStorage.setItem("cart_session", storedSessionId);
    }

    try {
      const payload = {
        product_id: product.id,
        name: product.name,
        size: 0,
        quantity,
        price: product.price,
        total: totalPrice,
        user_id: user ? user.id : null,
        session_id: storedSessionId ? storedSessionId : null,
      };
      const cart = await addToCart(payload);

      addToast("Product added to cart successfully", {
        appearance: "success",
        autoDismiss: true,
      });

      router.push("/cart");
    } catch (error) {
      addToast(error, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  const imageurl = process.env.NEXT_API_HOST_URL;

  return (
    <Layout footer={3}>
      <PageBanner pageName={"Product Details"} />
      <section className="product-details-area pt-130 rpt-100">
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-lg-6">
              {/* <div className="product-preview-images rmb-55 wow fadeInLeft delay-0-2s"> */}
              <a href={`${imageurl}/storage/app/public/images/${product.image}`}>
                <img
                  src={`${imageurl}/storage/app/public/images/${product.image}`}
                  width={"600"}
                  alt="Preview"
                />
              </a>
              {/* </div> */}
            </div>
            <div className="col-xl-5 col-lg-6">
              <div className="product-details-content mb-30 wow fadeInRight delay-0-2s">
                <div className="off-ratting mb-15">
                  <span className="off">20 Off</span>
                  <div className="ratting">
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                  </div>
                </div>
                <div className="section-title mb-20">
                  <h2>{product.name}</h2>
                </div>
                <p>{product.description}</p>
                <span className="price mb-20">{totalPrice}</span>
                <hr />
                <form
                  onSubmit={(e) => e.preventDefault()}
                  action="#"
                  className="add-to-cart mt-40 mb-40"
                >
                  <input
                    type="number"
                    defaultValue={1}
                    min={1}
                    max={200}
                    onChange={handleQuantityChange}
                    required=""
                  />
                  <button
                    type="submit"
                    className="theme-btn"
                    onClick={handleAddToCart}
                  >
                    Add to Cart <i className="fas fa-angle-double-right" />
                  </button>
                </form>
                <hr />
                <ul className="category-tags pt-10">
                  <li>
                    <b>Category</b>
                    <span>:</span>
                    <a href="#">Green</a>
                    <a href="#">Vegetables</a>
                  </li>
                  <li>
                    <b>Tags</b>
                    <span>:</span>
                    <a href="#">Organic</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <Tab.Container defaultActiveKey={"details"}>
            <Nav className="nav nav-tabs product-information-tab pt-35 mb-25">
              <li>
                <Nav.Link
                  eventKey={"details"}
                  href="#details"
                  data-toggle="tab"
                >
                  Description
                </Nav.Link>
              </li>
              <li>
                <Nav.Link
                  eventKey={"information"}
                  href="#information"
                  data-toggle="tab"
                >
                  Additional information
                </Nav.Link>
              </li>
              <li>
                <Nav.Link eventKey={"review"} href="#review" data-toggle="tab">
                  Review (05)
                </Nav.Link>
              </li>
            </Nav>
            <Tab.Content className="tab-content wow fadeInUp delay-0-2s">
              <Tab.Pane className="tab-pane" eventKey="details">
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore verit atis et quasi architecto
                  beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                  quia voluptas sit aspernatur aut odit aut fugit, sed quia
                  consequuntur magni dolores eos qui ratione voluptatem sequi
                  nesciunt. Neque porro quisquam est, qui dolorem ipsum quia
                  dolor sit amet, consectetur, adipisci velit sed quia non
                  numquam eius modi tempora incidunt ut labore et dolore magnam
                  aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
                  nostrum exercitationem ullam corporis suscipit laboriosam,
                  nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum
                  iure reprehenderit qui in ea voluptate velit esse quam nihil
                  molestiae consequatur, vel illum qui dolorem eum
                </p>
                <ul className="list-style-one">
                  <li>The Complete Guide To Switching From HTTP To HTTPS</li>
                  <li>
                    Ultimate Digital Clean-Up Checklist: Are You Prepared For
                    The New Year?
                  </li>
                  <li>
                    How To Roll Out New Features Without Hurting Loyal Users
                  </li>
                </ul>
              </Tab.Pane>
              <Tab.Pane className="tab-pane" eventKey="information">
                <p>
                  inventore veritatis et quasi architecto beatae vitae dicta
                  sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                  aspernatur aut odit aut fugit, sed quia consequuntur magni
                  dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
                  quisquam est, qui dolorem ipsum quia dolor sit amet,
                  consectetur, adipisci velit, sed quia non numquam
                </p>
                <ul className="list-style-one mt-25 mb-25">
                  <li>Strong lens for long distance surveillance.</li>
                  <li>WIFI technology can view and view the Internet</li>
                  <li>Wide Angle and Long Length</li>
                  <li>Smart zooming point</li>
                  <li>HD quality video output.</li>
                  <li>Smart Alarming System</li>
                  <li>Power system 12 volts (without adapter)</li>
                </ul>
                <p>
                  Now wherever you are, wherever you are, you can easily monitor
                  your CCTV videos through your mobile, tab, laptop or PC. With
                  the wireless camera, you can view the camera from your mobile
                  or computer to the right-left 0 to 360-degree video. Cover the
                  flower room with a camera.
                </p>
              </Tab.Pane>
              <Tab.Pane className="tab-pane" eventKey="review">
                <ul className="comment-list">
                  <li>
                    <div className="comment-body">
                      <div className="author-thumb">
                        <img
                          src="assets/images/products/review-author1.jpg"
                          alt="Author"
                        />
                      </div>
                      <div className="comment-content">
                        <div className="name-date">
                          <h6>John F. Medina</h6>
                          <span className="comment-date">25 Feb 2022</span>
                          <div className="ratting">
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                          </div>
                        </div>
                        <p>
                          Quis autem vel eum iure reprehenderit quin voluptate
                          velit esseeso quam nihile molestiae consequatur
                          veillum quolore
                        </p>
                        <a href="#" className="reply-link">
                          Reply <i className="fas fa-long-arrow-alt-right" />
                        </a>
                      </div>
                    </div>
                    <ul className="children">
                      <li>
                        <div className="comment-body">
                          <div className="author-thumb">
                            <img
                              src="assets/images/products/review-author2.jpg"
                              alt="Author"
                            />
                          </div>
                          <div className="comment-content">
                            <div className="name-date">
                              <h6>Somalia D. Silva</h6>
                              <span className="comment-date">25 Feb 2022</span>
                              <div className="ratting">
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                              </div>
                            </div>
                            <p>
                              Quis autem vel eum iure reprehenderit quin
                              voluptate velit esseeso quam nihile molestiae
                              consequatur veillum quolore
                            </p>
                            <a href="#" className="reply-link">
                              Reply{" "}
                              <i className="fas fa-long-arrow-alt-right" />
                            </a>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <div className="comment-body">
                      <div className="author-thumb">
                        <img
                          src="assets/images/products/review-author3.jpg"
                          alt="Author"
                        />
                      </div>
                      <div className="comment-content">
                        <div className="name-date">
                          <h6>Roger A. Torrence</h6>
                          <span className="comment-date">25 Feb 2022</span>
                          <div className="ratting">
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                            <i className="fas fa-star" />
                          </div>
                        </div>
                        <p>
                          Quis autem vel eum iure reprehenderit quin voluptate
                          velit esseeso quam nihile molestiae consequatur
                          veillum quolore
                        </p>
                        <a href="#" className="reply-link">
                          Reply <i className="fas fa-long-arrow-alt-right" />
                        </a>
                      </div>
                    </div>
                  </li>
                </ul>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </section>
      {/* Product Details End */}

      {/* Related Products Start */}
      <section className="related-product rel z-1 pt-125 rpt-95 pb-130 rpb-100">
        <div className="container">
          <div className="section-title text-center mb-60">
            <h3>Related Products</h3>
          </div>
          <Slider {...productActiveTwo} className="product-active-two">
            {products.map((product) => (
              <div
                key={product.id}
                className="product-item wow fadeInUp delay-0-2s"
                style={{ height: "300px" }}
              >
                <div className="image">
                  <img src={product.image} alt="Product" />
                </div>
                <div className="content">
                  <div className="ratting">
                    {/* Your existing rating stars */}
                  </div>
                  <h5>
                    <Link href={`/product-details/${product.id}`}>
                      <a>{product.name}</a>
                    </Link>
                  </h5>
                  <span className="price">
                    <span>{product.price}</span>
                  </span>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </Layout>
  );
};
export default ProductDetails;
