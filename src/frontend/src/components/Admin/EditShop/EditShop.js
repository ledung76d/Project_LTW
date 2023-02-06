import React from "react";
import "./EditShop.scss";
import Axios from "axios";
import * as actions from "../../../store/actions";
import { connect } from "react-redux";
import { handleGetStoreById } from "../../../services/productService";
import adminService, {
  handleUpdateStoreInfo,
} from "../../../services/adminService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Redirect } from "react-router";
class EditShop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shop: this.props.adminInfo,
      img1: this.props.adminInfo.img,
      logo: this.props.adminInfo.logo,
      address: this.props.adminInfo.address,
      phone: this.props.adminInfo.phone,
      content: this.props.adminInfo.content,
      storeName: this.props.adminInfo.storeName,
    };
  }
  onChangeInputImage1 = (e) => {
    const cloudinaryEnv = {
      cloud_name: "dm6vzyxzh",
      upload_preset: "hpaflvm3",
    };
    let formData = new FormData();
    formData.append("file", e.target.files[0], "file");
    formData.append("upload_preset", cloudinaryEnv.upload_preset);

    Axios.post(
      `https://api.cloudinary.com/v1_1/${cloudinaryEnv.cloud_name}/image/upload`,
      formData
    ).then((res) => {
      this.setState({
        logo: res.data.secure_url,
      });
      let newShop = { ...this.state.shop, logo: res.data.secure_url };
      this.props.adminLoginSuccess(newShop);
    });
  };

  onChangeInputImage2 = (e) => {
    const cloudinaryEnv = {
      cloud_name: "dm6vzyxzh",
      upload_preset: "hpaflvm3",
    };
    let formData = new FormData();
    formData.append("file", e.target.files[0], "file");
    formData.append("upload_preset", cloudinaryEnv.upload_preset);

    Axios.post(
      `https://api.cloudinary.com/v1_1/${cloudinaryEnv.cloud_name}/image/upload`,
      formData
    ).then((res) => {
      this.setState({
        img1: res.data.secure_url,
      });
    });
  };
  handleOnChangeAddress = (event) => {
    this.setState({
      address: event.target.value,
    });
  };
  handleOnChangePhone = (event) => {
    this.setState({
      phone: event.target.value,
    });
  };
  handleOnChangeContent = (event) => {
    this.setState({
      content: event.target.value,
    });
  };
  handleOnChangeStoreName = (event) => {
    this.setState({
      storeName: event.target.value,
    });
  };
  handleSave = async () => {
    const regexAddress = /^[a-zA-Z0-9\s,'-]*$/;
    const regexPhone = /^[0-9]*$/;
    const regexStoreName = /^[a-zA-Z0-9\s,'-]*$/;
    if (
      !regexAddress.test(this.state.address)) {
      toast.error("Address is invalid!");   
      return;      
      }
    if (
      !regexPhone.test(this.state.phone) ||
      this.state.phone.length < 9 ||
      this.state.phone.length > 15
    ) {
      toast.error("Phone is invalid!");
      return;
    }
    if (
      !regexStoreName.test(this.state.storeName) ||
      this.state.storeName.length < 5 ||
      this.state.storeName.length > 50
    ) {
      toast.error("Store name is invalid!");
      return;
    }
     

    let newShop = {
      name: this.state.storeName,
      address: this.state.address,
      phone: this.state.phone,
      img: this.state.img1,
      logo: this.state.logo,
      content: this.state.content,
    };
    const sid = this.state.shop.sid;
    console.log("check sid", sid);
    this.props.adminLoginSuccess({
      ...this.state.shop,
      name: this.state.storeName,
      address: this.state.address,
      phone: this.state.phone,
      img: this.state.img1,
      logo: this.state.logo,
      content: this.state.content,
    });
    try {
      let test = await adminService.handleUpdateStoreInfo(newShop);
    } catch (error) {
      toast.error("Update failed!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    toast.success("Update success!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  render() {
    const { shop, img1, logo, address, phone, content, storeName } = this.state;
    console.log(">>> shop: ", this.props.adminInfo);
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
            <div className="box_Logo" htmlFor="avatar-shop1">
              <label className="upload">
                <div className="box_upload">
                  <div className="box_img">
                    <div className="wrap_img">
                      <img src={this.state.logo} />
                    </div>
                  </div>
                  <div style={{ marginTop: "24px" }}>
                    <span style={{ color: "#009F7F", fontWeight: "600" }}>
                      Upload an image
                    </span>{" "}
                    or drag and drop
                    <br />
                    <span style={{ fontSize: "12px" }}>PNG, JPG</span>
                  </div>
                </div>
                <input
                  type="file"
                  id="avatar-shop1"
                  name="avatar"
                  accept="image/png, image/jpeg"
                  style={{ display: "none" }}
                  onChange={(e) => this.onChangeInputImage1(e)}
                />
              </label>
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
              <label className="upload" htmlFor="avatar-shop2">
                <div className="box_upload">
                  <div className="box_img">
                    <div className="wrap_img">
                      <img src={this.state.img1} />
                    </div>
                  </div>
                  <div style={{ marginTop: "24px" }}>
                    <span style={{ color: "#009F7F", fontWeight: "600" }}>
                      Upload an image
                    </span>{" "}
                    or drag and drop
                    <br />
                    <span style={{ fontSize: "12px" }}>PNG, JPG</span>
                  </div>
                </div>
              </label>
              <input
                type="file"
                id="avatar-shop2"
                name="avatar"
                accept="image/png, image/jpeg"
                style={{ display: "none" }}
                onChange={(e) => this.onChangeInputImage2(e)}
              />
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
                <input
                  value={storeName}
                  onChange={(e) => this.handleOnChangeStoreName(e)}
                ></input>
              </div>
              <div className="input_Name">
                <label>Description</label>
                <textarea
                  value={content}
                  onChange={(e) => this.handleOnChangeContent(e)}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="Genaral ">
            <div className="text_General">
              <h4>Shop Address</h4>
              <p>Add your physical shop address from here</p>
            </div>
            <div className="box_Logo box_Address important-height">
              <div className="input_Name">
                <label>Address</label>
                <input
                  value={address}
                  onChange={(e) => this.handleOnChangeAddress(e)}
                ></input>
              </div>
              <div className="input_Name">
                <label>Phone</label>
                <input
                  value={phone}
                  onChange={(e) => this.handleOnChangePhone(e)}
                ></input>
              </div>
            </div>
          </div>

          <div className="Update">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => this.handleSave()}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.admin.isLoggedIn,
    adminInfo: state.admin.adminInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeAppMode: (payload) => dispatch(actions.changeAppMode(payload)),
    userLoginSuccess: (adminInfo) =>
      dispatch(actions.userLoginSuccess(adminInfo)),
    adminLoginSuccess: (userInfo) =>
      dispatch(actions.adminLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditShop);
