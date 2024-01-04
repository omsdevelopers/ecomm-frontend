import Link from "next/link";
import PageBanner from "../src/components/PageBanner";
import Pagination from "../src/components/Pagination";
import Layout from "../src/layout/Layout";
import { useEffect, useState } from "react";
import { fetchData } from "../utils/api";

const ShopLeftSidebar = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const apiUrl = `${baseUrl}/products`;
    // Fetch data when the component mounts
    fetchData(apiUrl)
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error setting products:", error));
  }, []);

  return (
    <Layout footer={3}>
      <PageBanner pageName={"Products"} />

      <section className="shop-page rel z-1 pt-65 rpt-35 pb-130 rpb-100">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-8">
              <div className="shop-sidebar mt-65">
                <div className="widget widget-search wow fadeInUp delay-0-2s">
                  <form onSubmit={(e) => e.preventDefault()} action="#">
                    <input
                      type="text"
                      placeholder="Search keywords"
                      required=""
                    />
                    <button
                      type="submit"
                      className="searchbutton fa fa-search"
                    />
                  </form>
                </div>
                <div className="widget widget-menu wow fadeInUp delay-0-4s">
                  <h4 className="widget-title">
                    <i className="flaticon-leaf-1" />
                    Category
                  </h4>
                  <ul>
                    <li>
                      <Link href="#">Organic Fruits</Link> <span>(8)</span>
                    </li>
                    <li>
                      <Link href="#">Fresh Vegetables</Link> <span>(5)</span>
                    </li>
                    <li>
                      <Link href="#">Crisp Bread &amp; Cake</Link>{" "}
                      <span>(3)</span>
                    </li>
                    <li>
                      <Link href="#">Sea Foods</Link> <span>(9)</span>
                    </li>
                    <li>
                      <Link href="#">Chiken Eggs</Link> <span>(4)</span>
                    </li>
                    <li>
                      <Link href="#">Milk &amp; Meat</Link> <span>(6)</span>
                    </li>
                  </ul>
                </div>
                <div className="widget widget-menu wow fadeInUp delay-0-2s">
                  <h4 className="widget-title">
                    <i className="flaticon-leaf-1" />
                    Filter By Pricing
                  </h4>
                  <ul>
                    <li>
                      <Link href="#">$05 - $10</Link> <span>(159)</span>
                    </li>
                    <li>
                      <Link href="#">$12 - $25</Link> <span>(240)</span>
                    </li>
                    <li>
                      <Link href="#">$50 - $100</Link> <span>(183)</span>
                    </li>
                    <li>
                      <Link href="#">$120 - $300</Link> <span>(324)</span>
                    </li>
                    <li>
                      <Link href="#">$500 - $1000</Link> <span>(95)</span>
                    </li>
                    <li>
                      <Link href="#">$1050 - $1500</Link> <span>(289)</span>
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
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="col-xl-4 col-lg-6 col-md-4 col-sm-6"
                  >
                    <div className="product-item wow fadeInUp delay-0-2s">
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
                        />{" "}
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
                ))}
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
