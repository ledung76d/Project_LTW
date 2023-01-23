import React from "react";
import "./EditShop.scss";

class EditShop extends React.Component {
  render() {
    return (
      <div className="edit_container">
        <div className="Edit_Product">
          <h1>Edit Product</h1>
        </div>
        <form className="Edit_Form">
          <div className="Genaral">
            <div className="text_General">
              <h4>Logo</h4>
              <p>Upload your shop logo from here</p>
            </div>
            <div className="box_Logo">
              <section className="upload">
                <div className="box_upload">
                  <i
                    className="fas fa-cloud-upload-alt"
                    style={{ color: "#D1D5DB" }}
                  ></i>
                  <div style={{ marginTop: "16px" }}>
                    <span style={{ color: "#009F7F", fontWeight: "600" }}>
                      Upload an image
                    </span>{" "}
                    or drag and drop
                    <br />
                    <span style={{ fontSize: "12px" }}>PNG, JPG</span>
                  </div>
                </div>
                <aside className="box_img">
                  <div className="wrap_img">
                    <img src="https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/891/conversions/Group-36321-thumbnail.jpg" />
                  </div>
                </aside>
              </section>
            </div>
          </div>
          <div className="Genaral">
            <div className="text_General">
              <h4>Cover Image</h4>
              <p>
                <span>Upload your shop cover image from here</span>
                <br></br>
                <span>Dimension of the cover image should be</span>
                &nbsp;&nbsp;
                <span style={{ fontWeight: "bold", opacity: "0.9" }}>
                  1170 x 435px
                </span>
              </p>
            </div>
            <div className="box_Logo">
              <section className="upload">
                <div className="box_upload">
                  <i
                    className="fas fa-cloud-upload-alt"
                    style={{ color: "#D1D5DB" }}
                  ></i>
                  <div style={{ marginTop: "16px" }}>
                    <span style={{ color: "#009F7F", fontWeight: "600" }}>
                      Upload an image
                    </span>{" "}
                    or drag and drop
                    <br />
                    <span style={{ fontSize: "12px" }}>PNG, JPG</span>
                  </div>
                </div>
                <aside className="box_img">
                  <div className="wrap_img">
                    <img src="https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/892/conversions/Untitled-2-thumbnail.jpg" />
                  </div>
                </aside>
              </section>
            </div>
          </div>
          <div className="Genaral">
            <div className="text_General">
              <h4>Basic Information</h4>
              <p>Add some basic info about your shop from here</p>
            </div>
            <div className="box_Logo box_Input">
              <div className="input_Name">
                <label>Name</label>
                <input></input>
              </div>
              <div className="input_Name">
                <label>Description</label>
                <textarea></textarea>
              </div>
            </div>
          </div>
          <div className="Genaral">
            <div className="text_General">
              <h4>Payment Information</h4>
              <p>Add your payment information from here</p>
            </div>
            <div className="box_Logo box_Payment">
              <div className="input_Name">
                <label>Account Holder Name</label>
                <input></input>
              </div>
              <div className="input_Name">
                <label>Account Holder Email</label>
                <input></input>
              </div>
              <div className="input_Name">
                <label>Bank Name</label>
                <input></input>
              </div>
              <div className="input_Name input_Payment">
                <label>Account Number</label>
                <input></input>
              </div>
            </div>
          </div>
          <div className="Genaral">
            <div className="text_General">
              <h4>Shop Address</h4>
              <p>Add your physical shop address from here</p>
            </div>
            <div className="box_Logo box_Address">
              <div className="input_Name">
                <label>Country</label>
                <input></input>
              </div>
              <div className="input_Name">
                <label>City</label>
                <input></input>
              </div>
              <div className="input_Name">
                <label>State</label>
                <input></input>
              </div>
              <div className="input_Name">
                <label>Zip</label>
                <input></input>
              </div>
              <div className="input_Name">
                <label>Street Address</label>
                <textarea></textarea>
              </div>
            </div>
          </div>
          <div className="Genaral">
            <div className="text_General">
              <h4>Shop Settings</h4>
              <p>Add your shop settings information from here</p>
            </div>
            <div className="box_Logo box_Settings">
              <div className="input_Name">
                <label>Set location from map</label>
                <input></input>
              </div>
              <div className="input_Name">
                <label>Contact Number</label>
                <input></input>
              </div>
              <div className="input_Name">
                <label>Website</label>
                <input></input>
              </div>
              <div className="form_Settings">
                <div className="form_Element">
                  <div className="form_platform">
                    <span className="tiltle_platform">
                      Select social platform
                    </span>
                    {/* <select>
                                            <option>
                                                <i className="fas fa-apple-alt"></i> vinh
                                            </option>
                                            <option>
                                                
                                            </option>
                                        </select> */}
                    <div className="platform">
                      <div className="logo_Plat">
                        <i className="fab fa-facebook-square"></i>
                        <span>Facebook</span>
                      </div>
                      <div className="tick_cancel">
                        <i className="fas fa-times"></i>
                        <i className="fas fa-chevron-down"></i>
                        {/* <select>
                                                    </select> */}
                      </div>
                    </div>
                  </div>
                  <div className="form_platform">
                    <span className="tiltle_platform">Add profile url</span>
                    <input className="platform profile"></input>
                  </div>
                  <button className="Remove">Remove</button>
                </div>
                <div className="form_Element">
                  <div className="form_platform">
                    <span className="tiltle_platform">
                      Select social platform
                    </span>
                    <div className="platform">
                      <div className="logo_Plat">
                        <i className="fab fa-instagram"></i>
                        <span>Instagram</span>
                      </div>
                      <div className="tick_cancel">
                        <i className="fas fa-times"></i>
                        <i className="fas fa-chevron-down"></i>
                        {/* <select>
                                                    
                                                </select> */}
                      </div>
                    </div>
                  </div>
                  <div className="form_platform">
                    <span className="tiltle_platform">Add profile url</span>
                    <input className="platform profile"></input>
                  </div>
                  <button className="Remove">Remove</button>
                </div>
                <div className="form_Element">
                  <div className="form_platform">
                    <span className="tiltle_platform">
                      Select social platform
                    </span>
                    <div className="platform">
                      <div className="logo_Plat">
                        <i className="fab fa-twitter"></i>
                        <span>Twitter</span>
                      </div>
                      <div className="tick_cancel">
                        <i className="fas fa-times"></i>
                        <i className="fas fa-chevron-down"></i>
                        {/* <select>
                                                </select> */}
                      </div>
                    </div>
                  </div>
                  <div className="form_platform">
                    <span className="tiltle_platform">Add profile url</span>
                    <input className="platform profile"></input>
                  </div>
                  <button className="Remove">Remove</button>
                </div>
              </div>
              <button className="button_Add">Add New Social Profile</button>
            </div>
          </div>
          <div className="Update">
            <button>Update</button>
          </div>
        </form>
      </div>
    );
  }
}

export default EditShop;
