import Link from "next/link";
import ClientLogoSlider from "../src/components/ClientLogoSlider";
import FeedbackTwoSlider from "../src/components/FeedbackTwoSlider";
import PageBanner from "../src/components/PageBanner";
import ExperienceTeam from "../src/components/slider/ExperienceTeam";
import PhotoGallery from "../src/components/slider/PhotoGallery";
import Layout from "../src/layout/Layout";
const Myorder = () => {
    return (
        <Layout footer={3}>
            <PageBanner pageName={"My Order"} />
            {/* Page Banner End */}
            {/* About Section Start */}
            <div className="card">
                <div className="card-body">

                    <div className="row  " >
                        <div className="col-12 col-md-3">


                            <img
                                src="assets/images/a5.jpg"
                                style={{ height: '100px', width: '100px', borderRadius: '50%', marginLeft: '50px' }}
                                alt="Preview"
                            />
                            <div>
                                <h3 className="" style={{ marginLeft: '20px' }}>Bharath AB</h3>
                            </div>

                        </div>

                        <div className="col-12 col-md-9 container">
                            <div className="row" >
                                <div className="card" style={{
                                    boxSizing: 'border-box',
                                    width: '100%',
                                    margin: '10px',
                                    padding: '20px',
                                    border: '1px solid #ccc',
                                    borderRadius: '8px',
                                    backgroundColor: '#f9f9f9',
                                }}>
                                    <div className="row">
                                        <div className="col-4">
                                            <h><i className="fas fa-map-marker-alt"></i> Chennai, Tamil Nadu, India</h>
                                            <h4>  Graphs fruit</h4>
                                            <div>
                                                ID 125487252
                                            </div>
                                        </div>

                                        <div className="col-4">
                                            Jan 20
                                            <span>(check in) </span>
                                            <div>
                                                Jan 25
                                                <span>(check out) </span>
                                            </div>
                                        </div>

                                        <div className="col-4">
                                            <img src="\assets\images\p1.jpg"></img>
                                        </div>
                                        <hr></hr>
                                        <div className="col-12">
                                            {/* Button Group */}
                                            <div >
                                                <button className="btn btn-primary" style={{margin:'5px'}}>Invoice</button>
                                                <button className="btn btn-success" style={{margin:'5px'}}>Change</button>
                                                <button className="btn btn-danger" style={{margin:'5px'}}>Cancel</button>
                                                <button className="btn btn-success" style={{margin:'5px'}}>Active</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="row" >
                                <div className="card" style={{
                                    boxSizing: 'border-box',
                                    width: '100%',
                                    margin: '10px',
                                    padding: '20px',
                                    border: '1px solid #ccc',
                                    borderRadius: '8px',
                                    backgroundColor: '#f9f9f9',
                                }}>
                                    <div className="row">
                                        <div className="col-4">
                                            <h><i className="fas fa-map-marker-alt"></i> Chennai, Tamil Nadu, India</h>
                                            <h4>Group of vegetables</h4>
                                            <div>
                                                ID 25453245652
                                            </div>
                                        </div>

                                        <div className="col-4">
                                            Jan 20
                                            <span>(check in) </span>
                                            <div>
                                                Jan 25
                                                <span>(check out) </span>
                                            </div>
                                        </div>

                                        <div className="col-4">
                                            <img src="\assets\images\a6.jpg"></img>
                                        </div>
                                        <hr></hr>
                                        <div className="col-12">
                                            {/* Button Group */}
                                            <div >
                                                <button className="btn btn-primary" style={{margin:'5px'}}>Invoice</button>
                                                <button className="btn btn-success" style={{margin:'5px'}}>Change</button>
                                                <button className="btn btn-danger" style={{margin:'5px'}}>Cancel</button>
                                                <button className="btn btn-success" style={{margin:'5px'}}>Active</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="row" >
                                <div className="card" style={{
                                    boxSizing: 'border-box',
                                    width: '100%',
                                    margin: '10px',
                                    padding: '20px',
                                    border: '1px solid #ccc',
                                    borderRadius: '8px',
                                    backgroundColor: '#f9f9f9',
                                }}>
                                    <div className="row">
                                        <div className="col-4">
                                            <h><i className="fas fa-map-marker-alt"></i> Chennai, Tamil Nadu, India</h>
                                            <h4>Piece of Brinjal vegetable</h4>
                                            <div>
                                                ID  2545654565
                                            </div>
                                        </div>

                                        <div className="col-4">
                                            Feb 20
                                            <span>(check in) </span>
                                            <div>
                                                Feb 25
                                                <span>(check out) </span>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <img src="\assets\images\a7.jpg"></img>
                                        </div>
                                        <hr></hr>
                                        <div className="col-sm-12 " style={{ margin: '1px' }}>
                                            {/* Button Group */}
                                            <div >
                                                <button className="btn btn-primary" style={{ margin: '5px' }}>Invoice</button>
                                                <button className="btn btn-success" style={{ margin: '5px' }}>Change</button>
                                                <button className="btn btn-danger" style={{ margin: '5px' }}>Cancel</button>
                                                <button className="btn btn-success" style={{ margin: '5px' }}>Active</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>








                    </div>

                </div>
            </div>

        </Layout>
    );
};
export default Myorder;

