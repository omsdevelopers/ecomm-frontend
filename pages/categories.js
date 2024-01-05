import dynamic from "next/dynamic";
import Link from "next/link";
import { Nav, Tab } from "react-bootstrap";
import Slider from "react-slick";
import ClientLogoSlider from "../src/components/ClientLogoSlider";
import { HomeSlider1 } from "../src/components/HomeSlider";
import CustomerReviews from "../src/components/slider/CustomerReviews";
import PhotoGallery from "../src/components/slider/PhotoGallery";
import Layout from "../src/layout/Layout";
import { useEffect, useState } from "react";
import { listCetegory } from "../utils/api";
import PageBanner from "../src/components/PageBanner";

const Index = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategory = async () => {
    const data = await listCetegory();

    setCategories(data);
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <Layout header={1} footer={3}>
      {/* <PageBanner pageName={"Category"}></PageBanner> */}
      {/*End Hidden Sidebar */}
      {/* Category Section Start */}
      <section className="category-section pt-130 rpt-100">
        <div className="container">
          <div className="row align-items-end pb-35">
            <div className="col-lg-12 wow fadeInUp delay-0-2s">
              <div className="section-title mb-20 mt-20">
                <span className="sub-title mb-20">
                  Fresh and Organic Vegetables
                </span>
                <h2>Quality Vegetables from Local Farms</h2>
              </div>
            </div>
            <div className="col-lg-5 wow fadeInUp delay-0-4s">
              <div className="text mb-20">
                <p>
                  Explore our selection of fresh and organic vegetables sourced
                  directly from local farms. We denounce with righteous
                  indignation and dislike those who partake in vegetables
                  tainted by harmful chemicals. Instead, choose our handpicked
                  produce that is free from pesticides and genetically modified
                  organisms. Enjoy the goodness of nature and support
                  sustainable farming practices.
                </p>
              </div>
            </div>
          </div>

          <h2>Our Categories</h2>
          <div className="category-wrap">
            {categories.map((category, index) => (
              <Link href={`/category/${category.id}`}>
                <div
                  key={index}
                  className={`category-item wow fadeInUp delay-0-${3 + index}s`} // Adjust the delay dynamically
                >
                  <div className="icon">
                    <img src={category.image} alt="Icon" />
                  </div>
                  <h5>
                    <Link href={`/category/${category.id}`}>
                      {category.name}
                    </Link>
                  </h5>
                  <img src="assets/images/category/arrow.png" alt="Arrow" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* Category Section End */}
      {/* About Section Start */}
      <section className="about-section pt-85 rpt-55 pb-130 rpb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="about-content rpt-65 wow fadeInRight delay-0-2s">
                <div className="section-title mb-35">
                  <span className="sub-title mb-20">About Company</span>
                  <h2>Quality Vegetable Provider</h2>
                </div>
                <Tab.Container defaultActiveKey={"fresh-produce"}>
                  <Nav className="nav justify-content-between">
                    <li>
                      <Nav.Link
                        eventKey="fresh-produce"
                        className="nav-link"
                        data-toggle="tab"
                        href="#fresh-produce"
                      >
                        <i className="flaticon-vegetables" />
                        <h4>
                          Fresh
                          <br />
                          Produce
                        </h4>
                      </Nav.Link>
                    </li>
                    <li>
                      <Nav.Link
                        eventKey="organic-products"
                        className="nav-link"
                        data-toggle="tab"
                        href="#organic-products"
                      >
                        <i className="flaticon-leaf" />
                        <h4>
                          Organic
                          <br />
                          Products
                        </h4>
                      </Nav.Link>
                    </li>
                  </Nav>
                  <Tab.Content className="tab-content pt-25">
                    <Tab.Pane
                      className="tab-pane fade"
                      eventKey="fresh-produce"
                    >
                      <p>
                        Bringing you the freshest and highest quality vegetables
                        sourced directly from local farms. Our commitment is to
                        provide you with a wide variety of fresh produce to
                        enhance your culinary experiences.
                      </p>
                    </Tab.Pane>
                    <Tab.Pane
                      className="tab-pane fade"
                      eventKey="organic-products"
                    >
                      <p>
                        Explore our range of organic products that promote
                        healthy living. We prioritize sustainability and offer
                        organic alternatives to conventional vegetables,
                        ensuring a nourishing and eco-friendly choice.
                      </p>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section End */}
    </Layout>
  );
};
export default Index;
