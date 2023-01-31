import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Redirect, withRouter } from "react-router-dom";
import * as actions from "../../store/actions";
import "./Checkout.scss";
import Contact from "./Contact";
import Shipping from "./Shipping";
import Delivery from "./Delivery";
import YourOrder from "./YourOrder";
import { v4 as uuidv4 } from "uuid";
import { handleGetInfoUser, handleSaveOrder } from "../../services/userService";
import { handleSaveToOrderItem } from "../../services/productService";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      userInfo: props.userInfo,
      phone: "",
      address: "",
      delivery: "Express Delivery",
      mesPhone: "",
      mesAddress: "",
      check: "",
    };
  }

  async componentDidMount() {
    let data = await handleGetInfoUser();
    let info = data.data;
    console.log("Info", info);
    this.setState({
      phone: info.phone,
      address: info.address,
    });
  }

  makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  setPhoneNumber = (phone) => {
    this.setState({
      phone: phone,
    });
  };

  setAddress = (address) => {
    this.setState({
      address: address,
    });
  };

  setDelivery = (delivery) => {
    this.setState({
      delivery: delivery,
    });
  };

  placeOderButton = () => {};

  sumCart() {
    let Carts = this.props.Carts;
    let sum = 0;
    Carts.map((item, key) => {
      sum = item.quantity * item.price + sum;
    });
    return Number.parseFloat((Math.round(sum * 100) / 100).toFixed(2));
  }

  saveOrder = async () => {
    let orderId = this.makeid(8);
    //Save order
    let order = {
      orderId: orderId,
      cid: this.state.userInfo.cid,
      status: "Order Received",
      total: this.sumCart(),
      phone: this.state.phone,
      address: this.state.address,
      delivery: this.state.delivery,
    };

    await handleSaveOrder(order);
    //Save order item

    this.props.Carts.map(async (item) => {
      // console.log('Item',item)
      item.orderId = orderId;
      await handleSaveToOrderItem(item);
    });
    this.props.DeleteCart();
    //console.log( typeof orderId)
    setTimeout(() => {
      this.props.history.push(`/placeorder/${encodeURIComponent(orderId)}`);
    }, 1000);
  };

  setPhoneNumber = (e) => {
    this.setState({
      phone: e.target.value,
    });
  };

  setAddress = (e) => {
    this.setState({
      address: e.target.value,
    });
  };

  render() {
    return (
      <section className="co-page">
        <div className="co-container">
          <div className="co-list">
            <div className="co-contact">
              <div className="co-item">
                <div className="co-item-box">
                  <span className="item-index">1</span>
                  <h3 className="item-text">Contact Number</h3>
                </div>
                <button className="btn item-btn" type="button">
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 stroke-2 me-0.5 svg-plus"
                    data-selected="true"
                    data-label-id="0"
                    // data-metatip='true'
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                  </svg>
                  Update
                </button>
              </div>
              <div>
                {/* <p className="item-linenumber">{this.state.phone}</p> */}
                <input
                  className="co-content active"
                  type="tel"
                  value={this.state.phone}
                  onChange={(e) => this.setPhoneNumber(e)}
                />
                {this.state.mesPhone && (
                  <p className="item-linenumber">{this.state.mesPhone}</p>
                )}
              </div>
            </div>

            <div className="co-shipping-address">
              <div className="co-item">
                <div className="co-item-box">
                  <span className="item-index">2</span>
                  <h3 className="item-text">Shipping Address</h3>
                </div>
                <button className="btn item-btn" type="button">
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 stroke-2 me-0.5 svg-plus"
                    data-selected="true"
                    data-label-id="0"
                    // data-metatip='true'
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                  </svg>
                  Add
                </button>
              </div>
              <div className="co-content h-126 active w-50">
                <p className="item-title">
                  Shipping
                  <button className="add-address">
                    <svg
                      className="w-3 h-3 icon-add"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                    </svg>
                  </button>
                  <button className="delete-address">
                    <svg
                      className="w-3 h-3 icon-delete"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </p>
                <textarea
                  type="text"
                  className="item-address"
                  value={this.state.address}
                  onChange={(e) => this.setAddress(e)}
                  style={{ width: "100%" }}
                />
              </div>
            </div>
            {this.state.mesAddress && (
              <p className="item-linenumber">{this.state.mesAddress}</p>
            )}
            <Delivery
              userInfo={this.state.userInfo}
              setDelivery={this.setDelivery}
              delivery={this.state.delivery}
            />
          </div>
          <YourOrder
            Carts={this.props.Carts}
            check={this.state.check}
            saveOrder={this.saveOrder}
          />
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    numberCart: state.cart.numberCart,
    Carts: state.cart.Carts,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginSuccess: (adminInfo) =>
      dispatch(actions.userLoginSuccess(adminInfo)),
    userLoginFail: () => dispatch(actions.userLoginFail()),
    AddCart: (payload) => dispatch(actions.AddCart(payload)),
    DecreaseQuantity: (payload) => dispatch(actions.DecreaseQuantity(payload)),
    DeleteCart: () => dispatch(actions.DeleteCart()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Checkout));
