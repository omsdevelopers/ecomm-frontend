import Isotope from "isotope-layout";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import Spinner from "react-bootstrap/Spinner";

const PopularProducts = ({ products }) => {
  // Isotope
  const isotope = useRef();
  const [filterKey, setFilterKey] = useState("*");
  useEffect(() => {
    setTimeout(() => {
      isotope.current = new Isotope(".popular-products-active", {
        itemSelector: ".item",
        //    layoutMode: "fitRows",
        percentPosition: true,
        masonry: {
          columnWidth: ".item",
        },
        animationOptions: {
          duration: 750,
          easing: "linear",
          queue: false,
        },
      });
    }, 1000);
    //     return () => isotope.current.destroy();
  }, []);
  useEffect(() => {
    if (isotope.current) {
      filterKey === "*"
        ? isotope.current.arrange({ filter: `*` })
        : isotope.current.arrange({ filter: `.${filterKey}` });
    }
  }, [filterKey]);
  const handleFilterKeyChange = (key) => () => {
    setFilterKey(key);
  };

  const activeBtn = (value) => (value === filterKey ? "current" : "");
  const imageurl = process.env.NEXT_API_HOST_URL;

  return (
    <Fragment>
      <div className="row align-items-center pb-30">
        <div className="col-lg-6 wow fadeInUp delay-0-2s ">
          <div className="section-title mb-20">
            <span className="sub-title mb-20">Popular Products</span>
            <h2>Popular Products</h2>
          </div>
        </div>
        {/* <div className="col-lg-6 text-lg-right wow fadeInUp delay-0-4s">
          <ul className="popular-products-filter filter-btns-one mb-20">
            <li
              data-filter="*"
              className={`c-pointer ${activeBtn("*")}`}
              onClick={handleFilterKeyChange("*")}
            >
              Show All
            </li>
            <li
              data-filter=".vegetables"
              className={`c-pointer ${activeBtn("vegetables")}`}
              onClick={handleFilterKeyChange("vegetables")}
            >
              Vegetables
            </li>
            <li
              data-filter=".fruits"
              className={`c-pointer ${activeBtn("fruits")}`}
              onClick={handleFilterKeyChange("fruits")}
            >
              Fruits
            </li>
            <li
              data-filter=".bread"
              className={`c-pointer ${activeBtn("bread")}`}
              onClick={handleFilterKeyChange("bread")}
            >
              Bread &amp; Cakes
            </li>
            <li
              data-filter=".seafish"
              className={`c-pointer ${activeBtn("seafish")}`}
              onClick={handleFilterKeyChange("seafish")}
            >
              Sea Fish
            </li>
          </ul>
        </div> */}
      </div>

      <div className="row">
        {products.length > 0 ? (
          <>
            {products.map((product) => (
              <div
                key={product.id}
                className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6 item fruits bread"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div
                  className="product-item wow fadeInUp delay-0-2s"
                  style={{ flex: "1" }}
                >
                  {/* Displaying discount offer if available */}
                  <span className="offer">50% Off</span>
                  <div className="image">
                    {/* Assuming your image path is static/assets/images/products/ */}
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
                      {/* Displaying star rating */}
                      {Array.from({ length: 5 }).map((_, index) => (
                        <i key={index} className="fas fa-star" />
                      ))}
                    </div>
                    <h5 style={{ height: "50px", overflow: "hidden" }}>
                      {/* Linking to product details page */}
                      <Link href={`/product-details/${product.id}`}>
                        {product.name}
                      </Link>
                    </h5>
                    <span className="price">
                      {/* Displaying original and discounted prices */}
                      {product.price && <span>{product.price}</span>}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </>
        )}
      </div>
    </Fragment>
  );
};
export default PopularProducts;
