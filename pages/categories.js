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
          <div className="row align-items-end pb-35 ">
            <div className="col-lg-12 wow fadeInUp delay-0-2s">
              <div className="section-title mb-20 mt-20">
                <span className="sub-title mb-20">
                  Latest Gadgets and Electronics
                </span>
                <h2>Quality Electronics &amp; Gadgets</h2>
              </div>
            </div>
            <div className="col-lg-5 wow fadeInUp delay-0-4s">
              <div className="text mb-20">
                <p>
                  On the other hand, we denounce with righteous indignation and
                  dislike those who are so beguiled and demoralized by the
                  charms of pleasure of the moment, so blinded by desire, that
                  they cannot foresee the pain and trouble that are bound to
                  ensue. Equal blame belongs to those who fail in their duty
                  through weakness of will.
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
                  <h2>Quality Electronics Provider</h2>
                </div>
                <Tab.Container defaultActiveKey={"devices"}>
                  <Nav className="nav jusctify-content-between">
                    <li>
                      <Nav.Link
                        eventKey="devices"
                        className="nav-link"
                        data-toggle="tab"
                        href="#devices"
                      >
                        <i className="flaticon-devices" />
                        <h4>
                          Electronic
                          <br />
                          Devices
                        </h4>
                      </Nav.Link>
                    </li>
                    <li>
                      <Nav.Link
                        eventKey="accessories"
                        className="nav-link"
                        data-toggle="tab"
                        href="#accessories"
                      >
                        <i className="flaticon-headphones" />
                        <h4>
                          Accessories
                          <br />
                          &amp; Gadgets
                        </h4>
                      </Nav.Link>
                    </li>
                  </Nav>
                  <Tab.Content className="tab-content pt-25">
                    <Tab.Pane className="tab-pane fade" eventKey="devices">
                      <p>
                        Providing the latest and innovative electronic devices
                        to meet your technological needs. We aim to enhance your
                        digital lifestyle with cutting-edge gadgets.
                      </p>
                    </Tab.Pane>
                    <Tab.Pane className="tab-pane fade" eventKey="accessories">
                      <p>
                        Explore a wide range of accessories and gadgets to
                        complement your electronic devices. From headphones to
                        smart home devices, we've got you covered.
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
