import { useState } from "react";
import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layout/Layout";
import { useToasts } from "react-toast-notifications";
import { messageUS } from "../utils/api";

const ContactUs = () => {
  const { addToast } = useToasts();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  // Update form values based on user input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);

    try {
      const data = await messageUS(formData);

      addToast("Message sent successfully", {
        appearance: "success",
        autoDismiss: true,
      });
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch (e) {
      addToast("Sending message failed!", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <Layout footer={3}>
      <PageBanner pageName={"Contact Us"} />{" "}
      <section className="contact-info-area rel z-1 pt-130 rpt-100">
        <div className="container">
          <div className="section-title contact-title mb-50 wow fadeInUp delay-0-2s">
            <span className="sub-title mb-15">Get in Touch</span>
            <h3>Need Consultations ?</h3>
          </div>
          <div className="row">
            <div className="col-xl-4 col-md-6">
              <div className="contact-info-item wow fadeInUp delay-0-4s">
                <div className="icon">
                  <img src="assets/images/contact/icon1.png" alt="Icon" />
                </div>
                <div className="content">
                  <h4>Location</h4>
                  <span>57 Main Street, 2nd Block 3rd Floor, New York</span>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="contact-info-item wow fadeInUp delay-0-5s">
                <div className="icon">
                  <img src="assets/images/contact/icon2.png" alt="Icon" />
                </div>
                <div className="content">
                  <h4>Email Us</h4>
                  <a href="mailto:organicfarm@mail.net">organicfarm@mail.net</a>
                  <br />
                  <a href="mailto:support@info.com">support@info.com</a>
                  <br />
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="contact-info-item wow fadeInUp delay-0-6s">
                <div className="icon">
                  <img src="assets/images/contact/icon3.png" alt="Icon" />
                </div>
                <div className="content">
                  <h4>Phone Us</h4>
                  <a href="callto:+000(111)345678">+000 (111) 345 678</a>
                  <br />
                  <a href="callto:+012(345)67899">+012 (345) 678 99</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="contact-shapes">
          <img
            className="leafs"
            src="assets/images/shapes/shapescontact1.png"
            alt="Leafs"
          />
          {/* <img
            className="pumpkin"
            src="assets/images/shapes/pumpkin.png"
            alt="pumpkin"
          /> */}
        </div>
      </section>
      {/* Contact Info End */}
      {/* Contact From Start */}
      <section className="contact-form-area rel z-1 pt-100 rpt-70 pb-130 rpb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <form
                onSubmit={handleSubmit}
                id="contactForm"
                className="contact-form rmb-65 wow fadeInLeft delay-0-2s"
                name="contactForm"
                action="assets/php/form-process.php"
                method="post"
              >
                <div className="section-title contact-title mb-55">
                  <span className="sub-title mb-15">Contact With Us</span>
                  <h3>Send Us Message</h3>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        placeholder="Full Name"
                        onChange={handleInputChange}
                        required=""
                        data-error="Please enter your name"
                      />
                      <div className="help-block with-errors" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        className="form-control"
                        value={formData.phone}
                        placeholder="Phone Number"
                        onChange={handleInputChange}
                        required=""
                        data-error="Please enter your Phone Number"
                      />
                      <div className="help-block with-errors" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        placeholder="Email Address"
                        onChange={handleInputChange}
                        required=""
                        data-error="Please enter your Address"
                      />
                      <div className="help-block with-errors" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <textarea
                        name="message"
                        id="message"
                        className="form-control"
                        rows={4}
                        value={formData.message}
                        placeholder="Write Message"
                        onChange={handleInputChange}
                        required
                        data-error="Please enter your Message"
                      />
                      <div className="help-block with-errors" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group mb-0">
                      <button type="submit" className="theme-btn style-two">
                        Send Message
                        <i className="fas fa-angle-double-right" />
                      </button>
                      <div id="msgSubmit" className="hidden" />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-lg-6">
              <div className="contact-right-image wow fadeInRight delay-0-4s">
                <img
                  src="assets/images/contact/contact1.png"
                  alt="Contact From"
                />
                <img
                  className="bg"
                  src="assets/images/contact/contact-right-bg.png"
                  alt="Contact From BG"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="contact-shapes">
        
          <img
            className="shape"
            src="assets/images/shapes/contact-shape.png"
            alt="Shape"
          />
        
        </div>
      </section>
    </Layout>
  );
};
export default ContactUs;
