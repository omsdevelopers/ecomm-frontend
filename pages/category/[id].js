import Link from "next/link";
import PageBanner from "../../src/components/PageBanner";
import Pagination from "../../src/components/Pagination";
import Layout from "../../src/layout/Layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { cetegoryByproducts } from "../../utils/api";
import { useToasts } from "react-toast-notifications";

const ShopGrid = () => {
  const router = useRouter();
  const { addToast } = useToasts();
  const { id } = router.query;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await cetegoryByproducts(id);
        setProducts(response);
        // setTotalPrice(Number(response.data.price));
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, []);

  return (
    <Layout>
      <PageBanner pageName={"Products"} />

      <section className="shop-page rel z-1 pt-120 rpt-90 pb-130 rpb-100">
        <div className="container">
          <div className="shop-shorter rel z-3 pt-10 mb-40 wow fadeInUp delay-0-2s">
            {/* Add your sorting dropdown or other components here */}
          </div>
          <div className="row show-grid-row">
            {products.length > 0 ? (
              <>
                {products.map((product) => (
                  <Link href={`/product-details/${product.id}`}>
                    <div
                      key={product.id}
                      className="col-xl-3 col-lg-4 col-sm-6"
                    >
                      <div className="product-item wow fadeInUp delay-0-2s">
                        {product.offer && (
                          <span className="offer">{product.offer}</span>
                        )}
                        <div className="image">
                          <img src={product.image} alt={product.name} />
                        </div>
                        <div className="content">
                          {/* <div className="ratting">
                      {[...Array(product.rating)].map((_, index) => (
                        <i key={index} className="fas fa-star" />
                      ))}
                    </div> */}
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
                  </Link>
                ))}
              </>
            ) : (
              <center>No data found </center>
            )}
          </div>
          {/* <ul className="pagination flex-wrap justify-content-center pt-10">
            <Pagination
              paginationCls={".show-grid-row .col-xl-3"}
              defaultSort={8}
            />
          </ul> */}
        </div>
      </section>
    </Layout>
  );
};
export default ShopGrid;
