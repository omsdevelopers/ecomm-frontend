import Link from "next/link";
import { Fragment } from "react";
import { sidebarToggle } from "../utils";
import {
  Blog,
  Categories,
  Contact,
  Home,
  PagesDasktop,
  Portfolio,
  Shop,
} from "./Menus";
import MobileMenu from "./MobileMenu";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Dropdown } from "react-bootstrap";
import { breadCrumbs } from "../../utils/api";
import Skeleton from "react-loading-skeleton";

const Header = ({ header }) => {
  switch (header) {
    case 1:
      return <Header1 />;
    case 2:
      return <Header2 />;
    case 3:
      return <Header3 />;

    default:
      return <DefaultHeader />;
  }
};
export default Header;

const SearchBtn = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <Fragment>
      <button className="far fa-search" onClick={() => setToggle(!toggle)} />
      <form
        onSubmit={(e) => e.preventDefault()}
        action="#"
        className={`${toggle ? "" : "hide"}`}
      >
        <input
          type="text"
          placeholder="Search"
          className="searchbox"
          required=""
        />
        <button type="submit" className="searchbutton far fa-search" />
      </form>
    </Fragment>
  );
};
const DaskTopMenu = () => (
  <ul className="navigation clearfix d-none d-lg-flex">
    <li className="dropdown">
      <Link href="/">
        <a>Home</a>
      </Link>
    </li>
    <li className="dropdown">
      <Link href="/shop">
        <a>shop</a>
      </Link>
      {/* <ul>
        <Shop />
      </ul>
      <div className="dropdown-btn">
        <span className="fas fa-chevron-down" />
      </div> */}
    </li>

    <li className="dropdown">
      <Link href="/categories">
        <a>category</a>
      </Link>
      <ul>
        <Categories />
      </ul>
      <div className="dropdown-btn">
        <span className="fas fa-chevron-down" />
      </div>
    </li>

    <Contact />
  </ul>
);

const Nav = ({ logo, loading }) => {
  const [nav, setNav] = useState(false);

  return (
    <nav className="main-menu navbar-expand-lg mobile-nav">
      <div className="navbar-header">
        <div className="mobile-logo my-15">
          <Link href="/">
            <a>
              {loading ? (
                <>
                  {" "}
                  <p>Loading...</p>
                </>
              ) : (
                <>
                  <img src={logo} alt="Logo" title="Logo" />
                  {/* <img
                src={logo}
                alt="Logo"
                title="Logo"
              /> */}
                </>
              )}
            </a>
          </Link>
        </div>
        {/* Toggle Button */}
        <button
          type="button"
          className="navbar-toggle"
          data-toggle="collapse"
          data-target=".navbar-collapse"
          onClick={() => setNav(!nav)}
        >
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
      </div>
      <div className={`navbar-collapse collapse clearfix ${nav ? "show" : ""}`}>
        <DaskTopMenu />
        <MobileMenu />
      </div>
    </nav>
  );
};

const DefaultHeader = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();

  const [loading, setLoading] = useState(true);
  const [logoImage, setLogoImage] = useState("");

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
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    setUser(user ? JSON.parse(user) : null);
    setIsLoggedIn(!!token);
    lgImage();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    router.push("/"); // Redirect to the home page after logout
  };

  return (
    <header className="main-header">
      <div className="header-top-wrap bg-light-green text-white py-10">
        <div className="container-fluid">
          <div className="header-top">
            <div className="row">
              <div className="col-xl-7 col-lg-6">
                <div className="top-left">
                  <ul>
                    <li>
                      <i className="far fa-envelope" /> <b>Email Us :</b>{" "}
                      <a href="mailto:support@gmail.com">support@gmail.com</a>
                    </li>
                    <li>
                      <i className="far fa-clock" /> <b>Working Hours :</b>{" "}
                      Monday - Friday, 08 am - 05 pm
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-5 col-lg-6">
                <div className="top-right text-lg-right">
                  <ul>
                    <li>
                      <i className="far fa-phone" /> <b>Call :</b>{" "}
                      <a href="callto:+012(345)67899">+999 999 99 99</a>
                    </li>
                    <li>
                      <div className="social-style-one">
                        <a href="#">
                          <i className="fab fa-facebook-f" />
                        </a>
                        <a href="#">
                          <i className="fab fa-twitter" />
                        </a>
                        <a href="#">
                          <i className="fab fa-youtube" />
                        </a>
                        <a href="#">
                          <i className="fab fa-instagram" />
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*Header-Upper*/}
      <div className="header-upper">
        <div className="container-fluid clearfix">
          <div className="header-inner d-flex align-items-center">
            <div className="logo-outer">
              <div className="logo">
                <Link href="/">
                  <a>
                    {loading ? (
                      <>
                        <p>Loading...</p>
                      </>
                    ) : (
                      <img
                        width={"90px"}
                        src={logoImage}
                        alt="Logo"
                        title="Logo"
                      />
                    )}

                    {/* <h3 style={{ marginBottom: "0px" }}>Bharath AB</h3> */}
                  </a>
                </Link>
              </div>
            </div>
            <div className="nav-outer clearfix">
              {/* Main Menu */}
              <Nav logo={logoImage} loading={loading}/>
              {/* Main Menu End*/}
            </div>
            {/* Menu Button */}
            <div className="menu-icons">
              {/* Nav Search */}
              <div className="nav-search py-15">
                <SearchBtn />
              </div>
              <Link href="/cart">
                <button className="cart">
                  <i className="far fa-shopping-basket" />
                  {/* <span>5</span> */}
                </button>
              </Link>
              {isLoggedIn ? (
                <div style={{ marginLeft: "50px" }}>
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="userDropdown">
                      <i className="far fa-user-circle mr-2"></i>
                      {user.name}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="/my-orders">My Orders</Dropdown.Item>
                      <Dropdown.Item onClick={handleLogout}>
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              ) : (
                <Link href="/signup">
                  <button className="user">
                    <span style={{ display: "flex" }}>
                      {" "}
                      <i
                        style={{ marginTop: "6px", marginRight: "5px" }}
                        className="far fa-user-circle"
                      />{" "}
                      Signup
                    </span>
                  </button>
                </Link>
              )}
              <Link href="/contact">
                <a className="theme-btn">
                  Consultations <i className="fas fa-angle-double-right" />
                </a>
              </Link>
              {/* menu sidbar */}
            </div>
          </div>
        </div>
      </div>
      {/*End Header Upper*/}
    </header>
  );
};

const Header1 = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [logoImage, setLogoImage] = useState("");

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    setUser(user ? JSON.parse(user) : null);
    setIsLoggedIn(!!token);
    lgImage();
  }, []);

  const handleLogout = () => {
    // Implement your logout logic here
    // For demonstration purposes, let's remove the token from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    router.push("/"); // Redirect to the home page after logout
  };

  return (
    <header className="main-header menu-absolute">
      <div className="header-top-wrap bg-light-green text-white py-10">
        <div className="container-fluid">
          <div className="header-top">
            <div className="row">
              <div className="col-xl-7 col-lg-6">
                <div className="top-left">
                  <ul>
                    <li>
                      <i className="far fa-envelope" /> <b>Email Us :</b>{" "}
                      <a href="mailto:support@gmail.com">support@gmail.com</a>
                    </li>
                    <li>
                      <i className="far fa-clock" /> <b>Working Hours :</b>{" "}
                      Monday - Friday, 08 am - 05 pm
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-5 col-lg-6">
                <div className="top-right text-lg-right">
                  <ul>
                    <li>
                      <i className="far fa-phone" /> <b>Call :</b>{" "}
                      <a href="callto:+012(345)67899">+012 (345) 678 99</a>
                    </li>
                    <li>
                      <div className="social-style-one">
                        <a href="#">
                          <i className="fab fa-facebook-f" />
                        </a>
                        <a href="#">
                          <i className="fab fa-twitter" />
                        </a>
                        <a href="#">
                          <i className="fab fa-youtube" />
                        </a>
                        <a href="#">
                          <i className="fab fa-instagram" />
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*Header-Upper*/}
      <div className="header-upper">
        <div className="container-fluid clearfix">
          <div className="header-inner d-flex align-items-center">
            <div className="logo-outer">
              <div className="logo">
                <Link href="/">
                  <a>
                    {loading ? (
                      <Skeleton />
                    ) : (
                      <img
                        width={"90px"}
                        src={logoImage}
                        alt="Logo"
                        title="Logo"
                      />
                    )}
                    {/* <h3 style={{ marginBottom: "0px" }}>Bharath AB</h3> */}
                  </a>
                </Link>
              </div>
            </div>
            <div className="nav-outer clearfix">
              {/* Main Menu */}
              <Nav logo={logoImage} />
              {/* Main Menu End*/}
            </div>
            {/* Menu Button */}
            <div className="menu-icons">
              {/* Nav Search */}
              <div className="nav-search py-15">
                <SearchBtn />
              </div>
              <Link href="/cart">
                <button className="cart">
                  <i className="far fa-shopping-basket" />
                  {/* <span>5</span> */}
                </button>
              </Link>
              {isLoggedIn ? (
                <div style={{ marginLeft: "50px" }}>
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="userDropdown">
                      <i className="far fa-user-circle mr-2"></i>
                      {user.name}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="/my-orders">My Orders</Dropdown.Item>
                      <Dropdown.Item onClick={handleLogout}>
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              ) : (
                <Link href="/signup">
                  <button className="user">
                    <span style={{ display: "flex" }}>
                      {" "}
                      <i
                        style={{ marginTop: "6px", marginRight: "5px" }}
                        className="far fa-user-circle"
                      />{" "}
                      Signup
                    </span>
                  </button>
                </Link>
              )}

              <Link href="/contact">
                <a className="theme-btn">
                  Consultations <i className="fas fa-angle-double-right" />
                </a>
              </Link>
              {/* menu sidbar */}
            </div>
          </div>
        </div>
      </div>
      {/*End Header Upper*/}
    </header>
  );
};

const Header2 = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [logoImage, setLogoImage] = useState("");

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    setUser(user ? JSON.parse(user) : null);
    setIsLoggedIn(!!token);
    lgImage();
  }, []);

  const handleLogout = () => {
    // Implement your logout logic here
    // For demonstration purposes, let's remove the token from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    router.push("/"); // Redirect to the home page after logout
  };

  return (
    <header className="main-header header-two">
      <div className="header-top-wrap">
        <div className="container">
          <div className="header-top bg-light-green text-white py-10">
            <div className="row">
              <div className="col-xl-7 col-lg-6">
                <div className="top-left">
                  <ul>
                    <li>
                      <i className="far fa-envelope" /> <b>Email Us :</b>{" "}
                      <a href="mailto:support@gmail.com">support@gmail.com</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-5 col-lg-6">
                <div className="top-right text-lg-right">
                  <ul>
                    <li>
                      <i className="far fa-phone" /> <b>Call :</b>{" "}
                      <a href="callto:+012(345)67899">+999 999 99 99</a>
                    </li>
                    <li>
                      <div className="social-style-one">
                        <a href="#">
                          <i className="fab fa-facebook-f" />
                        </a>
                        <a href="#">
                          <i className="fab fa-twitter" />
                        </a>
                        <a href="#">
                          <i className="fab fa-youtube" />
                        </a>
                        <a href="#">
                          <i className="fab fa-instagram" />
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*Header-Upper*/}
      <div className="header-upper">
        <div className="container rel clearfix">
          <div className="header-inner d-flex align-items-center">
            <div className="logo-outer">
              <div className="logo">
                <Link href="/">
                  <a>
                    {loading ? (
                      <p>Loading...</p>
                    ) : (
                      <>
                        <img
                          width={"90px"}
                          src={logoImage}
                          alt="Logo"
                          title="Logo"
                        />
                        <img
                          width={"90px"}
                          src={logoImage}
                          alt="Logo"
                          title="Logo"
                        />
                      </>
                    )}
                    {/* <h3 style={{ marginBottom: "0px" }}>Bharath AB</h3> */}
                  </a>
                </Link>
              </div>
            </div>
            <div className="nav-outer clearfix">
              {/* Main Menu */}
              <Nav logo={logoImage} loading={loading} />
              {/* Main Menu End*/}
            </div>
            {/* Menu Button */}
            <div className="menu-icons">
              {/* Nav Search */}
              <Link href="/cart">
                <button className="cart">
                  <i className="far fa-shopping-basket" />
                </button>
              </Link>

              {isLoggedIn ? (
                <div style={{ marginLeft: "50px" }}>
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="userDropdown">
                      <i className="far fa-user-circle mr-2"></i>
                      {user.name}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="/my-orders">My Orders</Dropdown.Item>
                      <Dropdown.Item onClick={handleLogout}>
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              ) : (
                <Link href="/signup">
                  <button className="user">
                    <span style={{ display: "flex" }}>
                      {" "}
                      <i
                        style={{ marginTop: "6px", marginRight: "5px" }}
                        className="far fa-user-circle"
                      />{" "}
                      Signup
                    </span>
                  </button>
                </Link>
              )}

              {/* menu sidbar */}
            </div>
          </div>
        </div>
      </div>
      {/*End Header Upper*/}
    </header>
  );
};

const Header3 = () => (
  <header className="main-header header-three menu-absolute">
    <div className="header-top-wrap bgc-primary py-10">
      <div className="container-fluid">
        <div className="header-top px-0">
          <ul>
            <li>25% OFF Upcoming Product</li>
            <li>100% Fresh &amp; natural foods</li>
            <li>free shipping over $99</li>
            <li>money back guarantee</li>
            <li>cash on delivery</li>
          </ul>
        </div>
      </div>
    </div>
    <div className="header-middle py-15">
      <div className="container-fluid">
        <div className="header-middle-inner">
          <div className="menu-middle-left">
            <select name="currentcy" id="currentcy">
              <option value="USD">USD</option>
              <option value="BDT">BDT</option>
              <option value="EURO">EURO</option>
            </select>

            <select name="language" id="language">
              <option value="English">English</option>
              <option value="Bengali">Bengali</option>
              <option value="Arabic">Arabic</option>
            </select>

            <div className="follower">
              <i className="fab fa-facebook" />
              <a href="#">250k+ Followers</a>
            </div>
          </div>
          <div className="logo-outer">
            <div className="logo">
              <Link href="/">
                <a>
                  <img
                    src="assets/images/logos/logo-two.png"
                    alt="Logo"
                    title="Logo"
                  />
                </a>
              </Link>
            </div>
          </div>
          {/* Menu Button */}
          <div className="menu-icons">
            {/* Nav Search */}
            <form
              onSubmit={(e) => e.preventDefault()}
              action="#"
              className="nav-search"
            >
              <input
                type="text"
                placeholder="Search here"
                className="searchbox"
                required=""
              />
              <button type="submit" className="searchbutton far fa-search" />
            </form>
            <button className="cart">
              <i className="far fa-shopping-basket" />
              <span>5</span>
            </button>
            <button className="user">
              <i className="far fa-user-circle" />
            </button>
            <button className="heart">
              <i className="far fa-heart" />
            </button>
          </div>
        </div>
      </div>
    </div>
    {/*Header-Upper*/}
    <div className="header-upper px-0">
      <div className="container-fluid clearfix">
        <div className="header-inner d-flex align-items-center">
          <div className="nav-outer clearfix">
            {/* Main Menu */}
            <Nav />
            {/* Main Menu End*/}
          </div>
          {/* menu sidbar */}
          <div className="menu-sidebar" onClick={() => sidebarToggle()}>
            <button>
              <i className="far fa-ellipsis-h" />
              <i className="far fa-ellipsis-h" />
              <i className="far fa-ellipsis-h" />
            </button>
          </div>
        </div>
      </div>
    </div>
    {/*End Header Upper*/}
  </header>
);
