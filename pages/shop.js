import Link from "next/link";
import PageBanner from "../src/components/PageBanner";
import Pagination from "../src/components/Pagination";
import Layout from "../src/layout/Layout";
import { useEffect, useState } from "react";
import { fetchData, listCetegory } from "../utils/api";

const ShopLeftSidebar = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [priceFilter, setPriceFilter] = useState([]);
  const [activeButton, setActiveButton] = useState(null);

  const fetchCategory = async () => {
    const data = await listCetegory();

    setCategories(data);
  };
  const fetchProducts = async () => {
    const apiUrl = `${baseUrl}/products`;

    // If priceFilter is not empty, include it in the request body
    const requestBody = priceFilter.length > 0 ? { price: priceFilter } : {};

    try {
      const data = await fetchData(apiUrl, requestBody);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchCategory();
    fetchProducts();
  }, [priceFilter]);

  const handlePriceFilter = (min, max) => {
    setPriceFilter([min, max]);
    setActiveButton(`${min}-${max}`);
  };

  const handleAllProducts = () => {
    setPriceFilter([]);
    setActiveButton(null);
  };

  return (
    <Layout footer={3}>
      <PageBanner pageName={"Products"} />

      <section className="shop-page rel z-1 pt-65 rpt-35 pb-130 rpb-100">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-6 col-md-4 col-sm-6">
            {/* col-xl-4 col-lg-6 col-md-4 col-sm-6 */}
              <div className="shop-sidebar mt-65">
                <div className="widget widget-menu wow fadeInUp delay-0-4s">
                  <h4 className="widget-title">
                    <i className="flaticon-leaf-1" />
                    Category
                  </h4>
                  <ul>
                    {categories.map((category) => (
                      <li key={category.id}>
                        <Link href={`/category/${category.id}`}>
                          {category.name}
                        </Link>{" "}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="widget widget-menu wow fadeInUp delay-0-2s">
                  <h4 className="widget-title">
                    <i className="flaticon-leaf-1" />
                    Filter By Pricing
                  </h4>
                  <ul>
                    <li>
                      <button
                        onClick={handleAllProducts}
                        style={{
                          backgroundColor:
                            activeButton === null ? "#your-active-color" : "",
                          color: activeButton === null ? "green" : "",
                        }}
                      >
                        {" "}
                        All Products{" "}
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handlePriceFilter(50, 100)}
                        style={{
                          backgroundColor:
                            activeButton === "50-100"
                              ? "#your-active-color"
                              : "",
                          color: activeButton === "50-100" ? "green" : "",
                        }}
                      >
                        {" "}
                        ₹50 - ₹100{" "}
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handlePriceFilter(120, 300)}
                        style={{
                          backgroundColor:
                            activeButton === "120-300"
                              ? "#your-active-color"
                              : "",
                          color: activeButton === "120-300" ? "green" : "",
                        }}
                      >
                        {" "}
                        ₹120 - ₹300{" "}
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handlePriceFilter(500, 1000)}
                        style={{
                          backgroundColor:
                            activeButton === "500-1000"
                              ? "#your-active-color"
                              : "",
                          color: activeButton === "500-1000" ? "green" : "",
                        }}
                      >
                        {" "}
                        ₹500 - ₹1000{" "}
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handlePriceFilter(1050, 1500)}
                        style={{
                          backgroundColor:
                            activeButton === "1050-1500"
                              ? "#your-active-color"
                              : "",
                          color: activeButton === "1050-1500" ? "green" : "",
                        }}
                      >
                        {" "}
                        ₹1050 - ₹1500{" "}
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handlePriceFilter(1500)}
                        style={{
                          backgroundColor:
                            activeButton === "1500" ? "#your-active-color" : "",
                          color: activeButton === "1500" ? "green" : "",
                        }}
                      >
                        {" "}
                        ₹1500 - More{" "}
                      </button>
                    </li>
                  </ul>
                </div>
              </div>{" "}
            </div>
            <div className="col-xl-9 col-lg-8 mt-55">
              <div className="shop-shorter rel z-3 pt-10 mb-40 wow fadeInUp delay-0-2s">
                {/* ... (Dropdown for sorting) */}
              </div>
              <div className="row shop-left-sidebar-row">
                {products.length > 0 ? (
                  products.map((product) => (
                    <div
                      key={product.id}
                      className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6"
                      style={{ marginBottom: "25px" }}
                    >
                      <div
                        className="product-item wow fadeInUp delay-0-2s"
                        style={{ height: "100%" }}
                      >
                        {product.offer && (
                          <span className="offer">{product.offer}</span>
                        )}
                        <div className="image">
                          <img
                            src={product.image}
                            alt={product.name}
                            style={{
                              height: "185px",
                              width: "100%",
                              objectFit: "contain",
                            }}
                          />
                        </div>
                        <div className="content">
                          <div className="ratting">
                            {Array.from({ length: 5 }).map((_, index) => (
                              <i key={index} className="fas fa-star" />
                            ))}
                          </div>
                          <h5>
                            <Link href={`/product-details/${product.id}`}>
                              {product.name}
                            </Link>
                          </h5>
                          {product.discountedPrice ? (
                            <span className="price">
                              <del>{product.originalPrice}</del>
                              <span>{product.discountedPrice}</span>
                            </span>
                          ) : (
                            <span className="price">
                              <span>{product.price}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12">
                    <p>No products found</p>
                  </div>
                )}
              </div>

              <ul className="pagination flex-wrap justify-content-center pt-10">
                <Pagination
                  paginationCls={".shop-left-sidebar-row .col-xl-4"}
                  defaultSort={6}
                />
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ShopLeftSidebar;
