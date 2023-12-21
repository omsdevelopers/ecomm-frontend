import Link from "next/link";
import ClientLogoSlider from "../src/components/ClientLogoSlider";
import FeedbackTwoSlider from "../src/components/FeedbackTwoSlider";
import PageBanner from "../src/components/PageBanner";
import ExperienceTeam from "../src/components/slider/ExperienceTeam";
import PhotoGallery from "../src/components/slider/PhotoGallery";
import Layout from "../src/layout/Layout";
const Profile = () => {
  return (
    <Layout footer={3}>
      <PageBanner pageName={"Profile Page"} />
      {/* Page Banner End */}
      {/* About Section Start */}
      <section className="container">

        <div className="row">
          <div className="col-md-3">
            <div className=" mt-3">
              <img
                src="assets/images/a5.jpg"
              
                style={{ height: '200px', width: '200px', borderRadius: '50%', marginLeft: '50px' }}
                alt="Preview"
              />
<div>
              <h3 className="" style={{marginTop:'50px',marginLeft:'60PX'}}>Bharath AB</h3>

</div>

            </div>
          </div>

          <div className="col-md-9">
            <div className="card mt-3">
              <div className="card-body">
                {/* Form for Profile Information */}
                <form>
                  {/* Name Input */}
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Your Name" />
                  </div>

                  {/* Email Input */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="your@email.com" />
                  </div>

                  {/* Mobile Number Input */}
                  <div className="mb-3">
                    <label htmlFor="mobile" className="form-label">Mobile Number</label>
                    <input type="tel" className="form-control" id="mobile" placeholder="123-456-7890" />
                  </div>

                  {/* Address Input */}
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <textarea className="form-control" id="address" rows="3" placeholder="Your Address"></textarea>
                  </div>

                  <Link href="/shop-grid">
                    <a
                      className="theme-btn style-three"
                      style={{
                        backgroundColor: '#ff7800',
                        transition: 'background-color 0.3s', // Add a smooth transition for better user experience
                        display: 'inline-block',
                        padding: '10px 20px',
                        textDecoration: 'none',
                        border: 'none',
                        color: 'white'
                      }}
                      onMouseOver={(e) => (e.target.style.backgroundColor = '#76a713')}
                      onMouseOut={(e) => (e.target.style.backgroundColor = '#ff7800')}
                    >
                      Save Changes <i className="fas fa-angle-double-right" />
                    </a>
                  </Link>

                </form>
              </div>
            </div>
          </div>

        </div>

      </section>

    </Layout>
  );
};
export default Profile;
