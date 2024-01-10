import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { breadCrumbs } from "../../utils/api";

const Counter = dynamic(() => import("../components/Counter"), {
  ssr: false,
});

const Footer = ({ footer }) => {
  const [logoImage, setLogoImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lgImage = async () => {
      try {
        const data = await breadCrumbs();
        setLogoImage(data.logo_image);
      } catch (error) {
        console.error("Error fetching logo image:", error);
      } finally {
        setLoading(false);
      }
    };

    lgImage();
  }, []);

  switch (footer) {
    case 1:
      return <DefaultFooter logo={logoImage} />;
    case 3:
      return <DefaultFooter logo={logoImage} />;
    default:
      return <DefaultFooter logo={logoImage} />;
  }
};
export default Footer;

const ScrollTopBtn = () => {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <button
      style={{ display: "inline-block" }}
      className="scroll-top scroll-to-target"
      data-target="html"
      onClick={() => scrollTop()}
    >
      <span className="fas fa-angle-double-up" />
    </button>
  );
};

const DefaultFooter = ({ logo }) => (
  <footer className="main-footer bg-green text-white">
    <div className="container">
      <div className="footer-top-newsletter py-80 mb-75">
        <div className="section-title">
          <h2>Newsletter Subscribe</h2>
        </div>
        <form onSubmit={(e) => e.preventDefault()} action="#">
          <input type="email" placeholder="Email Address" required="" />
          <button className="theme-btn">
            subscribe now <i className="fas fa-angle-double-right" />
          </button>
        </form>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6 order-md-2">
          <div className="footer-widget about-widget text-center">
            <div className="footer-logo mb-30">
              <div className="logo">
                <Link href="/">
                  <a>
                    <img width={"90px"} src={logo} alt="Logo" title="Logo" />

                    {/* <h3 style={{ marginBottom: "0px" }}>Bharath AB</h3> */}
                  </a>
                </Link>
              </div>
            </div>
            <p>
              Electronics produced without the use of synthetic components or
              chemicals diminish exposure to potentially harmful substances,
              promoting a safer and more sustainable technological lifestyle.
            </p>
            <div className="social-style-two pt-10">
              <Link href="/contact">
                <a>
                  <i className="fab fa-facebook-f" />
                </a>
              </Link>
              <Link href="/contact">
                <a>
                  <i className="fab fa-twitter" />
                </a>
              </Link>
              <Link href="/contact">
                <a>
                  <i className="fab fa-linkedin-in" />
                </a>
              </Link>
              <Link href="/contact">
                <a>
                  <i className="fab fa-youtube" />
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 order-md-1">
          <div className="footer-widget menu-widget ">
            <h4 className="footer-title">Quick Links</h4>
            <ul>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
              <li>
                <Link href="/PrivacyPolicy">Setting &amp; Privacy</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 order-md-3">
          <div className="footer-widget contact-widget">
            <h4 className="footer-title">Contact Us</h4>
            <p>
              "Cutting-edge electronic devices for enriched living and robust
              well-being.{" "}
            </p>
            <ul>
              <li>
                <i className="fal fa-map-marker-alt" />
                53 Main Street, 2nd Mountain 3rd Floor, Kanyakumari
              </li>
              <li>
                <i className="far fa-envelope" />
                <a href="calto:+012(345)67899">+999 999 99 99</a>
              </li>
              <li>
                <i className="far fa-phone" />
                <a href="mailto:support@gmail.com">support@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="copyright-area pt-25 pb-10">
        <p>Copyright © 2022 Bharath AB . All Rights Reserved.</p>
        <ul className="footer-menu">
          <li>
            <Link href="/contact">Setting &amp; Privacy</Link>
          </li>
          <li>
            <Link href="/faqs">
              <a>Faqs</a>
            </Link>
          </li>
          <li>
            <Link href="/contact">Payments</Link>
          </li>
        </ul>
        {/* Scroll Top Button */}
        <ScrollTopBtn />
      </div>
    </div>
    <div className="footer-shapes">
      <img
        className="footer-bg"
        src="/assets/images/background/footer-bg-shape.png"
        alt="Shape"
      />
    </div>
  </footer>
);
const Footer3 = () => (
  <footer className="main-footer footer-black text-white">
    <div className="container-fluid">
      <div className="footer-top-newsletter py-80 mb-75">
        <div className="section-title">
          <h2>Newsletter Subscribe</h2>
        </div>
        <form onSubmit={(e) => e.preventDefault()} action="#">
          <input type="email" placeholder="Email Address" required="" />
          <button className="theme-btn">
            subscribe now <i className="fas fa-angle-double-right" />
          </button>
        </form>
        <div className="happy-clients counter-item">
          <i className="flaticon-quote" />
          <b className="count-text" data-speed={3000} data-stop={56384}>
            <Counter end={56384} />
          </b>
          <span>Happy Clients</span>
        </div>
      </div>

      <div className="row justify-content-between">
        <div className="col-xl-12">
          <div className="row justify-content-around">
            <div className="col-sm-4">
              <div className="footer-widget about-widget">
                <div className="footer-logo mb-30">
                  <Link href="/">
                    <a>
                      <h3> Bharath AB</h3>
                    </a>
                  </Link>
                </div>
                <p>
                  Electronics produced without the use of synthetic components
                  or chemicals diminish exposure to potentially harmful
                  substances, promoting a safer and more sustainable
                  technological lifestyle.
                </p>
                <div className="social-style-two pt-10">
                  <Link href="/contact">
                    <a>
                      <i className="fab fa-facebook-f" />
                    </a>
                  </Link>
                  <Link href="/contact">
                    <a>
                      <i className="fab fa-twitter" />
                    </a>
                  </Link>
                  <Link href="/contact">
                    <a>
                      <i className="fab fa-linkedin-in" />
                    </a>
                  </Link>
                  <Link href="/contact">
                    <a>
                      <i className="fab fa-youtube" />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="footer-widget menu-widget">
                <h4 className="footer-title">Quick Links</h4>
                <ul>
                  <li>
                    <Link href="/about">
                      <a>About Us</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/services">
                      <a>Services</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/portfolio-grid">
                      <a>Our Projects</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/farmers">
                      <a>Meet Farmers</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog-grid">
                      <a>Latest News</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/service-details">
                      <a>Vegetables</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-sm-4">
              <div className="footer-widget contact-widget">
                <h4 className="footer-title">Contact Us</h4>
                <p>
                  Nutrient-rich organic produce for wholesome living and vibrant
                  health.{" "}
                </p>
                <ul>
                  <li>
                    <i className="fal fa-map-marker-alt" />
                    53 Main Street, 2nd Mountain 3rd Floor, New York
                  </li>
                  <li>
                    <i className="far fa-phone" />
                    <a href="mailto:support@gmail.com">support@gmail.com</a>
                  </li>
                  <li>
                    <i className="far fa-envelope" />
                    <a href="calto:+012(345)67899">+012 (345) 678 99</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="copyright-area-wrap">
      <div className="container-fluid">
        <div className="copyright-area pt-25 pb-10">
          <p>Copyright © 2022 Bharath AB . All Rights Reserved.</p>
          <ul className="footer-menu">
            <li>
              <Link href="/termsCondition">
                <a>Terms &amp; condition</a>
              </Link>
            </li>
            <li>
              <Link href="/PrivacyPolicy">
                <a>Privacy Policy</a>
              </Link>
            </li>
            <li>
              <Link href="/ShippingPolicy">
                <a>Shipping Policy</a>
              </Link>
            </li>
          </ul>
          {/* Scroll Top Button */}
          <button className="scroll-top scroll-to-target" data-target="html">
            <span className="fas fa-angle-double-up" />
          </button>
        </div>
      </div>
    </div>
    <div className="footer-shapes">
      <img
        className="footer-bg"
        src="/assets/images/background/footer-bg-shape.png"
        alt="Shape"
      />
      <img
        className="shape-one"
        src="/assets/images/shapes/footer1.png"
        alt="Shape"
      />
      <img
        className="shape-two"
        src="/assets/images/shapes/footer2.png"
        alt="Shape"
      />
      <img
        className="shape-three"
        src="/assets/images/shapes/footer3.png"
        alt="Shape"
      />
      <img
        className="shape-four"
        src="/assets/images/shapes/footer4.png"
        alt="Shape"
      />
    </div>
  </footer>
);
