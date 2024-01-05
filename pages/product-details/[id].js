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
    fetchData(apiUrl, [])
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

    if (
      typeof storedSessionId === "object" &&
      Object.keys(storedSessionId).length === 0
    ) {
      console.log("Inside if block");
      storedSessionId = uuidv4();
      localStorage.setItem("cart_session", storedSessionId);
    } else {
      console.log("Inside else block");
    }

    try {
      const payload = {
        product_id: product.id,
        name: product.name,
        size: 0,
        quantity: quantity || 1,
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
              <a href={product.image}>
                <img src={product.image} width={"600"} alt="Preview" />
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
                  <img
                    src={product.image}
                    style={{
                      height: "185px",
                      width: "100%",
                      objectFit: "contain",
                    }}
                    alt="Product"
                  />
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
