import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { push } from "connected-react-router";
import "./Profile.scss";
import { Link } from "react-router-dom";
import { Modal } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";

import {
  cloudinaryUpload,
  handleGetInfoUser,
  handleSaveInfoUser,
} from "../../../services/userService";
import userImg from "../../../assets/images/admin/avatar-placeholder.svg";
import { toast } from "react-toastify";
import NavUser from "../NavUser";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalContact: false,
      modalAddress: false,
      img: "",
      name: "",
      phone: "",
      newPhone: "",
      address: "",
      newAddress: "",
      message: "",
    };
  }

  async componentDidMount() {
    let data = await handleGetInfoUser();
    let info = data.data;
    this.setState({
      img: info.picture,
      name: info.name,
      phone: info.phone,
      address: info.address,
    });
  }

  onChangeInputImage = async (e) => {
    let uploadData = new FormData();
    uploadData.append("file", e.target.files[0], "file");
    let tmp = await cloudinaryUpload(uploadData);
    this.setState({
      img: tmp.secure_url,
    });
  };

  handleLogout = () => {
    this.props.processLogout();
    this.props.navigate("/");
  };

  handleNameOnChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  handlePhoneOnChange = (e) => {
    this.setState({
      newPhone: e.target.value,
    });
  };
  handleSendOTP = () => {
    // phone regex
    let phoneRegex = /^0[0-9]{9}$/;
    if (phoneRegex.test(this.state.newPhone)) {
      this.setState({
        phone: this.state.newPhone,
        newPhone: "",
        modalContact: false,
      });
    } else {
      this.setState({
        message: "Phone number is invalid",
      });
      setTimeout(() => {
        this.setState({
          message: "",
        });
      }, 3000);
    }
  };

  handleNewAddressOnChange = (e) => {
    this.setState({
      newAddress: e.target.value,
    });
  };
  saveFLA = async () => {
    if (this.state.phone && this.state.newAddress) {
      let data = {
        picture: this.state.img,
        name: this.state.name,
        phone: this.state.phone,
        address: this.state.newAddress,
      };

      try {
        await handleSaveInfoUser(data);
        toast.success("Save successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } catch (error) {
        toast.error("Save failed", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.warning("Please fill all fields", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  handleChangeImg = () => {
    toast.warning("Feature coming soon :))", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  render() {
    // console.log("check props", this.props);
    return (
      <>
        <div className="container__profile">
          {/* <div className="userLogin">
            <div className="user__wallet">
              <h3 className="user__wallet-title">Wallet</h3>
              <div className="user__wallet-list">
                <div className="user__wallet-list-item">
                  <span>Total Points</span>
                  <span>0</span>
                </div>
                <div className="user__wallet-list-item">
                  <span>Points Used</span>
                  <span>0</span>
                </div>
                <div className="user__wallet-list-item">
                  <span>Available Points</span>
                  <span>0</span>
                </div>
              </div>
            </div>
            <div className="user_sidebar">
              <ul className="user_sidebar-list">
                <li className="user_sidebar-list-item">
                  <Link
                    to={"/profile"}
                    className="user_sidebar-list-item-link user_sidebar-list-item-link-profile"
                  >
                    <span>Profile</span>
                  </Link>
                </li>
                <li className="user_sidebar-list-item">
                  <Link
                    to={"/change-password"}
                    className="user_sidebar-list-item-link "
                  >
                    <span>Change Password</span>
                  </Link>
                </li>
                <li className="user_sidebar-list-item">
                  <Link
                    to={"/my-order"}
                    className="user_sidebar-list-item-link"
                  >
                    <span>My Orders</span>
                  </Link>
                </li>
                <li className="user_sidebar-list-item">
                  <a className="user_sidebar-list-item-link">My Refunds</a>
                </li>
                <li className="user_sidebar-list-item">
                  <a className="user_sidebar-list-item-link">Need Help</a>
                </li>
              </ul>
              <div
                className="user_sidebar-logout"
                onClick={(e) => this.handleLogout(e)}
              >
                <a className="user_sidebar-logout-link">Logout</a>
              </div>
            </div>
          </div> */}
          <NavUser />
          <div className="userLogin__profile">
            <div className="profile__infor">
              <div className="profile__infor-avatar">
                <label
                  className="profile__infor-avatar-title"
                  onClick={() => this.handleChangeImg()}
                >
                  <i className="fas fa-cloud-upload-alt avatar_upload-icon"></i>
                  <br />
                  <span className="avatar-title-bold">UpLoad an image</span>
                  &nbsp; or drag and drop
                  <br></br>
                  <span>PNG, JPG</span>
                </label>

                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/png, image/jpeg"
                  className="profile__infor-avatar-input"
                  onChange={(e) => this.onChangeInputImage(e)}
                />
              </div>
              <div className="avatar-img">
                <img src={this.state.img} alt="" width="100" height="100" />
              </div>
              <div className="profile__infor-form">
                <label
                  className="profile__infor-title"
                  htmlFor="profile__infor-name"
                >
                  Name
                </label>
                <span
                  className="profile__infor-input profile__infor-name"
                  id="profile__infor-name"
                >
                  {this.state.name}
                </span>
              </div>
            </div>
            <div
              className="profile__contact"
              onClick={() => {
                this.setState({ modalContact: !this.state.modalContact });
              }}
            >
              <div className="profile__contact-header">
                <span className="profile__contact-header-title">
                  Contact Number
                </span>
                <button
                  className="profile__contact-header-btn"
                  onClick={() =>
                    this.setState({ modalContact: !this.state.modalContact })
                  }
                >
                  + Update
                </button>
              </div>
              <div className="profile__contact-phone">
                <span>{this.state.phone}</span>
              </div>
            </div>
            <div
              className="profile__contact"
              onClick={() => {
                this.setState({ modalAddress: !this.state.modalAddress });
              }}
            >
              <div className="profile__contact-header">
                <span className="profile__contact-header-title">Addresses</span>
                <button
                  className="profile__contact-header-btn"
                  onClick={() =>
                    this.setState({ modalAddress: !this.state.modalAddress })
                  }
                >
                  + Update
                </button>
              </div>
              <div className="profile__address">
                <div className="profile__address-bill">
                  <p className="profile__address-title">Shipping</p>
                  <p className="profile__address-content">
                    {this.state.address}
                  </p>
                </div>
              </div>
            </div>
            <div className="profile__infor-btn">
              <button
                className="profile__infor-btn--save"
                onClick={() => this.saveFLA()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <Modal
          toggle={() =>
            this.setState({ modalContact: !this.state.modalContact })
          }
          isOpen={this.state.modalContact}
          centered
          className="contact-modal"
        >
          <div className="profile__update-contact">
            <p className="profile__update-contact-title">
              Update New Contact Number
            </p>
            <div className="profile__update-contacts">
              <input
                type="tel"
                className="profile__update-contact-input"
                placeholder="Enter your phone number"
                onChange={(e) => this.handlePhoneOnChange(e)}
                required
              ></input>
              <button
                className="profile__update-contact-btn"
                onClick={() => this.handleSendOTP()}
              >
                Change
              </button>
            </div>
            {this.state.message && (
              <div className="error-phone">
                <i className="fa fa-exclamation" aria-hidden="true"></i>
                &nbsp;
                {this.state.message}
              </div>
            )}
          </div>
        </Modal>
        <Modal
          toggle={() =>
            this.setState({ modalAddress: !this.state.modalAddress })
          }
          isOpen={this.state.modalAddress}
          centered
          className="address-modal"
        >
          <div className="form__address">
            <h3 className="form__address-title">Update new address</h3>
            <div className="form__address-radio">
              <p className="form__address-radio-title">Type</p>
              <div className="form__address-radio-group">
                <input
                  type="radio"
                  name="address-radio-type"
                  id="Billing"
                  defaultChecked
                />
                <label className="address-radio-type-label" htmlFor="Billing">
                  Shipping
                </label>

                <input type="radio" name="address-radio-type" id="Shipping" />
                <label className="address-radio-type-label" htmlFor="Shipping">
                  Billing
                </label>
              </div>
            </div>

            <div className="form__address-item">
              <label className="form__address-item-title">Address</label>
              <input
                className="form__address-item-input"
                onChange={(e) => this.handleNewAddressOnChange(e)}
                value={this.state.newAddress}
              />
            </div>

            <button
              className="form__address-btn"
              onClick={() => {
                this.setState({
                  modalAddress: !this.state.modalAddress,
                  address: this.state.newAddress,
                });
              }}
            >
              Change address
            </button>
          </div>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    navigate: (path) => dispatch(push(path)),
    reduxChangeFLA: (payload) => dispatch(actions.changeFLA(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
