import Link from "next/link";
import PageBanner from "../../src/components/PageBanner";
import Pagination from "../../src/components/Pagination";
import Layout from "../../src/layout/Layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { cetegoryByproducts } from "../../utils/api";
import { useToasts } from "react-toast-notifications";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ShopGrid = () => {
  const router = useRouter();
  const { addToast } = useToasts();
  const { id } = router.query;
  const [products, setProducts] = useState([]);

  const fetchProduct = async () => {
    try {
      const response = await cetegoryByproducts(id);
      setProducts(response);
      // setTotalPrice(Number(response.data.price));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  return (
    <Layout footer={3}>
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
                           <LazyLoadImage
                             src={product.image}
                             alt={product.name}
                             effect="blur" // Optional: Add a blur effect while loading
                             threshold={200} // Optional: Adjust the threshold for when the image starts loading
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
